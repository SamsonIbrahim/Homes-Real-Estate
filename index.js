const app = require("./app/routes/index");
const keys = require("./app/config/keys");
const db = require("./app/config/db");
const dotenv = require("dotenv").config;

require("dotenv").config();

// console.log(process.env);

const PORT = process.env.PORT || 3000;

db()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(`Database connection failed ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
