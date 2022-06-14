import React,{useRef,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext';

const Chats = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)

    if(user)console.log(user)

    const handleLogout = async() => {
        await auth.signOut()
        navigate('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpeg', {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user){
        navigate('/')
        return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHATENGINE_PROJECT_ID,
                "user-name": user.email,
                "user-secret": user.uid,

            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar, avatar.name)
                    console.log(formdata)
                axios.post('https://api/chatengine.io/users',
                    formdata,
                    {
                        headers: {"private-key": process.env.REACT_APP_CHATENGINE_KEY}
                    }
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    },[user,navigate])


  return (
    <div className='chat-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                Chat-City
            </div>
            <div className='logout-tab'
            onClick={handleLogout}
            >
                Logout
            </div>
        </div>
        <ChatEngine 
            height='calc(100vh - 66px)'
            projectID='9b75e0c4-470a-443c-9c47-7f13e506f1a3'
            userName={user.email}
            userSecret={user.uid}
        />
    </div>
  )
}

export default Chats;