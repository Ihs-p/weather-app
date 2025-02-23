import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async (city) => {
    if (city == "") {
      return alert("enter city name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok || data.cod == "404") {
        return alert(data.message)  
      }
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        location: data.name,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("error on while fetching weather details");
    }
  };

  useEffect(() => {
    search("kerala");
  }, []);

  return (
    <div className="flex flex-col items-center place-self-center p-10 rounded-[10px] bg-gradient-to-br from-[#2f4680] to-[#500ae4]">
      <div className="flex items-center gap-3">
        <input
          className="h-12 border-none outline-none rounded-[40px] pl-6 text-[#626262] bg-[#ebfffc] text-lg"
          ref={inputRef}
          type="text"
          placeholder="enter city name"
        />
        <img
          className="w-[50px] p-4 rounded-[50%] bg-[#ebfffc] cursor-pointer"
          src={searchIcon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt=""
            className="w-[150px] mt-[30px] mb-[0px]"
          />
          <p className="text-white text-[80px] ">
            {weatherData.temperature}° c
          </p>
          <p className="text-white text-[40px]">{weatherData.location}</p>
          <div className="w-full text-white mt-[40px] flex justify-between ">
            <div className="flex items-start gap-3 text-[22px] ">
              <img className="w-6 mt-3" src={humidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="block text-base ">Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[22px] ">
              <img className="w-6 mt-3" src={windIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span className="block text-base ">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
