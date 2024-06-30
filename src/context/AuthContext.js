import { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalMsg, setGlobalMsg] = useState('');

    const register = (email, password) => {
        return createUserWithEmailAndPassword(authApp, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(authApp, email, password);
    };

    const logout = () => {
        return signOut(authApp);
    };

    const bidAuction = (auctionId, price) => {
        if (!currentUser) {
            return setGlobalMsg('Por favor inicia sesion primero');
        }

        let newPrice = Math.floor((price / 100) * 110);
        const db = firestoreApp.collection('auctions')

        return db.doc(auctionId).update({
            curPrice: newPrice,
            curWinner: currentUser.email,
        });
    };

    const endAuction = (auctionId) => {
        const db = firestoreApp.collection('auctions');

        return db.doc(auctionId).delete();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authApp, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, register, login, logout, bidAuction, endAuction, globalMsg}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
