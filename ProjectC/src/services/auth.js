import axios from "axios"

export const login = async (loginData) => {
    try{
        const responce = await axios.post('https://localhost:7208/Authorization/login', loginData, {
            withCredentials: true
        });

        if (responce.status !== 200) {
            throw new Error('Login failed');
        } else {
            console.log('Login successful');
            return responce.data;
        }
    } catch (e){
        console.error("Login error:", e);
        throw e;
    }
}

export const logout = async () => {
    try{
        const responce = await axios.post('https://localhost:7208/Authorization/logout', {}, {
            withCredentials: true
        });
        if(responce.status === 200) {
            console.log("Logged out");
        };
    } catch (e){
        console.error("Login error:", e);
        throw e;
    }
}

export const register = async (registerData) => {
    try{
        const responce = await axios.post('https://localhost:7208/Authorization/register', registerData);

        if (responce.status !== 200) {
            throw new Error('Registration failed');
        } else {
            console.log('Registration successful');
        }
    } catch (e){
        console.error("Registration error:", e);
        throw e;
    }
}

export const checkToken = async () => {
    try{
        const responce = await axios.post('https://localhost:7208/Authorization/checktoken', {}, {
            withCredentials: true
        });

        if (responce.status === 200) {
            return responce.data;
        };
    } catch (e){
        console.error("Registration error:", e);
        throw e;
    }
}