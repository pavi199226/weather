import Axios from "axios";
import React from "react";
import { useState } from "react";
import "./App.css";
var arr = [];
var date = new Date();
function App() {
  const [state, setState] = useState({
    name: "",
    pressure: "1001 ",
    description: "Heavy intensity rain",
    windSpeed: "11.17 ",
    temp: "13",
    humidity: "77%",
    id: "",
    icon: "10d",
    img: { 9: "09d", 12: "10d", 15: "09d", 18: "10d", 21: "09d" },
  });

  const handleChange = (event) => {
    let name = event.target.value;

    setState((prevState) => {
      return { ...prevState, name: name };
    });
    var url = "http://api.openweathermap.org/data/2.5/weather?q=".concat(
      state.name,
      "&APPID=f47ab680ca6824accbd4cfd34b357718"
    );
    Axios.get(url)
      .then((res) => {
        setState((prevState) => {
          return {
            ...prevState,
            name: name,
            description: res.data.weather[0].description,
            pressure: res.data.main.pressure,
            humidity: res.data.main.humidity,
            temp: Math.floor(res.data.main.temp - 273),
            windSpeed: res.data.wind.speed,
            id: res.data.id,
            icon: res.data.weather[0].icon,
          };
        });
        const url1 = "http://api.openweathermap.org/data/2.5/forecast?id=".concat(
          state.id,
          "&APPID=f47ab680ca6824accbd4cfd34b357718"
        );
        Axios.get(url1)
          .then((res) => {
            var item = res.data.list;
            for (let i = 0; i < 5; i++) {
              console.log(item[i].weather[0].icon);
              arr.push(item[i].weather[0].icon);
              setState((prevState) => {
                return {
                  ...prevState,
                  img: {
                    ...prevState.img,
                    9: arr[0],
                    12: arr[1],
                    15: arr[2],
                    18: arr[3],
                    21: arr[4],
                  },
                };
              });
            }
            console.log(arr);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="card">
        <div className="search">
          <h1 className="city"></h1>
          <input
            type="text"
            value={state.name}
            placeholder="Enter city"
            onChange={handleChange}
          />

          <div className="search-results">
            <ul>
              <li>Paris</li>
              <li>Manila</li>
              <li>Beaverlodge</li>
            </ul>
          </div>
        </div>

        <p className="description">{state.description}</p>
        <p className="date">{String(date).substr(0, 14)}</p>
        <div className="numbers">
          <div className="temp">
            <span>{state.temp}</span>
            <sup className="unit">°C</sup>
          </div>

          <div className="icon">
            {}
            <img
              id="img0"
              src={"http://openweathermap.org/img/wn/".concat(
                state.icon,
                "@2x.png"
              )}
              alt=""
            />
          </div>

          <div>
            <table className="measurements">
              <tr>
                <td className="label">Pressure</td>
                <td className="value">{state.pressure}hPa</td>
              </tr>
              <tr>
                <td className="label">Humidity</td>
                <td className="value">{state.humidity}</td>
              </tr>
              <tr>
                <td className="label">Wind speed</td>
                <td className="value">{state.windSpeed}meters / sec</td>
              </tr>
            </table>
          </div>
        </div>

        <hr />

        <div className="hourly">
          <div>
            <img
              id="img1"
              src={`http://openweathermap.org/img/wn/${state.img[9]}@2x.png`}
              alt=""
            />
            <span className="hours">9 AM</span>
          </div>

          <div>
            <img
              id="img2"
              src={`http://openweathermap.org/img/wn/${state.img[12]}@2x.png`}
              alt=""
            />
            <span className="hours">12 AM</span>
          </div>

          <div>
            <img
              id="img3"
              src={`http://openweathermap.org/img/wn/${state.img[15]}@2x.png`}
              alt=""
            />
            <span className="hours">15 PM</span>
          </div>

          <div>
            <img
              id="img4"
              src={`http://openweathermap.org/img/wn/${state.img[18]}@2x.png`}
              alt=""
            />
            <span className="hours">18 PM</span>
          </div>

          <div>
            <img
              id="img5"
              src={`http://openweathermap.org/img/wn/${state.img[21]}@2x.png`}
              alt=""
            />
            <span className="hours">21 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
