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
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
});
app.listen(8000, () => console.log("app is listening on port 8000"));
