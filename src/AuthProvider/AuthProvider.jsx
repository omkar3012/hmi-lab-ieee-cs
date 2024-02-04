import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

export const AuthProdiver = ({ children }) => {
    const axios = useAxiosPublic();
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const response = await axios.post("/login-user", { email, password });
        setUser(response.data);
        return response;
    };
    const signUp = async (name, email, password) => {
        const response = await axios.post("/add-user", {
            name,
            email,
            password,
        });
        setUser(response.data);
        return response;
    };
    const logout = async()=>{
        setUser(null);
    }
    useEffect(()=>{
      const unSubscribe = ()=>{
        console.log('s');
      }
      return ()=>unSubscribe()
    },[user])
    const userInfo = {
        login,
        signUp,
        user,
        setUser,
        logout
    };

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};
