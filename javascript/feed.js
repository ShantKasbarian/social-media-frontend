let posts;
async function loadPosts() {
    const response = await fetch('http://localhost:8000/post', {
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

        posts = await data.content;

        const postsElement = document.getElementById('posts');

        posts.forEach(element => {
            let parentDiv = document.createElement('div');
            parentDiv.classList.add('col-sm-6', 'mb-3', 'mb-sm-0');

            let cardContainer = document.createElement('div');
            cardContainer.classList.add('card');

            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            let usernameP = document.createElement('p');
            usernameP.innerHTML = element.username;

            let cardTextP = document.createElement('p');
            cardTextP.innerHTML = element.title;

            let postedTimeP = document.createElement('p');
            postedTimeP.innerHTML = element.postedTime;

            let iconDiv = document.createElement('div');
            iconDiv.classList.add('icon-container');
            iconDiv.style = 'display: flex; gap: 7px; margin-bottom: 10px;';
            iconDiv.id = 'icon-container';

            let likeIcon = document.createElement('img');
            likeIcon.src = '../images/heart.png';
            likeIcon.style = 'cursor: pointer; flex-grow: none';

            let postId = element.id;

            likeIcon.addEventListener('click', () => likePost(postId));

            let likeCount = document.createElement('span');
            likeCount.innerHTML = element.likes;

            let commentIcon = document.createElement('img');
            commentIcon.src = '../images/comment.png';
            commentIcon.style = 'cursor: pointer; flex-grow: none';

            commentIcon.addEventListener('click', () => getComments(postId));

            cardBodyDiv.appendChild(usernameP);
            cardBodyDiv.appendChild(cardTextP);
            cardBodyDiv.appendChild(postedTimeP);

            iconDiv.appendChild(likeIcon);
            iconDiv.appendChild(likeCount);
            iconDiv.appendChild(commentIcon);
            commentIcon.setAttribute('data-bs-toggle', 'collapse');
            const targetId = `commentContainer_${element.id}`;
            commentIcon.setAttribute('data-bs-target', `#${targetId}`);
            commentIcon.setAttribute('aria-expanded', 'false');
            commentIcon.setAttribute('aria-controls', targetId);

            cardBodyDiv.appendChild(iconDiv);

            let childContainer = document.createElement('div');
            childContainer.id = targetId;
            childContainer.classList.add('collapse');

            let comContainer = document.createElement('div');
            comContainer.style = 'display: flex;flex-direction: column;gap: 5px;';

            let commentP = document.createElement('p');
            commentP.innerHTML = 'wow such empty be the first to comment';

            comContainer.appendChild(commentP); 
            childContainer.appendChild(comContainer);
            cardBodyDiv.appendChild(childContainer);

            cardContainer.appendChild(cardBodyDiv);
            parentDiv.appendChild(cardContainer);
            postsElement.appendChild(parentDiv);
        });

        return;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}

loadPosts();