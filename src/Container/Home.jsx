import { Link } from "react-router-dom"
import "./home.css"
import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { isCountryLinkClick } from "../Features/CountryInfo";

function Home({ data, getCountry }) {
  const theme = useSelector((state) => state.value.lightTheme)
  const dispatch = useDispatch();
  const homeDiv = useRef();
  const overlay = useRef();

  const handleOverlay = () => {
    const scrollPosition = homeDiv.current.scrollTop;
    const maxScroll = homeDiv.current.clientHeight;
    const height = homeDiv.current.scrollHeight;

    if(height <400)
      overlay.current.classList.add("fade")
      

    if(scrollPosition >= (height - maxScroll) - 200 )
      overlay.current.classList.add("fade")
    else
      overlay.current.classList.remove("fade")
  };

  const handleClickCountry =(cccc) => {
    getCountry(cccc)
    dispatch(isCountryLinkClick(false));
  }

  if(!data) {
    return (
      <div ref={homeDiv} className="home" onScroll={handleOverlay}>
        <h2>No data</h2>
      </div>
    )
  }

  console.log(data)
  return (
    <div ref={homeDiv} className={`home ${theme? "":"dark"} `} onScroll={handleOverlay}>

      { data.map((country, i) => (
        <div className="country-card" key={i} onClick={()=>handleClickCountry(country) }>
          <Link to="/country/" >
            <div className="flag">
              <img src={ country?.flags?.png } alt={country?.flags?.alt} />
            </div>
            <div className="country-initial-info">
              <h2 className="title">{ country?.name?.common }</h2>
              <p className="key"> Population: <span className="value">{ country?.population }</span> </p>
              <p className="key"> Region: <span className="value">{ country?.region }</span> </p>
              <p className="key"> Capital: <span className="value">{ country?.capital }</span> </p>
            </div>
          </Link>
        </div>
      )) }

      <div ref={overlay} className="scroll-over-lay"></div>
    </div>
  )
}

export default Home