async function likePost(id) {
    const response = await fetch(`http://localhost:8000/post/${id}/like`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    try {
        if(response.status !== 201) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }

        const toast = document.getElementById('likeToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        toastBootstrap.show();
    } 
    catch (error) {
        alert(`Error: ${error.message}`);
    }
}