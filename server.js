const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const cors = require("cors");
app.use(cors());

app.use('/uploads', express.static('public/uploads'));

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/route", require("./api/routes/route")); 

app.use(require("./api/helpers/response.helper"));

app.use(require("./api/helpers/error.helper").handleJoiErrors);

app.use(require("./api/helpers/error.helper").handleErrors);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // Listening to port
  console.log(`Listening to Port :  ${port}`);
});
