const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDb} = require('./config/db');
const mainRouter = require('./routes/index')



const app = express();
const port = 3000;

dotenv.config();
app.use(cors());
app.use(express.json());


app.use('/api',mainRouter)

app.listen(port, async () => {
  connectDb();
  console.log("Server is listening on port " + port);
});
