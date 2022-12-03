const express = require("express");
const webpush = require("web-push");
const path = require("path");

// ./node_modules/.bin/web-push generate-vapid-keys

const publicKey =
  "BLb1LdwgP5B8O5YFANmGxNyVUaArrx0bRcFGWjcnw6BM7lIVYuYg7uwht9eoKurNjGrT8sr0vV8ifsIyE3WEpC0";
const privateKey = "JIPx-Ruk90q6HTva7awLMMACRjCM64yyezd3Xx9P_CU";
// const public_vapid_key =
//   "BGYjaIi4FzCZCDrTH76_iS-WBkJEOcnAS-eKQNUHEf4aWUDbS9eMwo_QRdA71dYm8RSy1OHP2ybV1WuRJ9YCVks";

// const private_vapid_key = "c0zz22fm3tRgYAw3LRMoKS1JlczYCddJcJuzGch3SDc";
webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());
let mysubscriptions = [
  //chrome
  {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/fq9RVxe_2j0:APA91bH-9EgxW9xdZlGqfAHbmm3ZXDiz2d9TS_Ofda22SLr8EWMdZKsSSWSB4zTdY_PPFr8dnQH-_OM0mec_MVr7xuxXPP_j_HAx8_tfMdaHhrJB8aEVQQaGFXutQxEa5pQLjFFOzibk",
    expirationTime: null,
    keys: {
      p256dh:
        "BLKFOhAAOCqc5_QxIZfl5NwaPFhKmGJXwrStKbdE-LSR02Yqo-jLDOqXIaqvgIWHJs7vCum2g4grrT50J2L-sIo",
      auth: "7OMQxeFSqjwsyjQfkrm-Dg",
    },
  }, //safari
  {
    endpoint:
      "https://web.push.apple.com/QE7sNE3XEef68-u2CEdkWpLT1qS8Iv8ugN7M95HJoFAwlgoCbVhV_qlQPmZT-c9kE9Tir6qc5nybj3bpAkeFXyEySLvE8AiKBh-lb_m6NZyBmpLFyEzzTyLhHM8H0RjpidNVjJ5Ur7xr5AgJ_ooe9PLIqL28mS1-2iwLW5rdE5Q",
    keys: {
      p256dh:
        "BGvj_XhC6iCt7cqaVhvbC_sxlF9hSgbKz1V0beqefQRrYG0qRSj-ZcoNHN8e7g4ec9bsG7oQfBqHcR4X3O-uvY8",
      auth: "26PCFc-v-Px7837kFKFUWQ",
    },
  },
];
// app.get("/", async (req, res) => {
//   res.send("hello sir it is working!");
// });

// const vapid_keys = webpush.generateVAPIDKeys();
// console.log(vapid_keys);
app.post("/subscribe", async (req, res) => {
  const subscripetion = req.body;
  console.log("====================================");
  console.log(subscripetion);
  console.log("====================================");
  // 201 - resource created
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Hayelom sending notification",
    body: "Yes, it works!",
  });
  webpush
    .sendNotification(subscripetion, payload)
    .catch((err) => console.error(err));
});
app.get("/push", async (req, res) => {
  res.send("<h1>sent</h1>");
  const payload = JSON.stringify({
    title: "Hayelom sending notification",
    body: "Yes, it works!",
  });
  mysubscriptions.forEach((sub) => {
    webpush.sendNotification(sub, payload).catch((err) => console.error(err));
  });
});
app.listen(8000, () => console.log("app is listening on port 8000"));
