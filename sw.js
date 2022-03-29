const cacheName = "Quran-v8";
const assets = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/background.js",
  "/images/icon-128.png",
  "/images/photo-1416949929422-a1d9c8fe84af.jpg",
  "/images/photo-1421217802296-7a0b5e2abef2.jpg",
  "/images/photo-1431794062232-2a99a5431c6c.jpg",
  "/images/photo-1460472749544-d2b2f1a2b202.jpg",
  "/images/photo-1470813740244-df37b8c1edcb.jpg",
  "/images/photo-1584043204475-8cc101d6c77a.jpg",
  "/images/photo-1621679613806-421680402771.jpg",
  "/fonts/Changa-Bold.ttf",
  "/fonts/Changa-Light.ttf",
  "/fonts/Changa-Regular.ttf",
  "/fonts/icomoon.eot",
  "/fonts/icomoon.svg",
  "/fonts/icomoon.ttf",
  "/fonts/icomoon.woff",
  "/fonts/QuranRegular.ttf",
  "/quran.json",
  "/manifest.json",
  "/sw.js",
];
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache
          .addAll(assets)
          .then((result) => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
self.addEventListener("activate", (activateEvent) => {
  activateEvent.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key != cacheName)
            .map((key) => caches.delete(key))
        );
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches
      .match(fetchEvent.request)
      .then((res) => {
        return (
          res ||
          fetch(fetchEvent.request)
            .then((fetchRes) => {
              return caches
                .open(cacheName)
                .then((cache) => {
                  cache.put(fetchEvent.request, fetchRes.clone());
                  return fetchRes;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            })
        );
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
