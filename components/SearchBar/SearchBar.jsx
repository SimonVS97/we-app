// import json file that contains the location data of many cities
import cities from '../../lib/cities.json';
import React from "react";
import Link from "next/link";
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router'

export default function SearchBar() {
  // query variable contains string typed in by the user
  const [query, setQuery] = React.useState("");
  // results variable contains first 5 cities that match query
  const [results, setResults] = React.useState([]);

  // function to handle search bar input
  const handleChange = (event) => {
    // set the query, so it matches the string typed by the user
    const value = event.target.value;
    if (value.length <= 0) {
      setResults([]);
    }
    setQuery(value);
    // filter out matching cities
    let matchingCities;
    if (value.length > 0) {
      matchingCities = cities.filter((city => {
        return city.name.toLowerCase().includes(value.toLowerCase());
      }));
      // pass first 5 cities that match query to setResults
      setResults(matchingCities.slice(0, 5));
    }
  }
  // reset results after route change
  // the current route is used as the dependency of the useEffect hook
  const dynamicRoute = useRouter().asPath;
  React.useEffect(() => setResults([]), [dynamicRoute]);

  return (
    <Box>
      <Grid container >
        <Grid item xs={0} sm={0} md={1} lg={2} ></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8} display="flex" justifyContent="center" alignItems="center" >
          <TextField placeholder="Please type in your city" type="text"
            value={query} onChange={handleChange} style={{ width: "100%" }} className="SearchBar"
            data-testid="txtField"
          ></TextField>
        </Grid>
        <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
        <Grid item xs={0} sm={0} md={1} lg={2}></Grid>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          {results.length > 0 ?
            <List display="flex" style={{ border: "solid", borderColor: blue[500], borderRadius: "10px" }}>
              {results.map((result, index) => {
                return <ListItem key={index} style={{ textAlign: "center", display: "inline-block" }} >
                  <Link href={`/location/${result.id}`} style={{ textDecoration: "none", color: "black" }} >
                    {result.name},
                    {<span> ({result.country})</span>}
                  </Link>
                  <Divider></Divider>
                </ListItem>
              })}
            </List>
            :
            <div></div>
          }
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  )
}