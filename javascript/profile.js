async function getCurrentUserProfile() {
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
        name.innerHTML = `name: ${data.name}`;

        let lastname = document.createElement('p');
        lastname.innerHTML = `lastname: ${data.lastname}`;

        let emailContainer = document.createElement('div');
        emailContainer.style = 'display: flex; flex-direction: row; gap: 10px';
        emailContainer.id = 'email-container';

        let email = document.createElement('p');
        email.innerHTML = `email: ${data.email}`;

        let emailInput = document.createElement('input');
        emailInput.id = 'email-input';
        emailInput.classList.add('form-control');
        emailInput.style = 'background-color: #fff; max-height: 30px; max-width: 250px';

        let emailButton = document.createElement('button');
        emailButton.classList.add('btn', 'btn-warning');
        emailButton.style = 'color: #fff';
        emailButton.innerHTML = 'change email';
        emailButton.addEventListener('click', () => changeEmail());

        let usernameContainer = document.createElement('div');
        usernameContainer.id = 'username-container'
        usernameContainer.style = 'display: flex; flex-direction: row; gap: 116px';

        let username = document.createElement('p');
        username.innerHTML = `username: ${data.username}`;

        let usernameInput = document.createElement('input');
        usernameInput.id = 'username-input';
        usernameInput.classList.add('form-control');
        usernameInput.style = 'background-color: #fff; max-height: 30px; max-width: 250px';
        
        let usernameButton = document.createElement('button');
        usernameButton.classList.add('btn', 'btn-warning');
        usernameButton.style = 'color: #fff';
        usernameButton.innerHTML = 'change username';
        usernameButton.addEventListener('click', () => changeUsername());

        let passwordContainer = document.createElement('div');
        passwordContainer.style = 'display: flex; flex-direction: row; gap: 104px';

        let password = document.createElement('p');
        password.innerHTML = 'password: ***********';

        let passwordInput = document.createElement('input');
        passwordInput.id = 'password-input';
        passwordInput.classList.add('form-control');
        passwordInput.style = 'background-color: #fff; max-height: 30px; max-width: 250px';
        passwordInput.type = 'password';

        let passwordButton = document.createElement('button');
        passwordButton.classList.add('btn', 'btn-warning');
        passwordButton.style = 'color: #fff';
        passwordButton.innerHTML = 'change password';
        passwordButton.addEventListener('click', () => changePassword());

        emailContainer.appendChild(email);
        emailContainer.appendChild(emailInput);
        emailContainer.appendChild(emailButton);

        usernameContainer.appendChild(username);
        usernameContainer.appendChild(usernameInput);
        usernameContainer.appendChild(usernameButton);

        passwordContainer.appendChild(password);
        passwordContainer.appendChild(passwordInput);
        passwordContainer.appendChild(passwordButton);

        profileContainer.appendChild(name);
        profileContainer.appendChild(lastname);
        profileContainer.appendChild(emailContainer);
        profileContainer.appendChild(usernameContainer);
        profileContainer.appendChild(passwordContainer);

        return;

    } 
    catch (error) {
        alert(`Error: ${error.message}`);
    }
}

getCurrentUserProfile();