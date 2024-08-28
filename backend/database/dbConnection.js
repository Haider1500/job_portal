const { mongoose } = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(
      process.env.MONGO_URI,
      { dbName: "job_portal" },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((error) => {
      console.log("db error", error.message);
    });
};
module.exports = dbConnection;

// import mongoose from 'mongoose'

// export const connectDb = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/test', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     })
//   } catch (error) {
//     console.log(error.message)
//   }
// }
