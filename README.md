# Weather App

This is a Node.js weather application that allows users to sign up, log in, and access weather information for their current location, search for cities, save cities, and receive daily weather updates via email.

## Features

- User authentication: Sign up and log in functionality.
- Current location weather: Automatically fetches and displays the current weather for the user's location.
- Weather forecast: Provides the weather forecast for the user's current location.
- City search: Allows users to search for weather information in specific cities.
- Save cities: Users can save their favorite cities and check their weather.
- Daily weather email: Sends users a daily weather update for their saved cities every day at 12 PM.

## Technologies Used

- Node.js
- Express.js
- MongoDB (for user data storage)
- OpenWeatherMap API (for weather data)
- NodeMailer (for sending emails)

## Setup

1. **Clone the repository:**


2. **Install dependencies:**
```
npm install
```

3. **Set up environment variables:**

- Create a `.env` file in the root directory with the following variables:

- DB_URL (provide mongodb url)
- WEATHER_API_KEY (provide weather api key)
- USER_PASS (provide email app password)

4. ### Run Project
```
npm start
```