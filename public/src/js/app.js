var deferredPromt;

if(!window.Promise){
    window.Promise = Promise;
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(){
            console.log('service worker registered');
        });
}

window.addEventListener('beforeinstallprompt', function(event){
    event.preventDefault();
    deferredPromt = event;
    return false;
});
