const express = require('express')
const authroutes = require('./routes/auth_routes')
const mongoose = require('mongoose');
const communityroutes = require('./routes/community_routes')
const communitymembersroutes = require('./routes/communitymembers_routes')
const userroutes = require('./routes/users_routes')
const postsroute = require('./routes/post_routes')
const votesroute = require('./routes/votes_routes')
const commentsroute = require('./routes/comments_routes')
const postsummaryroute = require('./routes/postsummary_routes')
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express()
const port = 5001

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors())

app.use("/api/auth", authroutes);
app.use("/api/community",communityroutes);
app.use("/api/community",communitymembersroutes);
app.use("/api/users",userroutes);
console.log('USERRoutes mounted at /api/users');
console.log('Available routes:');
userroutes.stack.forEach((layer, index) => {
  if (layer.route) {
    console.log('  ', Object.keys(layer.route.methods).join(',').toUpperCase(), layer.route.path);
  }
});
app.use("/api/posts",postsroute);
app.use('/api/votes', votesroute);
app.use('/api/comments', commentsroute);
app.use('/api/postsummary', postsummaryroute)
console.log("MONGO_URI =", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));


app.listen(port , ()=>{
    console.log(`server running on port ${port}`)
})
