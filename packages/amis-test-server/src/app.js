const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const {printQr} = require('./printQr');

const tplPath = path.join(__dirname, 'tpl.json');

const app = express();

const serverPort = 3030;

app.use(cors());
app.use(express.json());

app.post('/save', (req, res) => {
  const tpl = JSON.stringify(req.body);
  fs.writeFileSync(tplPath, tpl);
  res.status(200).send({
    status: true
  });
});

app.get('/get', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = fs.readFileSync(tplPath);
  res.status(200).send(data);
});

app.listen(serverPort, () => {
  console.log('运行成功');
});

printQr(':3030/get');
