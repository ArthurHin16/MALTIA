import axios from 'axios';
import React, {useContext, useState} from 'react';

const AuthContext = React.createContext();

export function AuthProvider(props) {
    const [ user, setUser ] = useState(window.localStorage.getItem('token') || null);

    function login({ correo, password }) {
        console.log('********SOY YO!!***:',correo, password)
        axios({
            url: 'http://localhost:5000/employees/login',
            method: 'post',
            data:{
                correo,
                password,
            },
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            console.log('*********RESULT DE API', result)
            window.localStorage.setItem('token',result.token)
            setUser(result)
        })
        .catch(() => {
            console.error('Credenciales invalidas')
        })
    }

    function logout(){
        setUser(null);
        window.localStorage.removeItem('token');
    }

    function register(userData){
        axios({
            url: 'http://localhost:5000/employees/login',
            method: 'post',
            body: userData,
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((result) => {
            console.log('*********RESULT DE API REGISTER', result)
            window.localStorage.setItem('token',result.token)
            setUser(result)
        })
        .catch(() => {
            console.error('Credenciales invalidas')
        })
    }

    function getToken(){
        return window.localStorage.getItem('token')
    }

    const value = {
        user,
        getToken,
        login,
        logout,
        register,
    };

    return <AuthContext.Provider value = {value} {...props} />
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth solo puede ser provado dentro de AuthProvider');
    }
    return context;
}



export default AuthContext;
