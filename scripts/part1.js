//outputTag variable is a reference to the HTML <output> tag where we output our values for confirm/prompt.
let outputTag;

//Clear functions, clear text as soon as a button is clicked. Buttons of type button have no default action so
//the event parameter is unused, and does not need to be prevented.
function clearBeforeAlert(event){
    //When any button is clicked, the output tag must be cleared first before the alert displays. 
    outputTag.innerText = '';

    //There is a timing issue where the output tag text does not clear immediately when a button is clicked, this is why
    //the setTimeout function is used. 
    setTimeout(alertFunction, 0);
}

function clearBeforeConfirm(event){
    outputTag.innerText = '';

    setTimeout(confirmFunction, 0);
}

function clearBeforePromptUnsafe(event){
    outputTag.innerText = '';

    setTimeout(promptUnsafeFunction, 0);
}

function clearBeforePromptSafe(event){
    outputTag.innerText = '';

    setTimeout(promptSafeFunction, 0);
}

//The functions called by the clear functions to show the actual alert/confirm/prompt.
function alertFunction(event){
    alert('Alert button was pressed');
}

function confirmFunction(event){
    let confirmResult = confirm('Press a button!');

    outputTag.innerText = `The value returned by the confirm method is : ${confirmResult}`;
}

function promptUnsafeFunction(event){
    let userInput = prompt('Please enter your input', '');

    if(userInput == null){
        outputTag.innerHTML = 'User didn\'t enter anything';
    }
    else{
        outputTag.innerHTML = `The user entered: ${userInput}`;
    }
}

function promptSafeFunction(event){

    //This is a function for the tagged template string construction.
    function myTemplateTag(strings, inputExp){
        let str0 = strings[0];

        return `(Safe Mode)${str0} ${inputExp}`;
    }


    let userInput = prompt('Please enter your input', '');
    let cleanedInput = DOMPurify.sanitize(userInput);
    let finalOutput = myTemplateTag`The user entered: ${cleanedInput}`;

    if(userInput == null){
        outputTag.innerHTML = 'User didn\'t enter anything';
    }
    else{
        outputTag.innerHTML = finalOutput;
    }

}

//This function sets up the event listeners on all four of the buttons once the DOM is loaded.
document.addEventListener('DOMContentLoaded', () =>
    {
        outputTag = document.getElementById('outputTag');

        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', clearBeforeAlert);

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', clearBeforeConfirm);

        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', clearBeforePromptUnsafe);

        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', clearBeforePromptSafe);
    }
)
