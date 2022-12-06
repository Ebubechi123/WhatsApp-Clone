import React,{useState,useEffect} from 'react'
import {MdChat, MdDonutLarge,MdMoreVert,MdSearch,MdSettings} from "react-icons/md"
import {FaUserCircle} from "react-icons/fa"
import './Sidebar.css'
import SideBarChat from './SideBarChat'
import db from  './firebase'
import { doc, onSnapshot, collection, query, } from "firebase/firestore";
import { useStateValue } from './StateProvider'

function SideBar() {
  const [rooms,setRooms] = useState([]);
 const [{user},dispatch]= useStateValue();

  useEffect(()=>{
    const q = query(collection(db,"rooms"));

    onSnapshot(q,(snapshot)=>(
      setRooms(snapshot.docs.map(doc=>(
        {
          id:doc.id,
          data:doc.data(),
        }
      )))
    ));
  
  },[])
  return (
    <div className="sidebar">
        <div className="sidebar__header">
      {user?.photoURL !== "" && <>
   <img src={user.photoURL} style={{width:'50px' ,height:"50px", borderRadius:'50px'}} />
      </> }

      {user?.photoURL ===""  &&        <FaUserCircle/>}
   <div className="sidebar__headerRight">
       <MdDonutLarge/>
       <MdChat/>
       <MdMoreVert/>
   </div>
        </div>
    

        <div className="sidebar__search">
       <div className="sidebar__searchContainer">
       <MdSearch/>
        <input type="text" placeholder='Search or start a new chat' />
       </div>
        </div>

        <div className="sidebar__chats">
            <SideBarChat addNewChat />
          {
            rooms.map(room=>(
              <SideBarChat key={room.id} id={room.id} name={room.data.name}/>
            ))
          }
        </div>
    </div>

  )
}

export default SideBar