import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import './chatroom.css';
import ChatThread from "./chatThread";

let socket;

function Chatroom (){
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const {url} = useParams();
    let urlArray = url.split('_');
    const userName = urlArray[0];
    const userId = urlArray[1];

    useEffect( () => {
        socket = io(`http://localhost:3001/`);

        const messageHandler = (data) => {
            console.log("massage form server! ", data.userName, data.msg);
            setMsgList([...msgList , data]);
        }

        socket.on("connect" , () => {
            console.log("connection established: ", socket.connected)
        });

        socket.on("msg", messageHandler);
        return () => {
            socket.off("msg", messageHandler);
        }
    }, [msgList]);

    const handleSubmit = (event) => {
        event.preventDefault();
        socket.emit("message", {userId: userId, userName: userName, msg: msg});
        console.log(`msg from client ${userName} sended`);
        setMsg("");
    }
    
    return(
        <div className="chat">
            <ul className="chat-thread">
                {msgList.map((data, index) => (
                    <div className={ data.userId === userId ? "right" : "left"}>
                        <li key={index}><ChatThread data={data}/></li>
                    </div>
                    
                ))}
            </ul>
            <form className="chat-window" onSubmit={handleSubmit}>
                <label> Enter your msg here</label>
                <input className="chat-window-message" type="text" value={msg} onChange={(e) => setMsg(e.target.value)}></input>
                <input type="submit"/>
            </form>
            
        </div>
    )
}
export default Chatroom;