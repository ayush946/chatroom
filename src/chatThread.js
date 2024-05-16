function ChatThread({data}){
    // const colors = ['#6DC5D1', '#FDE49E', '#006769', '#40A578', '#FEB941'];
    // const randomIndex = Math.floor(Math.random() * colors.length);
    // const color = colors[randomIndex] || 'blue'; // Use blue as a fallback color

    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <div style = {{fontSize:'10px'}}>
                {data.userName}
            </div>
            <div>
                {data.msg}
            </div>
        </div>
    )
}
export default ChatThread;
