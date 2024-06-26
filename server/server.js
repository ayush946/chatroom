    const {Server} = require('socket.io');
    const io = new Server({
        connectionStateRecovery: {},
        cors: {
            origin: ["http://localhost:3000", "https://chatroom-blush.vercel.app/chatroom"]
        }
    });
    io.on("connection", (socket) => {
        socket.on("message", (data) => {
            io.emit("msg", data);
        })
    })


    io.listen(process.env.PORT || 3001);