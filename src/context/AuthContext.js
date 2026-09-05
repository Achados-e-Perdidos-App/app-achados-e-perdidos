import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../service/firebaseConnection';

const AuthContext = createContext(null);

// Mensagens de erro do Firebase traduzidas para algo legível
function translateAuthError(code) {
    switch (code) {
        case 'auth/invalid-email':
            return 'Email inválido.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'Email ou senha incorretos.';
        case 'auth/email-already-in-use':
            return 'Esse email já está cadastrado.';
        case 'auth/weak-password':
            return 'A senha precisa ter pelo menos 6 caracteres.';
        default:
            return 'Ocorreu um erro. Tente novamente.';
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            if (initializing) setInitializing(false);
        });
        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: translateAuthError(error.code) };
        }
    };

    const signUp = async (name, email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (name) {
                await updateProfile(result.user, { displayName: name });
            }
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: translateAuthError(error.code) };
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, initializing, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
    }
    return context;
}