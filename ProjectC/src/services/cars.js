import axios from "axios"

export const getCarsAmount = async () => {
    try{
        var responce = await axios.get('https://localhost:7208/Cars/countactive');
        return responce.data;
    } catch (e){
        console.log(e);
    }
}

export const getFiltredCars = async(filters) => {
    try{
        const filtersToServer = Object.fromEntries(
            Object.entries(filters).map(([key, value]) => [key, value === '' ? null : value])
        );
        var responce = await axios.post('https://localhost:7208/Cars/filtred', filtersToServer);
        return responce.data;
    } catch (e){
        console.log(e);
        return [];
    }
}