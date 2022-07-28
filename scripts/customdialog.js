//outputTag variable is a reference to the HTML <output> tag where we output our values for confirm/prompt.
let outputTag;

// These 4 below functions are to show the corresponding dialog box when a butotn is clicked. 
//The variables above these functions are set to their corresponding HTML tag in the DOMCONTENTLOADED function at the bottom.

// Alert
function alertFunction(event){
    const alertDialog = document.getElementById('alertDialog');
    outputTag.innerHTML = '';
    alertDialog.showModal();
}

//Confirm
let confirmDialog;
function confirmFunction(event){
    outputTag.innerHTML = '';
    confirmDialog.showModal();
}

//Prompt
let promptUnsafeDialog;
let unsafeInput;
function promptUnsafeFunction(event){
    outputTag.innerHTML = '';
    unsafeInput.value = '';
    promptUnsafeDialog.showModal();
}

//Prompt Safer
let promptSafeDialog;
let safeInput;
function promptSafeFunction(event){
    outputTag.innerHTML = '';
    safeInput.value = '';
    promptSafeDialog.showModal();
}


//These three functions handle the events where the custom modals are closed. Alert has no output so it doesn't need one.

//Confirm close handler
function closeConfirmHandler(){
    outputTag.innerHTML = `The value returned by the confirm method is : ${confirmDialog.returnValue}`;
}

//Prompt close handler
function closeUnsafePromptHandler(){
    if(promptUnsafeDialog.returnValue == 'cancel'){
        outputTag.innerHTML = 'User didn\'t enter anything';
    }
    else if(promptUnsafeDialog.returnValue == 'ok'){
        outputTag.innerHTML = `The user entered: ${unsafeInput.value}`;
    }
}

//Safer prompt close handler
function closeSafePromptHandler(){
    if(promptSafeDialog.returnValue == 'cancel'){
        outputTag.innerHTML = 'User didn\'t enter anything';
    }
    else if(promptSafeDialog.returnValue == 'ok'){

        function myTemplateTag(strings, inputExp){
            let str0 = strings[0];
    
            return `(Safe Mode) ${str0} ${inputExp}`;
        }

        let cleanedInput = DOMPurify.sanitize(safeInput.value);

        let finalOutput = myTemplateTag`The user entered: ${cleanedInput}`;

        outputTag.innerHTML = finalOutput;
    }
}


//This function sets all the necessary button and close dialog event listeners for the page.
document.addEventListener('DOMContentLoaded', () =>
    {
        outputTag = document.getElementById('outputTag');

        //Alert button click event listener.
        const alertButton = document.getElementById('alertButton');
        alertButton.addEventListener('click', alertFunction);

        //Confirm button click event listener. And its close dialog event listener.
        const confirmButton = document.getElementById('confirmButton');
        confirmButton.addEventListener('click', confirmFunction);
        confirmDialog = document.getElementById('confirmDialog');
        confirmDialog.addEventListener('close', closeConfirmHandler);
        
        //Prompt button click event listener. And its close dialog event listener.
        unsafeInput = document.getElementById('unsafeInput');
        const promptButtonUnsafe = document.getElementById('promptButtonUnsafe');
        promptButtonUnsafe.addEventListener('click', promptUnsafeFunction);
        promptUnsafeDialog = document.getElementById('promptUnsafeDialog');
        promptUnsafeDialog.addEventListener('close', closeUnsafePromptHandler);

        //Safer Prompt button click event listener. And its close dialog event listener.
        safeInput = document.getElementById('safeInput');
        const promptButtonSafe = document.getElementById('promptButtonSafe');
        promptButtonSafe.addEventListener('click', promptSafeFunction);
        promptSafeDialog = document.getElementById('promptSafeDialog');
        promptSafeDialog.addEventListener('close', closeSafePromptHandler);

    }
)