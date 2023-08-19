import { Route, Routes } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from "react"
import axios from 'axios';
import Home from './Container/Home'
import Country from "./Container/Country"

const AppRoute = () => {
    const endpointValue = useSelector((state) => state.value.endpoint);

    const [data, setData] = useState(null)
    const [endpoint, setEndpoint] = useState('all')
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(endpointValue!=="") setEndpoint(endpointValue)
    }, [endpointValue])


    useEffect(()=> {

        async function fetchAllData() {
            try {
              const response = await axios.get(`https://restcountries.com/v3.1/${endpoint}`);
              setData(response.data);
            } catch (error) {
              setData(null);
              console.log('Error fetching data:', error);
            }
        }
        
        fetchAllData();

    }, [endpoint])

    const getCountry = useCallback((countryParam) => {
        setCountry(countryParam)
    }, [])



    if(!data) {
        <Routes>
            <Route path="/" element={ <Home data={ data } /> } />
        </Routes>
    }

    return (
        <Routes>
            <Route path="/" element={ <Home data={ data } getCountry={getCountry} /> } />
            <Route path="/country/" element={ <Country country={country} /> }></Route>
        </Routes>
    )
}

export default AppRoute