import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'
function Login() {
    const [{},dispatch] = useStateValue()
    const signIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user
                })
            })
            .catch(error=> alert(error.message))
    }
  return (
<div className='login'>
 <div className="login__container">
     <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="logo" />
     <div className="login__text">
         <h1>Sign in to WhatsApp</h1>
     </div>

     <button  onClick={signIn} >
        Sign In With Google
     </button>
 </div>
</div>
  )
}

export default Login