const app = require("./app");
const cloudinary = require("cloudinary").v2;

const port = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(port, () => {
  console.log(`server is listening at Port ${port}`);
});
