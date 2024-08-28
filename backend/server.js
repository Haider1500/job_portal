const app = require("./app");
const dbConnection = require("./database/dbConnection");

const port = process.env.PORT;
dbConnection();
app.listen(port, () => {
  console.log(`server is listening at Port ${port}`);
});
