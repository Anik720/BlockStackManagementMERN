const mongoose = require("mongoose");

module.exports = () => {
  console.log("connecting to DB...");
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
