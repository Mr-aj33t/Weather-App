# Weather App

![Weather App Screenshot](https://via.placeholder.com/1200x600?text=Weather+App+Screenshot)
*(You can replace the placeholder image link above with a real screenshot of your app)*

A sleek and intuitive Weather App built with **React** and **Vite**, providing real-time weather information for any city around the world.

---

## ✨ Features

* **Current Weather:** Displays real-time temperature, weather conditions (e.g., sunny, cloudy, rainy), and an appropriate icon.
* **City Search:** Easily search for weather information by city name.
* **Time & Date:** Shows local time and date for the searched city.
* **Detailed Metrics:** Includes humidity, wind speed, pressure, UV index, sunrise/sunset times, and air quality.
* **Responsive Design:** Optimized for both desktop and mobile devices.

---

## 🛠️ Technologies Used

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool that provides a lightning-fast development experience for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **OpenWeatherMap API (or your chosen Weather API):** For fetching real-time weather data. *(Update this if you used a different API)*

---

## 🚀 Live Demo

Check out the live version of the app here:
[https://weather-app-five-phi-17.vercel.app/](https://weather-app-five-phi-17.vercel.app/)

---

## ⚙️ Local Development

Follow these steps to get a local copy up and running on your machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mr-aj33t/Weather-App.git](https://github.com/Mr-aj33t/Weather-App.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Weather-App
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```
4.  **Set up Environment Variables:**
    This app requires an API key to fetch weather data.
    * Create a `.env` file in the root of the project directory.
    * Get an API key from [OpenWeatherMap](https://openweathermap.org/api) (or your chosen weather API provider).
    * Add your API key to the `.env` file like this:
        ```
        VITE_OPENWEATHER_API_KEY=your_api_key_here
        ```
        *(Replace `VITE_OPENWEATHER_API_KEY` with the actual name you used in your code, and `your_api_key_here` with your real API key.)*

### Running the App

```bash
npm run dev
# or yarn dev
# or pnpm dev
