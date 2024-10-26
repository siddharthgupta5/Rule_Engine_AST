const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db_connect = require('./db/connection');

dotenv.config();
db_connect();
const app = express();
const PORT=process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());


const ruleRoutes = require('./routes/rules');

app.use('/api/rules', ruleRoutes);

app.listen(PORT, () => {
    
  console.log(`Server Running on port ${PORT}`);
} );


module.exports = app;
