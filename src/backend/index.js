const express = require('express');
const cors = require('cors');
const db = require('./db_config').connect();
const port = 3001

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port);