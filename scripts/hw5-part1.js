/**
 * Converts new Date() object to YYYY-MM-DDTHH:MM format
 * @param {Date} dateObject 
 */
function convertDateTime(dateObject){
    const year = dateObject.getFullYear();
    let month = '' + (dateObject.getMonth() + 1) ;
    let date = '' + dateObject.getDate();
    let hours = '' + dateObject.getHours();
    let minutes = '' + dateObject.getMinutes();

    if(month.length < 2){
        month = '0' + month;
    }
    if (date.length < 2){
        date = '0' + date;
    }
    if (hours.length < 2){
        hours = '0' + hours;
    }
    if (minutes.length < 2){
        minutes = '0' + minutes;
    }

    const formattedDateTime = `${year}-${month}-${date}T${hours}:${minutes}`;
    return formattedDateTime;
}


/**
 * Helper function that displays the response of an HTTP request to the output HTML tag.
 */
function displayResponse(response){
    const keyArray = Object.keys(response);
    const outputTag = document.getElementById('response');
    outputTag.innerHTML = '';

    for(let i = 0; i < keyArray.length; i++ ){

        const orderedList = document.createElement('ol');
        orderedList.innerText = keyArray[i];

        const listItem = document.createElement('li');
        if(response[keyArray[i]] === null){
            listItem.innerText = 'null';
        }
        else if(typeof(response[keyArray[i]]) === 'string'){
            listItem.innerText = response[keyArray[i]];
        }
        else if(typeof(response[keyArray[i]]) ==='object'){
            if(Object.keys(response[keyArray[i]]).length === 0){
                listItem.innerText = '{}';
            }
            else{
                const internalObject = response[keyArray[i]];
                const internalKeyArray = Object.keys(internalObject);
                const internalOrderedList = document.createElement('ol');

                for(let x = 0; x < internalKeyArray.length; x++){
                    const internalListItem = document.createElement('li');
                    internalListItem.innerText = `${internalKeyArray[x]} : ${internalObject[internalKeyArray[x]]}`;
                    internalOrderedList.appendChild(internalListItem);
                }
                listItem.appendChild(internalOrderedList);
            }
        }

        orderedList.appendChild(listItem);
        outputTag.appendChild(orderedList);
    }
    

    // outputTag.innerText = JSON.stringify(response);
}


/**
 * Posts form info. All fields are in payload of post request.
 */
function postFunction(){

    const formTag = document.querySelector('form');
    const dateTag = document.getElementById('date');
    const currentDateTime = new Date();
    dateTag.value = convertDateTime(currentDateTime);
    const payload = new FormData(formTag);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://httpbin.org/post');
    xhr.responseType = 'json';
    xhr.send(payload);

    xhr.onload = () =>{
        displayResponse(xhr.response);
    };
}

/**
 * Get form info. GET requests don't have payloads, and I am assuming that we would get articles by ID number,
 * so I have added the id as a url argument to simulate a realistic GET request.
 */
function getFunction(){

    const xhr = new XMLHttpRequest();

    const idTag = document.getElementById('id');
    const articleNameTag = document.getElementById('article_name');
    const articleBodyTag = document.getElementById('article_body');
    const currentDateTime = new Date();
    const currentTimeFormatted = convertDateTime(currentDateTime);

    const endpoint = `https://httpbin.org/get?id=${idTag.value}&article_name=${articleNameTag.value}&article_body=${articleBodyTag.value}&date=${currentTimeFormatted}`;

    xhr.open('GET', endpoint);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = () =>{
        displayResponse(xhr.response);
    };

}

/**
 * Put form info. All fields are in the payload of put request.
 */
function putFunction(){
    
    const formTag = document.querySelector('form');
    const dateTag = document.getElementById('date');
    const currentDateTime = new Date();
    dateTag.value = convertDateTime(currentDateTime);
    const payload = new FormData(formTag);

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://httpbin.org/put');
    xhr.responseType = 'json';
    xhr.send(payload);

    xhr.onload = () =>{
        displayResponse(xhr.response);
    };
}

/**
 * Delete form info
 */
function deleteFunction(){

    const formTag = document.querySelector('form');
    const dateTag = document.getElementById('date');
    const currentDateTime = new Date();
    dateTag.value = convertDateTime(currentDateTime);
    const payload = new FormData(formTag);

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'https://httpbin.org/delete');
    xhr.responseType = 'json';
    xhr.send(payload);

    xhr.onload = () =>{
        displayResponse(xhr.response);
    };
}


/**
 * This function sets up the event listeners for clicking the four buttons.
 */
function initialize(){
    document.getElementById('postBtn').addEventListener('click', postFunction);
    document.getElementById('getBtn').addEventListener('click', getFunction);
    document.getElementById('putBtn').addEventListener('click', putFunction);
    document.getElementById('deleteBtn').addEventListener('click', deleteFunction);
}

//Once content is loaded, initialize event listeners.
document.addEventListener('DOMContentLoaded', initialize);