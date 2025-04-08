window.onload = async function getCurrentUserProfile() {
    const userInfo = await fetch('http://localhost:8000/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await localStorage.getItem('token')}`
        }
    });

    try {
        if(!userInfo.ok) {
            let text = JSON.parse(await userInfo.text()).message;
            throw new Error(text);
        }

        const data = await userInfo.json();

        let profileContainer = document.getElementById('profile-container');

        let name = document.createElement('p');
        name.innerHTML = data.name;

        let lastname = document.createElement('p');
        lastname.innerHTML = data.lastname;

        let email = document.createElement('p');
        email.innerHTML = data.email;

        let username = document.createElement('p');
        username.innerHTML = data.username;

        profileContainer.appendChild(name);
        profileContainer.appendChild(lastname);
        profileContainer.appendChild(email);
        profileContainer.appendChild(username);

        return;

    } 
    catch (error) {
        alert(`Error: ${error.message}`);
    }
}