import axios from "axios"

export const getBrands = async () => {
    try{
        var responce = await axios.get('https://localhost:7208/Brands/all');
        return responce.data;
    } catch (e){
        console.log(e);
        return [];
    }
}