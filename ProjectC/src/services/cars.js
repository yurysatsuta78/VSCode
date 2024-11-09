import axios from "axios"

export const getCarsAmount = async () => {
    try{
        var responce = await axios.get('https://localhost:7208/Cars/countactive');
        return responce.data;
    } catch (e){
        console.log(e);
    }
}

export const getFiltredCars = async(filters, skip, take) => {
    try{
        const filtersToServer = Object.fromEntries(
            Object.entries(filters).map(([key, value]) => [key, value === '' ? null : value])
        );
        filtersToServer.skip = skip;
        filtersToServer.take = take;
        var responce = await axios.post('https://localhost:7208/Cars/filtred', filtersToServer);
        return responce.data;
    } catch (e){
        console.log(e);
        return [];
    }
}