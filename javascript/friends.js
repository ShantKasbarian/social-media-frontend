let friendsPageNo = 0;

async function getFriends() {
    const response = await fetch(`http://localhost:8000/friend?page=${friendsPageNo}&size=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await localStorage.getItem('token')}`,
        }
    });

    try {
        if (!response.ok) {
            let text = await JSON.parse(response.text).message;
            throw new Error(text);
        }

        const data = await response.json();
        friendsPageNo = data.pageNo;

        const users = data.content;        

        const list = document.getElementById('friends');
        
        let listItem = document.getElementById(`list-item-container-pageNo-${friendsPageNo}`);

        if(listItem !== null) {
            return;
        }
        

        users.forEach(item => {
            listItem = document.createElement('li');
            listItem.classList.add('dropdown-item');
            listItem.id = `list-item-container-pageNo-${friendsPageNo}`;

            const link = document.createElement('a');
            link.classList.add('dropdown-item');
            link.href = 'http://localhost/social-media-frontend/html/profile.html';
            
            let currentUserUsername = localStorage.getItem('username');
            let username = item.username;
            
            if(username === currentUserUsername) {
                username = item.friendName;
            }

            link.innerHTML = username;

            listItem.appendChild(link);
            list.appendChild(listItem);
        });
    }
    catch (error) {
        alert(`Error: ${error.message}`);
    }
};