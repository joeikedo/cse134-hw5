//This global variable is used to check the current id of the post being deleted/edited.
//It is set by the onclick event handlers in the crud.html page.
window.currentPostId = ''; 

//The array that stores the Post info. It is filled with the localStorage saved values in the below setupLocalStorage function.
let postInfoArray = [];

//This function sets any blogposts stored in local storage to be saved in the postInfoArray variable.
function setupLocalStorage(){
    //Check first if the key is in local storage. If not we need to create it for first time.
    if (localStorage.getItem('blogPostArrayKey') === null) {
        //Need to prepopulate list if first time. 
        let templateArray = [];
        const templateItem1 = {parentId: '422cf175-8c97-4d8d-8d3e-bdf8620670e3', summary: 'Today I went to the park. It was fun.', date: '2022-07-25', title: 'Fun Day'};
        const templateItem2 = {parentId: 'dd2e1b0b-349d-4577-a8c0-b7d262844379', summary: 'Today was ok. I did not do very much.', date: '2022-07-26', title: 'Ok Day'};
        const templateItem3 = {parentId: 'd97c3fa5-6c9a-4296-9380-5dc09d9c6d21', summary: 'Today was interesting. I saw a musical event.', date: '2022-07-27', title: 'Interesting Day'};
        templateArray.push(templateItem1);
        templateArray.push(templateItem2);
        templateArray.push(templateItem3);
        localStorage.setItem('blogPostArrayKey', JSON.stringify(templateArray));
    }

    postInfoArray = JSON.parse(localStorage.getItem('blogPostArrayKey'));

}


//Get the post list, so you can blog post <li> elements to it using the injectListItems() function below.
let postListTag =  document.getElementById('postList');
//This function goes through the array of blog posts and inserts them into the postListTag html tag as list item tags.
//Additionally, two button tags with embedded onclick event handlers are added inside the list item tag, along with some
//div/span tags to help with styling that occurs later on. 
function injectListItems(){

    const emptyNoticeTag = document.getElementById('emptyListNotice');
    if(postInfoArray.length == 0){
        emptyNoticeTag.innerText = 'There are no blog posts.';
    }
    else{
        emptyNoticeTag.innerText = '';
    }
    
    let postAggregate = '';
    for(let i = 0; i < postInfoArray.length; i++){
        postAggregate = postAggregate + `<li id="${postInfoArray[i].parentId}"><h2>${postInfoArray[i].title}</h2> <p>(${postInfoArray[i].date})</p> <p>${postInfoArray[i].summary}</p> <div><button class="editButton" data-parent-id-edit="${postInfoArray[i].parentId}" data-parent-summary="${postInfoArray[i].summary}" data-parent-title="${postInfoArray[i].title}" data-parent-date="${postInfoArray[i].date}" onclick="editPost(this.getAttribute('data-parent-id-edit'), this.getAttribute('data-parent-summary'), this.getAttribute('data-parent-title'), this.getAttribute('data-parent-date'))"><span>Edit</span></button><button class="deleteButton" data-parent-id="${postInfoArray[i].parentId}" onclick="deletePost(this.getAttribute('data-parent-id'))"><span>Delete</span></button></div></li>`
    }
    postListTag.innerHTML = postAggregate;
} 


//Add Post button click event handler. Shows the add post modal to screen with empty input fields.
//These variables are all set by the bottom DOMContentLoaded function.
let addPostDialog;
let addTitleInput;
let addPostInput;
let addDateInput;
function addPostFunction(event){
    addPostInput.value = '';
    addDateInput.value = '';
    addTitleInput.value = '';
    addPostDialog.showModal();
}

//These three functions handle the events where the add/edit/delete dialog boxes are closed.
/**
 * blogPost objects are added into the postInfoArray variable/localStorage and they have the following fields:
 *  parentId: String. This is the id of the <li> tag which contains the blogpost in HTML.
 *  summary: String.
 *  date: String.
 *  title: String.
 */
function closeAddPostDialogHandler(){
    if(addPostDialog.returnValue == 'ok'){
        //Add the new post to local storage so it can be retrieved on subsequent page loads.
        const postId = crypto.randomUUID();
        const newPost = {parentId: postId, summary: addPostInput.value, date: addDateInput.value, title: addTitleInput.value}
        postInfoArray.push(newPost);
        localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));

        //Add the actual post info to the markup of the page
        injectListItems();
    }
}

function closeDeletePostDialogHandler(){
    const deletePostDialog = document.getElementById('deletePostDialog');

    if(deletePostDialog.returnValue == 'ok'){
        //Filter out the array element with the corresponding parentId value.
        const filteredArray = postInfoArray.filter(function(e) { return e.parentId !== window.currentPostId });
        postInfoArray = filteredArray;
        localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));

        injectListItems();
        window.currentPostId = '';
    }
}

function closeEditPostDialogHandler(){
    const editPostDialog = document.getElementById('editPostDialog');

    if(editPostDialog.returnValue == 'ok'){
        const editInputValue = document.getElementById('editPostInput').value;
        const editTitleValue = document.getElementById('editTitle').value;
        const editDateValue = document.getElementById('editDate').value;

        const indexOfObject = postInfoArray.findIndex((obj => obj.parentId == window.currentPostId));
        
        postInfoArray[indexOfObject].summary = editInputValue;
        postInfoArray[indexOfObject].title = editTitleValue;
        postInfoArray[indexOfObject].date = editDateValue;

        localStorage.setItem('blogPostArrayKey', JSON.stringify(postInfoArray));
        
        injectListItems();
        window.currentPostId = '';
    }
}


//This function checks local storage to display the blog posts to the page, and then sets the add/edit/delete dialog
//event listeners.
document.addEventListener('DOMContentLoaded', () =>
{
    //Pull items from local storage.
    setupLocalStorage();
    //Display local stored items.
    injectListItems();


    //Add post listeners to showing modal, and handling modal input once closed.
    addPostInput = document.getElementById('postInput');
    addDateInput = document.getElementById('addDate');
    addTitleInput = document.getElementById('addTitle');
    const addPostButton = document.getElementById('addPostButton');
    addPostButton.addEventListener('click', addPostFunction);

    addPostDialog = document.getElementById('addPostDialog');
    addPostDialog.addEventListener('close', closeAddPostDialogHandler);


    //Delete post listener to handle when delete modal closed.
    const deletePostDialog = document.getElementById('deletePostDialog');
    deletePostDialog.addEventListener('close', closeDeletePostDialogHandler);


    //Edit post listener to handle when edit modal is closed. 
    const editPostDialog = document.getElementById('editPostDialog');
    editPostDialog.addEventListener('close', closeEditPostDialogHandler);

})
