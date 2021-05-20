import React, {useState, createContext, useEffect} from 'react';
import {auth, generateUserDocument} from '../firebase';

export const UserContext = createContext<any>({user: null});


const UserProvider = (props: any) => {
    const [user, setUser] = useState<any>({user: null})

    useEffect (() => {
        auth.onAuthStateChanged(async (userAuth: any) => {
            const user = await generateUserDocument(userAuth,{});
            setUser({user});
        })
    },[])

    return (
    <UserContext.Provider value={user}>
        {props.children}
    </UserContext.Provider>
    );
} 

export default UserProvider