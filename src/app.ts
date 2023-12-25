import express from "express";
import { connection } from "./database/db";
import bodyParser from "body-parser";
import { router } from "./routes/user.route";
import { envConfig } from "./config/envConfig";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use("/api", router);

connection
  .then(async () => {
    app.listen(envConfig.app.port, () => {
      console.log("Express is running on port " + envConfig.app.port);
    });
  })
  .catch((err) => console.log(err));
