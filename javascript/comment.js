let commentPageNo = 0;
let totalCommentPages = 0;
// let postId;
// let isLoading;
// let commentsObserver;

// document.addEventListener('DOMContentLoaded', () => {
//     initCommentsObserver();
//     getComments(postId);
// });

// function initCommentsObserver() {
//     if (commentsObserver) {
//         commentsObserver.disconnect();
//     }

//     commentsObserver = new IntersectionObserver(handleIntersection, {
//             root: null,
//             rootMargin: "10px",
//             threshold: 0.1
//         }
//     );

//     const observeTrigger = document.getElementById(`object-to-observe-${postId}`);

//     if (observeTrigger) {
//         commentsObserver.observe(observeTrigger);
//     }
// }

// function handleIntersection(entries) {
//     entries.forEach(entry => {
//         if(entry.isIntersecting && commentPageNo <= (totalCommentPages - 1) && !isLoading) {
//             commentPageNo++;
//             getComments(postId);
//         }
//     });
// }

// function updateObserverTarget() {
//     const oldTrigger = document.getElementById(`object-to-observe-${postId}`);
//     if (oldTrigger) {
//         oldTrigger.remove();
//     }

//     if (hasMoreComments) {
//       const trigger = document.createElement('div');
//       trigger.className = 'object-to-observe';
//       trigger.style.height = '1px';
//       trigger.style.visibility = 'hidden';
//       document.getElementById(`object-to-observe-${postId}`).appendChild(trigger);
//       initCommentsObserver();
//     }
//   }
  
//   function removeObserverTrigger() {
//     const trigger = document.getElementById(`object-to-observe-${postId}`);
//     if (trigger) trigger.remove();
//   }

async function getComments(id) {
    // if(isLoading) {
    //     return;
    // }

    // isLoading = true;

    const response = await fetch(`http://localhost:8000/post/${id}/comments?page=${commentPageNo}&size=3`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });

    postId = id;

    try {
        if (!response.ok) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }

        const data = await response.json();
        let contents = await data.content;
        totalCommentPages = data.totalPages;

        let comContainer = document.getElementById(`com-container_${id}`);

        let comContainerP = document.getElementById(`com-container_p_${id}_such_empty`);

        if (contents.length === 0 && comContainerP === null) {
            let commentP = document.createElement('p');
            commentP.id = `com-container_p_${id}_such_empty`;
            commentP.innerHTML = 'wow such empty be the first to comment';

            comContainer.appendChild(commentP);
            return;
        }

        else if (contents.length === 0) {
            return;
        }

        comContainer.style = 'overflow-y: auto; max-height: 300px;';

        let childContainer = document.getElementById(`com-container_div_${id}_child_pageNo_${commentPageNo}`);

        if (childContainer !== null) {
            return;
        }

        // let objectToObserve;

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
            
            // objectToObserve = document.createElement('div');
            // objectToObserve.id = `object-to-observe-${id}`;
            // objectToObserve.style = 'display: none;';
        });
        
        // comContainer.appendChild(objectToObserve);

        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if(entry.isIntersecting && commentPageNo <= (totalCommentPages - 1)) {
        //             commentPageNo++;
        //             getComments(postId);
        //         }
        //     });
        
        // }, {
        //     root: comContainer,
        //     rootMargin: "10px",
        //     threshold: 0
        // });
        
        // observer.observe(objectToObserve);

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
    // finally {
    //     isLoading = false;
    // }
}

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
        if (response.status !== 201) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }

        let comContainerP = document.getElementById(`com-container_p_${id}_such_empty`);
        let comContainer = document.getElementById(`com-container_${id}`);

        if (comContainerP !== null) {
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