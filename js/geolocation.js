import { getWeatherData } from "./api.js";
import { resetWeatherContent } from "./helper.js";

export const handleWeatherByGeolocation = async () => {
    const options = {
        enableHighAccuracy: true,       /* для более точного определения местоположения */
        timeout: 5000,      /* устанавливает временной интервал обновления геолокаци */
        maximumAge: 0       /* устанавливает время, по истечению которого кэшированную геолокацию следует обновить */
    }

    const success = async (pos) => {
        const crd = pos.coords;

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=00c7dbe2eca64697bb9c9e11ce403367`);
        const result = await response.json();

        const weather = await getWeatherData(result.features[0].properties.city);
        
        resetWeatherContent(result.features[0].properties.city, weather);
        
    }

    const error = (err) => {
        console.log(err.code + ' ' + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}