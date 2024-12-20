// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
process.noDeprecation = true;     //removed punycode depreciation warning
require("dotenv").config();

const app = require("./app.js");
const { connectToDatabase } = require("./src/db/db.js");

function listenForRequests() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
 //   console.log("Now listening on port", port);
  });
}

connectToDatabase().then(() => {
  listenForRequests();
});
