const express = require('express')
const authroutes = require('./routes/auth_routes')
const mongoose = require('mongoose');
const communityroutes = require('./routes/community_routes')
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = 5001

app.use(express.json())
app.use(cors())

app.use("/api/auth", authroutes);
app.use("/api/community",communityroutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));


app.listen(port , ()=>{
    console.log(`server running on port ${port}`)
})