export const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0f0dcde1266303248b8857e87c5de26&lang=ru&units=metric`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}