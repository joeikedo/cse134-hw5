//Opens up users mail app with mailto function, pulls user subject/message body from the HTML input/textarea tags.
function mailFunction(event){
    event.preventDefault();

    const subjectLineInput = document.getElementById('subjectLine');
    const emailMessageInput = document.getElementById('message');

    if(!emailMessageInput.value){
        alert('Please enter a message in the message body!');
    }
    else{
        document.location.href = `mailto:joeikedo@gmail.com?subject=${subjectLineInput.value}&body=${emailMessageInput.value}`;
    }
}

//Adds event listener to the Contact form submit button.
document.addEventListener('DOMContentLoaded', () =>
    {
        const emailSubmitButton = document.getElementById('emailSubmitButton');
        emailSubmitButton.addEventListener('click', mailFunction);
    }
)