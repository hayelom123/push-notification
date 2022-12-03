console.log("Serice Worker loaded...");
self.addEventListener("install", (evt) => {
  self.skipWaiting();
});
self.addEventListener("push", function (event) {
  console.log("====================================");
  console.log(event);
  console.log("====================================");
  const data = event.data.json();
  console.log("Push recived ...", data);
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "https://avatars.githubusercontent.com/u/70315287?v=4",
    })
  );
});
