const express = require("express");
const cors=require('cors')
const mainRouter=require('./routes/index')

const app=express();
app.use(cors());
app.use(express.json())  //body-parser to support json body

app.use('/api/v1',mainRouter); // for modularity purposes

app.listen(3000);