async function getComments(id) {
    const response = await fetch(`http://localhost:8000/post/${id}/comments`, {
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

        const postIndex = posts.findIndex(post => post.id === id);
        let parentContainer = document.querySelectorAll('.card-body')[postIndex];
        // parentContainer.classList.add('collapse');
        // parentContainer.id = 'commentsCollapse';

        if (contents.length === 0) {
            //     let childContainer = document.createElement('div');
            //     childContainer.id = '#commentCollapse';
            //     childContainer.classList.add('card', 'card-body', 'collapse');

            //     let commentP = document.createElement('p');
            //     commentP.innerHTML = 'wow such empty be the first to comment';

            //     childContainer.appendChild(commentP);
            //     parentContainer.appendChild(childContainer);

            return;
        }

        contents.forEach(element => {
            let childContainer = document.createElement('div');
            childContainer.classList.add('card', 'card-body');

            let usernameP = document.createElement('p');
            usernameP.innerHTML = element.username;

            let commentP = document.createElement('p');
            commentP = element.content;

            let commentedTimeP = document.createElement('p');
            commentedTimeP.innerHTML = element.commentedTime;

            childContainer.appendChild(usernameP);
            childContainer.appendChild(commentP);
            childContainer.appendChild(commentedTimeP);

            parentContainer.appendChild(childContainer);
        });

        return;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}