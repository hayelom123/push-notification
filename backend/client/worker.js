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
  self.registration.showNotification(data.title, {
    body: "Notified by hayelom kiros",
    icon: "https://avatars.githubusercontent.com/u/70315287?v=4",
  });
});
