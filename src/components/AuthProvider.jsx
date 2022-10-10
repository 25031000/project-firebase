import {auth, userExists} from '../firebase/firebase.js';
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';

// imported hook for redirected to a page

import { useNavigate } from 'react-router-dom';



export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}){
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isRegistered = await userExists(user.uid);

                if(isRegistered){
                    //TODO: redirigir a dashboard
                    onUserLoggedIn(user);
                }else{
                    //TODO: redirigir a choose username
                    onUserNotRegistered(user);
                }
            }else{
                onUserNotLoggedIn();
            }
        });
    }, [navigate, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered]);


    return <div>{children}</div>
}