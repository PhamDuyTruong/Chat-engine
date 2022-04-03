import React, {useRef, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {ChatEngine} from "react-chat-engine";
import {auth} from "../firebase"
import { useAuth } from '../contexts/AuthContext';
import axios from "axios"

const Chats = () => {
    const didMountRef = useRef(false)
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);
    const handleLogout = async () =>{
            await auth.signOut();
            history.push("/")
    }

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
    }

    useEffect(() =>{
        if (!didMountRef.current){
            didMountRef.current = true
        }
        if(!user){
            history.push("/");
            return;
        }
       axios.get("https://api.chatengine.io/users/me/", {
          headers: {
              "project-id": "b1e593cf-5db6-4e24-a769-cd27625ca7aa",
              "user-name": user.email,
              "user-secret": user.uid
          }
        }
       ).then(() =>{
            setLoading(false);

       }).catch(() =>{
           let formData = new FormData();
           formData.append("email", user.email);
           formData.append("username", user.email);
           formData.append("secret", user.uid);

           getFile(user.photoURL).then((avatar) =>{
               formData.append('avatar', avatar, avatar.name);

               axios.post("https://api.chatengine.io/users/", formData, {headers: {
                   "private-key":"cfbf4a02-8a9b-4a79-bc61-c89e259ddcde"
               }}).then(() =>{
                   setLoading(false)
               }).catch((error) => {
                   console.log(error);
               })
           });
       })

    }, [user, history]);

    if(!user || loading) return "Loading...";

  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                Unichat
            </div>
            <div onClick={handleLogout} className='logout-tab'>
                Logout
            </div>
        </div>

        <ChatEngine 
           height="calc(100vh - 66px)"
           projectID="b1e593cf-5db6-4e24-a769-cd27625ca7aa"
           userName={user.email}
           userSecret={user.uid}
        />
    </div>
  )
}

export default Chats