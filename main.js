if ('serviceWorker' in navigator) {
    console.log("Browsermu ndukung service worker jo");
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Berhasil mendaftarkan Service Worker"))
        .catch(() => console.log("Gagal ndaftarke Service Worker mass"))
}