const express = require('express')
const path = require('path')
const session = require('express-session')
const cookie_parser = require('cookie-parser')
const student_router = require('./routes/student_routes');
const auth_router = require('./routes/auth_routers');
const { deserialize_user, auth_require } = require('./middlewares/session.middleware')

//app variables
const port = 3000
const BASE_DIR = __dirname


const app = express()

app.use(cookie_parser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(deserialize_user)
app.use('/auth/', auth_router)
app.use('/api/', auth_require, student_router);


// app.use((req,res,next)=>{
//     next()
// })

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})