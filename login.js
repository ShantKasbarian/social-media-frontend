document.addEventListener('submit', async function (event) {
    event.preventDefault();

    const user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    try {
        if(response.status !== 200) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }

        localStorage.setItem("token", JSON.parse(await response.text()).token);
    }
    catch(error) {
        alert(`Error: ${error.message}`);
    }
});