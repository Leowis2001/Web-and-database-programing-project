const registerform = document.getElementById('formregister');
registerform.addEventListener('submit', function(event){
    event.preventDefault();
    const FirstName = document.getElementById('first-name').value;
    const LastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const NewUser = {
        FirstName: FirstName,
        LastName: LastName,
        username: username,
        password: password
    };

    console.log("user object created:", NewUser);
});
