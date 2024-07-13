"use client";

import axios from "axios";
import { useReducer, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const initialState = {
    user: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isHydrated, setIsHydrated] = useState(false); 

    useEffect(() => {
        const checkAuthority = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/users/check', {
                    withCredentials: true
                });
                if (data && data.data) {
                    dispatch({ type: 'LOGIN', payload: data.data });
                }
            } catch (error) {
                console.log('User is not logged in');
            } finally {
                setIsHydrated(true);
            }
        };
        checkAuthority();
    }, []);

    // Save user to localStorage
    useEffect(() => {
        if (state.user) {
            localStorage.setItem('user', JSON.stringify(state.user));
        } else {
            localStorage.removeItem('user');
        }
    }, [state.user]);

    if (!isHydrated) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
