document.getElementById('logout-yes').addEventListener('click', function() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = 'http://localhost/social-media-frontend/html/login.html';
});