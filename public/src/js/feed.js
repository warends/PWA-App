var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(deferredPromt){ //display the add to home screen button when you choose to do so, not when chrome wants you too. 
      deferredPromt.promt();
      deferredPromt.userChoice.then(function(choice){
          if(choice.outcome === 'dismissed'){
              console.log('user canceled');
          } else {
              console.lo('user added to home screen')
          }
      });
      deferredPromt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
