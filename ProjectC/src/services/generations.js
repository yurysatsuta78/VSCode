import axios from "axios"

export const getGenerations = async () => {
    try{
        var responce = await axios.get('https://localhost:7208/Generations/all');
        return responce.data;
    } catch (e){
        console.log(e);
        return [];
    }
}