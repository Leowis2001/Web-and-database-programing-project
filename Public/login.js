const loginform = document.getElementById('formlogin');
loginform.addEventListener('submit', function(event){
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginAttempt = {
        username: username,
        password: password
    };

    console.log("login Attempt:", loginAttempt);    

});
