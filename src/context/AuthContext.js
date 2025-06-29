import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, signInWithPopup, } from "firebase/auth";
import { auth, provider } from "../services/firebase";
export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName ?? null,
                });
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            setUser({
                name: firebaseUser.displayName ?? null,
            });
        }
        catch (error) {
            console.error("Erro ao fazer login com Google:", error);
        }
    };
    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, signInWithGoogle, signOut }, children: !loading && children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
