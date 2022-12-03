const public_vapid_key =
  "BLb1LdwgP5B8O5YFANmGxNyVUaArrx0bRcFGWjcnw6BM7lIVYuYg7uwht9eoKurNjGrT8sr0vV8ifsIyE3WEpC0";

// check for service workers

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== "granted") {
      throw new Error("We weren't granted permission.");
    }
  });
}
async function start() {
  await askPermission();
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));
  }

  if (!("PushManager" in window)) {
    console.log("Push isn't supported on this browser, disable or hide UI");
    // Push isn't supported on this browser, disable or hide UI.
    // return;
  }
}

// register sw ,register push, send push

async function send() {
  console.log("registering service worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "http://localhost:8000/",
  });
  console.log("Servoce worker regitsred .........");
  // register push

  console.log("Registering push.....");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: public_vapid_key, // urlBase64ToUint8Array(public_vapid_key),
  });
  console.log("Push registerd...", subscription);
  // send push Notification

  console.log("sending push...");
  // Send Push Notification
  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  console.log("Push Sent...");
}
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
