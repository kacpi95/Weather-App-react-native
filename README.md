# Weather App (React Native)

**Weather App** is a mobile application built with **React Native** that allows users to check current weather conditions based on their location or any selected city.  
The app retrieves real-time weather data from an external API and presents it in a clean, intuitive interface with custom weather icons.

> ⚠️ **Login screen note**  
> The login screen is a **demo / mock screen** used only to demonstrate navigation flow within the application.  
> No real authentication or backend authorization is implemented.

---

## Features

- Current weather based on device geolocation
- Search weather data for any city (with debounced input)
- Weather details:
  - Temperature
  - Humidity
  - Wind speed
  - Weather description
- Daily and hourly weather forecast
- Air quality information (Air Quality)
- Sunrise and sunset times
- Offline mode using locally cached data (AsyncStorage)
- Light / Dark mode (Context API)
- Proper handling of loading and error states
- Local mapping of weather conditions to custom icons
- Clean, responsive, and user-friendly UI

---

## Screenshots

| Login (Demo)                          | Home                                     | Dark Mode                                   |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| ![Login](screenshots/screenLogin.jpg) | ![Dashboard](screenshots/screenHome.jpg) | ![DarkMode](screenshots/screenDarkMode.jpg) |

| Settings                                    | About                                 |
| ------------------------------------------- | ------------------------------------- |
| ![Settings](screenshots/screenSettings.jpg) | ![About](screenshots/screenAbout.jpg) |

---

## Tech Stack

- React Native
- Expo
- React Navigation
- Context API
- Custom Hooks
- AsyncStorage
- Lodash (debounce)
- Weather API (WeatherAPI.com)
- Expo Notifications

---

## Project Structure

```bash
api/
assets/
src/
  components/
  hooks/
  navigation/
  screens/
  services/
  utils/
App.jsx
README.md
package.json
```

### Key elements:

- **HomeScreen** – main screen displaying weather data
- **useWeather** – custom hook responsible for fetching, caching, and managing weather data
- **CurrentWeather** – displays current weather with mapped icons
- **SettingsScreen & AboutScreen** – additional application screens
- **Navigation** – handles app navigation
- **notifications service** – manages Expo Notifications logic

---

## Installation

### 1. Clone repository

```bash
git clone https://github.com/kacpi95/Weather-App-react-native.git
cd weather-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create environment file:

```bash
touch .env
```

### 4. Add your API key:

```bash
WEATHER_API_KEY=your_api_key_here
```

### 5. Run the app:

```bash
npx expo start
```

## Notes

- Location permission is required for geolocation-based weather.
- Push notifications require a development build (Expo SDK 53 limitation in Expo Go).
- Push notifications are implemented using Expo Notifications and require a development build to be fully tested on Android.
- Free Weather API plans may limit forecast length (e.g. 3-day forecast).

## Possible Future Improvements

- Full authentication flow
- Temperature unit switching (°C / °F)
- Weather alerts and warnings
- UI animations
- Extended forecast support (paid API plan)
- Improved offline-first experience

## What I Learned

While building this project, I gained practical experience with:

- Designing a **scalable component structure** and separating UI, logic, and services
- Creating and using **custom React hooks** (`useWeather`) to manage complex async logic
- Handling **asynchronous API calls**, loading states, and error scenarios
- Implementing **offline support** using AsyncStorage and cached data
- Working with **device features** such as geolocation and notifications in Expo
- Managing **global state** with Context API (Dark / Light mode)
- Improving UX with **debounced user input** (Lodash)
- Mapping external API data to **custom UI representations** (weather icons)
- Understanding **platform limitations** (Expo Go vs development builds)

This project helped me better understand how to structure a real-world React Native application and how to handle edge cases related to network availability and device permissions.

---
