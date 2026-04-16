const notes = document.getElementById('formnotes');
notes.addEventListener('submit', function(event){
    event.preventDefault();
    const content = document.getElementById('content').value;
    const newnote = {
        content: content
    
    };
    console.log("note object created:", newnote);


});