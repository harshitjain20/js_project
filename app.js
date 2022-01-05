const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.get("/", (req, res) => {
  res.sendFile("E:/web socket/TEST-PROJECT/index.html");
});
const users = {}
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("sendMsg", (data) => {
    console.log(data,socket.id);
    socket.broadcast.emit("reciveNewMessage", {
      message: data,
      user: users[socket.id],
    });
  });
  socket.on('joinchat',(name)=>{
    users[socket.id] = name
    socket.broadcast.emit("newUserJoin",users[socket.id])
  })
  socket.on("disconnect", () => {
    console.log(users[socket.id], "user disconnect");
    delete users[socket.id]
  });
});
http.listen(8080, () => {
  console.log("app is running at port 8080");
});
