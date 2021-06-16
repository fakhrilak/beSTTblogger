require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();
const path = require("path");
const multer = require("multer")
const port = process.env.PORT || 5000;
const cors = require('cors');
const dayjs = require("dayjs")
app.use(cors());
app.use(express.json());

app.use('/ta', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})