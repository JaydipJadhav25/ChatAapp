const express = require('express')
const http  = require('http')
const path = require('path')

const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
//input output
const io = new Server(server) //handle socket io
// app.use(express.static("/public"))
app.use(express.static(path.resolve("./public")))


//this is handle  socket io

io.on('connection' , (socket) =>{
    // console.log("new user connected : " , socket.id);
    //front end kdu yenra massage apn server side la access kru tya other userla 
    // send kru

    //event
    //jeva apn user massage yeil teva pn 
    socket.on('user-massage' , (massage) =>{
    // console.log("new user connected : " , socket.id);
      console.log("new user massage : ",  massage)

     // and this server send this massage to all users
    //  io : jevade pn connections
    //emit : event this event handel on front end
    io.emit("massage", massage)

    })

})



// this is handle http req
app.get('/', function (req, res) {
//   res.send('Hello World')
  res.sendFile("./public/index.html")})

server.listen(3000 , () =>{ console.log("server is listen on 3000 port")})