
import './chatThread.css'

function ChatThread({data , color}){
    // const colors = ['#6DC5D1', '#FDE49E', '#006769', '#40A578', '#FEB941'];
    // const randomIndex = Math.floor(Math.random() * colors.length);
    // const color = colors[randomIndex] || 'blue'; // Use blue as a fallback color

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <div className="thread-name" style = {{fontSize:'10px', color:`#${color}`}}>
                {data.userName}
                {console.log("color: ", color)}
            </div>
            <div className="thread-msg">
                {data.msg}
            </div>
        </div>
    )
}
export default ChatThread;
