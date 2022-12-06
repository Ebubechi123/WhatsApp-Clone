import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import SideBar from './SideBar';
import React, { useState} from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

const [{user},dispatch] = useStateValue()

  return (
  <div className="app">
    {!user ? (
      <Login/>
    ) :
    (
      <div className="app__body">

      
      <SideBar/>
           <Routes>
      <Route path='/rooms/:roomId' element={<>
      
          
      <Chat/></>} />
      
      <Route path='/' element={<>
      {/* <Chat/> */}
      </>}/>
           </Routes>
          </div>
    )
    }
   
  </div>
  );
}

export default App;
