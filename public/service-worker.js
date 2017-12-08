self.addEventListener('install', function(event){
    console.log('installed ' + event);
});

self.addEventListener('activate', function(event){
    console.log('activated ' + event);
    return self.clients.claim();
});

self.addEventListener('fetch', function(event){
    //console.log('fetched '+ event);
    event.respondWith(fetch(event.request));
});
