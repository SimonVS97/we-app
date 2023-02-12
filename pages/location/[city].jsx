import React from 'react';
import cities from '../../lib/cities.json';
import Image from 'next/image';
import Link from "next/link";
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import SearchBar from '../../components/SearchBar/SearchBar';

// weather data can change
// that's why getServerSideProps, so the page is pre-rendered with every request
// dynamic route, params contains id of city
// passes Id to props
export async function getServerSideProps(context) {
  const cityData = getCity(context.params.city);
  // redirect to 404 page in case there is no cityData
  if (!cityData) {
    return {
      notFound: true
    }
  }
  // use API key to make a fetch request to weather API
  let key = 'cb54f5c4b9ed3a79afce0db092e6d0ea';
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&appid=${key}&units=metric`
  );
  const weatherData = await res.json();
  // redirect to 404 pasge in case there is no weather data
  if (!weatherData) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      cityData: cityData,
      weatherData: weatherData
    }
  }
}

// function to get the entire data of the city
const getCity = id => {
  let city = cities.find((city) => city.id.toString() === id);
  return city;
}

export default function City(props) {
  // get the current date and time
  const date = new Date();
  let day = date.getDate();
  if (Number(day) < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (Number(month) < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  let hours = date.getHours();
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  // conversion form m/s to km/h
  let windSpeed = props.weatherData.wind.speed * 3.6;
  // round to one decimal place
  windSpeed = Number(windSpeed.toFixed(1));

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let wDay = weekday[date.getDay()];


  return (
    <div >
      <SearchBar></SearchBar>
      <Grid container>
        <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Grid container style={{ border: "solid", borderRadius: "10px", borderColor: blue[900] }}>
            <Grid item xs={12} sm={8} md={6}>
              <Typography variant='h4' style={{ color: blue[900] }}>{props.cityData.name}, ({props.cityData.country})</Typography>
              <Typography variant='h6'>{wDay}, the {day}.{month}.{year} at {hours}:{minutes}</Typography>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <Typography>Daily high: {Math.round(props.weatherData.main.temp_min)} °C</Typography>
                  <Typography>Temperatur felt: {Math.round(props.weatherData.main.feels_like)} °C</Typography>
                  <Typography>Humidity:  {props.weatherData.main.humidity} %</Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography>Daily low: {Math.round(props.weatherData.main.temp_max)} °C</Typography>
                  <Typography>Windspeed: {windSpeed} km/h</Typography>
                  {props.weatherData.wind.gust ? <Typography>Gust: {props.weatherData.wind.gust} meter/sec</Typography> : <span></span>}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={1}></Grid>
            <Grid item xs={4} sm={3} md={4} flexDirection="column" display="flex" justifyContent="center" alignItems="center">
              <Image src={`http://openweathermap.org/img/wn/` + props.weatherData.weather[0].icon + '@2x.png'}
                alt="Weather Icon" width={100} height={100}
              ></Image>
              <Typography>{props.weatherData.weather[0].description}</Typography>
            </Grid>
            <Grid item xs={4} md={1}></Grid>
          </Grid>
        </Grid>
        <Grid item md={1} lg={2}></Grid>
      </Grid>

    </div >
  )
}