const express=require('express');
const app=express();
const cookieParser=require('cookie-parser')
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const db=require('./config/mongoose-connection');
const bodyParser=require('body-parser')


const ownersRouter=require('./routes/ownersRouter');
const userRouter=require('./routes/usersRouter');
const productsRouter=require('./routes/productsRouter');
const indexRouter=require('./routes/index');
const expressSession=require("express-session");
const flash=require('connect-flash');
const { log } = require('console');

const cors = require("cors")


app.use(cors({
    origin: ['http://localhost:5173','https://save-more-mern.vercel.app/' ], // React app URL
    credentials: true                 // Allow cookies to be sent
}));
require("dotenv").config();
 console.log(process.env.JWT_KEY);
app.set('view engine','ejs');
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true}));
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

const http = require('http');
const server = http.createServer(app);

// Socket.io setup
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173","https://save-more-mern.vercel.app/"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

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
        if (socket.rooms) {
            for (const roomId of socket.rooms) {
                if (roomId !== socket.id) { // Skip the default room (socket ID)
                    socket.broadcast.to(roomId).emit('left', 'A user');
                }
            }
        }
        console.log('A user disconnected:', socket.id);
    });
});
server.listen(3000, () => {
    console.log("Server + Socket.IO running on port 3000");
});


