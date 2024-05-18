import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import './chatroom.css';
import ChatThread from "./chatThread";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

let socket;

function Chatroom (){
    const [msg, setMsg] = useState("");
    const [msgList, setMsgList] = useState([]);
    const {url} = useParams();
    let urlArray = url.split('_');
    const userName = urlArray[0];
    const userId = urlArray[1];
    const color = urlArray[2];
    console.log(url)
    console.log("---color---: ", urlArray);

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
        <div className="main">
        <div className="chat">
            <ul className="chat-thread">
                {msgList.map((data, index) => (
                    <div className={ data.userId === userId ? "right" : "left"}>
                        <li className="thread" key={index}><ChatThread data={data} color={color}/></li>
                    </div>
                    
                ))}
            </ul>
            <div className="chat-window">
            <form  onSubmit={handleSubmit}>
                <input className="chat-window-msg" type="text" placeholder="Type a message" value={msg} onChange={(e) => setMsg(e.target.value)}></input>
                <button className="sent-btn" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </form>
            </div>
            
        </div>
        </div>
    )
}
export default Chatroom;