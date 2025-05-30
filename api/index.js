import { WEATHER_API_KEY } from '@env';
export const apiKey = WEATHER_API_KEY;
export const weatherApi = 'https://api.weatherapi.com/v1';

export const weatherImages = {
  zachmurzenie: require('../assets/images/cloudy.png'),
  pochmurno: require('../assets/images/cloudy.png'),
  zamglenie: require('../assets/images/fog.png'),
  'częściowe zachmurzenie': require('../assets/images/cloudy.png'),
  'miejscowe opady deszczu w pobliżu': require('../assets/images/light-rain.png'),
  słonecznie: require('../assets/images/sun.png'),
  bezchmurnie: require('../assets/images/sun.png'),
  'miejscowe wystąpienie lekkiej mżawki': require('../assets/images/light-rain.png'),
  'gwałtowne grzmienia w pobliżu': require('../assets/images/thunderstorm.png'),
  'miejscowe, lekkie opady deszczu z grzmieniem w okolicy': require('../assets/images/thunderstorm.png'),
  'miejscowe opady lekkiego deszczu': require('../assets/images/light-rain.png'),
  'lekkie, przelotne opady deszczu': require('../assets/images/light-rain.png'),
  'lekka mżawka': require('../assets/images/light-rain.png'),
  'średnie opady deszczu': require('../assets/images/rain.png'),
  mgła: require('../assets/images/fog.png'),
  other: require('../assets/images/light-rain.png'),
};
