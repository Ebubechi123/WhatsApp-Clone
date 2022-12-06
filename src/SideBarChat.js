
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import React,{useEffect,useState} from 'react'
import {  FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import db from './firebase';
import './SideBarChat.css'


const SideBarChat = ({addNewChat,id,name}) => {
    const [seed,setSeed] = useState('');
    const [messages,setMessages] = useState('');
    useEffect(() => {
      setSeed(Math.floor(
        Math.random()*5000
    ))
    }, []);

    useEffect(()=>{
        if(id){
            const q = query(collection(db,"rooms",id,"messages"),orderBy('timestamp','desc'))

            onSnapshot(q,snapshot=>(
                setMessages(snapshot.docs.map(doc=> doc.data()))
            ))
        }
    },[id])

    const createChat = async()=>{
        const roomName = prompt('Please enter name for chat room');
        if (roomName) {
            // do some clever database stuff...
            const newRoom = await addDoc(collection(db,"rooms"),{
                name:roomName
            })
            // }

        
        }
    }
    
  return !addNewChat ?  (
   <Link to={`/rooms/${id}`} >
    <div className="sidebarChat">
        {/* <FaUserCircle/> */}
        <img src={`https://avatars.dicebear.com/api/human/${seed}.svg`}  style={{width:'29px'}} />
        <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
    </div>
   </Link>
  )

  :
    (<div onClick={createChat} className="sidebarChat">
        <h2>Add new chat</h2>
    </div>)
}

export default SideBarChat