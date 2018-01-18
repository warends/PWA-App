var CACHE_STATIC = 'static-v2';
var CACHE_DYNAMIC = 'dynamic-v2';

self.addEventListener('install', function(event){
    console.log('installed ' + event);
    event.waitUntil(
        caches.open(CACHE_STATIC).then(function(cache){
            console.log('pre caching app shell');
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/js/feed.js',
                '/src/js/promise-polyfill.js',
                '/src/js/fetch-polyfill.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons'
            ]);
        })
    )
});

self.addEventListener('activate', function(event){
    console.log('activating service worker ' + event);
    event.waitUntil(
        caches.keys()
            .then(function(keyList){
                return Promise.all(keyList.map(function(key){
                    if(key !== CACHE_STATIC && key !== CACHE_DYNAMIC){
                        console.log('service worker removing old cache');
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            } else {
                return fetch(event.request).then(function(res){
                    return caches.open(CACHE_DYNAMIC).then(function(cache){
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                }).catch(function(err){

                });
            }
        })
    );
});
