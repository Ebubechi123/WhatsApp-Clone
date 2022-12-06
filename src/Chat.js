
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { MdMic, MdMoreVert, MdOutlineAttachFile, MdOutlineEmojiEmotions, MdSearch } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import './Chat.css'
import db from './firebase';
import { useStateValue } from './StateProvider';
const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
      const [{user}] = useStateValue()

    useEffect(()=>{
        if(roomId){
 
            const docy = query(collection(db,"rooms"));
            const docRef = doc(docy,roomId);
           onSnapshot(docRef,snapshot=>(
                    setRoomName(snapshot.data().name)
                ));


                const q = query(collection(db,"rooms",roomId,"messages"),orderBy('timestamp','asc'))



                onSnapshot(q,snapshot=>(
                    setMessages(snapshot.docs.map(doc=> doc.data()))
                ))

        }
    },[roomId,seed])
    useEffect(() => {
        setSeed(Math.floor(
          Math.random()*5000
      ))
      }, [roomId]);


      const sendMessage =(e)=>{
        e.preventDefault();

        addDoc(collection(db,"rooms", roomId, "messages"), {
            name:user.displayName,
            message:input,
            timestamp: serverTimestamp(),
        })
        console.log('You typed:', input);
        setInput('')
      }
      console.log(messages)



  
  return (
    <div className='chat' >
<div className="chat__header">
{/* <FaUserCircle/> */}
<img src={`https://avatars.dicebear.com/api/human/${seed}.svg`}  style={{width:'29px'}} />

<div className="chat__headerInfo">
    <h3>{roomName}</h3>
    <p>Last seen at {""} {new Date( 
        messages[messages.length -1]?. timestamp?.toDate()
    ).toUTCString()} </p>
</div>
<div className="chat__headerRight">
    <MdSearch/>
    <MdOutlineAttachFile/>
    <MdMoreVert/>
</div>
</div>

<div className="chat__body">
    {messages.map(message=> (
        <p key={message.timestamp} className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
<span className="chat__name">
    
   {message.name}
</span>
{message.message}

<span className="chat__timestamp">
{new Date(message.timestamp?.toDate()).toUTCString()}
</span>
</p>
    ))}

</div>

<div className="chat__footer">
<MdOutlineEmojiEmotions/>
<form>
    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder='Type a message' />
    <button onClick={sendMessage} type='submit' >Send a message</button>
</form>
<MdMic/>

</div>

    </div>
  )
}

export default Chat