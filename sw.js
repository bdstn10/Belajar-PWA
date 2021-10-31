let cacheName = 'v1-cache';
let assetsToCache = [
    '/',
    'index.html',
    'main.js',
    'fallback.html'
]
self.addEventListener('install', e => {
    console.log("Service Worker wis dadi diinstall!!")
    console.log(e)
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assetsToCache).then(() => console.log('Berhasil membuat cache asset-asset penting'))
        })
    )

    skipWaiting()
})

let respond = new Response("Halamane ora ono")
self.addEventListener('fetch', e => {
    let clonedRequest = e.request.clone()
    e.respondWith(
        fetch(e.request)
        .then(r => {
            console.log(r);
            if (r.status != 404) {
                let clonedResponse = r.clone()

                caches.open(cacheName).then(cache => {
                    cache.put(clonedRequest, clonedResponse);
                })

                return r;
            } else {
                return fetch("fallback.html");
            }

        })
        .catch(async(err) => {
            debugger
            let cache = await caches.open(cacheName)
            return cache.match(e.request).then(r => {
                if (r) {
                    console.log('Nemu cache sing cocok mass');
                    return r
                } else {
                    console.log("Duh mas, sepurane, cachene ra ana sing pas");

                    return caches.match("fallback.html")
                }
            })
        })
    )
})