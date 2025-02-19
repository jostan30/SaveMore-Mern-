const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const db=require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/index');
const expressSession=require("express-session");
const flash=require('connect-flash');
const { log } = require('console');
const io=require('socket.io')(5000,{cors:{origin:'*'}}); 
const cors = require("cors")


app.use(cors({
    origin: 'http://localhost:5173',  // React app URL
    credentials: true                 // Allow cookies to be sent
}));
require("dotenv").config();
// console.log(process.env.EXPRESS_SESSION_SECRET);
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname,'public')));
// app.use(
//     expressSession({
//         resave:false,                   //we make use of this
//         saveUninitialized:false,
//         secret:process.env.EXPRESS_SESSION_SECRET
//     })
// )
// app.use(flash());     //flash makes use of express session to create messages
app.use('/',indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',userRouter);
app.use('/products',productsRouter);


io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('join-room', ({ roomId, userId, userType }) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-joined', userType);
        console.log(`${userType} ${userId} has joined room ${roomId}`);
    });

    socket.on('sendMessage', ({ roomId, userId, message, userType }) => {
        // if (userType === 'Buyer') {
        
        //     socket.broadcast.to(roomId).emit('newChatRequest', { roomId, message });
        // }
        // io.to(roomId).emit('receiveMessage', { userId, message, userType });
        socket.broadcast.to(roomId).emit('receiveMessage', { userId, message, userType });

    });

    socket.on('disconnect', () => {
        socket.rooms.forEach(roomId => {
            socket.broadcast.to(roomId).emit('left', 'A user');
        });
        console.log('A user disconnected:', socket.id);
    });
});
app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
});


