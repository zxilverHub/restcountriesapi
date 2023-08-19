import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { getEndPoint, isCountryLinkClick } from '../Features/CountryInfo'
import larrow from "../assets/arrow-left-solid -dm.svg"
import darrow from "../assets/arrow-left-solid-lm.svg"
import "./menu.css"

function Menu() {
  const theme = useSelector((state) => state.value.lightTheme);
  const isInCountry = useSelector((state) => state.value.isCountry);
  const dispatch = useDispatch();

  const [isFilterClick, setFilterClick] = useState(false);
  const [endpointValue, setEndpointValue] = useState("");
  const [filterTitle, setFilterTitle] = useState("Filter by Region");

  const dispatchEndpoint =(e, value, fil)=>{
    e.preventDefault();
    const val = (fil?"region/":"name/") + value;
    dispatch(getEndPoint(val));
    setFilterClick(false);
    setEndpointValue("");
  }

  const regions = [ "Africa", "America", "Asia", "Europe", "Oceania" ];

  const activeFilter = {
    height: isFilterClick? "165px" : "0%",
    padding: isFilterClick? "1rem" : "0",
  }

  const activeArrow = {
    transform: isFilterClick? "rotate(-180deg)" : "rotate(0deg)",
    transition: "all .5s ease"
  }

  return (
    <>
      <div className={ `menu ${(theme? "": "dark")}` }>
        { isInCountry ?
        <>
          <form onSubmit={(e)=>dispatchEndpoint(e, endpointValue, false)}>
            <input type="text" value={endpointValue} onChange={(e)=>setEndpointValue(e.target.value)} 
              placeholder="Search for a coutry..." 
              className='search-input'
            />
          </form>
            
          <div className={`filter-region ${ theme? "": "dark" }`}>
            <p onClick={()=>setFilterClick(!isFilterClick)}>{ filterTitle }
              <span>
                <svg style={activeArrow} className='filter-arrow' xmlns="http://www.w3.org/2000/svg" width="18" height="10"><path fill="none" stroke={(theme? "#111517": "#ffffff")} strokeWidth="1.5" d="M1 1l8 6 7-7"/></svg>
              </span> 
              </p>
            <div className="regions" style={activeFilter} >
              { regions.map((region, i) => (
                <p key={i} onClick={(e)=>{dispatchEndpoint(e, region, true); setFilterTitle(region)}}>{region}</p>
              )) }
            </div>
          </div>
        </>:
          <Link to="/" onClick={()=>dispatch(isCountryLinkClick(true))} >
            <img src={ !theme? larrow: darrow } alt="back arrow" className='back-arrow' />
            Back
          </Link>
      }
      </div>

    </>
  )
}

export default Menu
