const app = require("./app");
const cloudinary = require("cloudinary").v2;

const port = process.env.PORT;

cloudinary.config({ cloud_name: "", api_key: "", api_secret: "" });

app.listen(port, () => {
  console.log(`server is listening at Port ${port}`);
});
