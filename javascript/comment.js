let commentPageNo = 0;
let totalCommentPages = 0;

async function getComments(id) {
    const response = await fetch(`http://localhost:8000/post/${id}/comments?page=${commentPageNo}&size=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    
    try {
        if (!response.ok) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }
        
        
        const data = await response.json();
        let contents = await data.content;
        totalCommentPages = data.totalCommentPages;

        const postIndex = posts.findIndex(post => post.id === id);
        let parentContainer = document.querySelectorAll('.card-body')[postIndex];

        let comContainer = document.getElementById(`com-container_${id}`);
        let child = document.getElementById(`com-container_div_${id}`);

        let comContainerP = document.getElementById(`com-container_p_${id}_such_empty`);

        if (contents.length === 0 && comContainerP === null) {
            let commentP = document.createElement('p');
            commentP.id = `com-container_p_${id}_such_empty`;
            commentP.innerHTML = 'wow such empty be the first to comment';

            comContainer.appendChild(commentP); 
            return;
        }

        else if(contents.length === 0) {
            return;
        }
        comContainer.style = 'overflow-y: auto';

        let childContainer = document.getElementById(`com-container_div_${id}_child_pageNo_${commentPageNo}`);

        if(childContainer !== null) {
            return;
        }

        contents.forEach(element => {
            childContainer = document.createElement('div');
            childContainer.id = `com-container_div_${id}_child_pageNo_${commentPageNo}`;
            childContainer.classList.add('card', 'card-body');
            

            let usernameP = document.createElement('p');
            usernameP.innerHTML = element.username;

            let commentP = document.createElement('p');
            commentP.innerHTML = element.comment;

            let commentedTimeP = document.createElement('p');
            commentedTimeP.innerHTML = element.commentedTime;

            childContainer.appendChild(usernameP);
            childContainer.appendChild(commentP);
            childContainer.appendChild(commentedTimeP);

            comContainer.appendChild(childContainer);
        });

        return;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && 
        commentPageNo <= (totalCommentPages - 1)
    ) {
        commentPageNo++;
        getComments();
    }
});

async function postComment(id) {
    const comment = {
        'postId': id,
        'comment': document.getElementById(`comment-input-${id}`).value,
    };

    const response = await fetch('http://localhost:8000/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await localStorage.getItem('token')}`,
        },
        body: JSON.stringify(comment)
    });

    try {
        if(response.status !== 201) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }
        let comContainerP = document.getElementById(`com-container_p_${id}_such_empty`);
        let comContainer = document.getElementById(`com-container_${id}`);

        if(comContainerP !== null) {
            comContainerP.remove();
        }

        let childContainer = document.createElement('div');
        childContainer.id = `com-container_div_${id}_child`;
        childContainer.classList.add('card', 'card-body');

        let usernameP = document.createElement('p');
        usernameP.innerHTML = await localStorage.getItem('username');

        let commentP = document.createElement('p');
        commentP.innerHTML = comment.comment;

        let commentedTimeP = document.createElement('p');
        commentedTimeP.innerHTML = 'now';

        childContainer.appendChild(usernameP);
        childContainer.appendChild(commentP);
        childContainer.appendChild(commentedTimeP);

        comContainer.appendChild(childContainer);

        const toast = document.getElementById('commentToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        toastBootstrap.show();


        return;

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}