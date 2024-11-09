import axios from "axios"

export const getModels = async () => {
    try{
        var responce = await axios.get('https://localhost:7208/Models/all');
        return responce.data;
    } catch (e){
        console.log(e);
        return [];
    }
}