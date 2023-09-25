import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/hero.css";

const Hero = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");

  const api_key ="f0586b31775dcd9656c0654c5e1a93ce";
  const imageUrl=`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`
  const weather =data?.weather[0]?.main
  const desc=data?.weather[0]?.description;
  



  const handleOnchange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    handleOnClick(search);
  };
  const handleOnClick = async (cityname) => {
    if (!cityname) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api_key}`;

    const response = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    console.log(response);
    setData(response);
  };


  useEffect(() => {
    handleOnClick("pune");
 
  }, []);
  return (
    <>
      <div className="container">
        <div className="ver-con">
          <div className="search-con">
            <input
              type="text"
              className="input-serch"
              placeholder="Enter the city name"
              value={search}
              onChange={handleOnchange}
            />
            <button className="searchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="hor-con">
            <div className="left-div">
              <h1>{data?.name}</h1>
              <h1 className="temp">
                {(data?.main?.temp - 273.15).toFixed(2)}&deg;C
              </h1>
              <div className="img-cn">
                <img className="image" src={imageUrl} ></img> 
                <p className="desc">{weather} : {desc}</p>
               
              </div>
              <div className="line"></div>
              <p className="wind">Wind : {data?.wind?.speed} mhp</p>
              <p className="humidity">Humidity : {data?.main?.humidity} %</p>
              <p className="humidity">Pressure : {data?.main?.pressure} hPa</p>
            </div>
            <div className="right-div">
              <img className="big-img" src={imageUrl} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
