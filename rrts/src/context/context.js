import { useContext, createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    // const signUp = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const signIn = async () => {
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('User', currentUser)
        })
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            {/* <AuthContext.Provider value={{ googleSignIn, logOut, signIn, signUp, user }}> */}
            <AuthContext.Provider value={{ createUser, signIn, googleSignIn, logOut, user }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}