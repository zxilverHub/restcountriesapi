import { useSelector } from "react-redux";
import "./country.css"

function Country({ country }) {
  const theme = useSelector((state) => state.value.lightTheme)
  const native = Object.keys(country?.name?.nativeName)
  const currency = Object.keys(country?.currencies);
  const language = Object.keys(country?.languages);
  const borders = country?.borders? country.borders : null
  console.log(borders)

  return (
    <div className={`coutry-page ${ theme? "": "dark" }`}>
      <div className="this-country-flag">
        <img src={ country?.flags?.png } alt={ country?.flags?.alt } />
      </div>
      <div className="this-country-info">
        <h3 className="title">{country?.name?.common}</h3>
        <div className="more-country-info">
          <div className="common">
            <p className="key">Native Name: <span className="value">{ country?.name?.nativeName[native[0]].common }</span></p>
            <p className="key">Population: <span className="value">{ country?.population }</span></p>
            <p className="key">Population: <span className="value">{ country?.population }</span></p>
            <p className="key">Sub Region: <span className="value">{ country?.subregion }</span></p>
            <p className="key">Capital: <span className="value">{ country?.capital }</span></p>
          </div>
          <div className="uncommon">
            <p className="key">Top Level Domain: <span className="value">{ country?.tld[0] }</span></p>
            <p className="key">Currencies: <span className="value">{ country?.currencies[currency].name }</span></p>
            <p className="key">Languages: 
              { language.map(( lang, i ) => (
                <span className="value" key={i}> { country?.languages[lang] } { i<language.length-1? ", ": ""  } </span>
              )) }
            </p>
          </div>
        </div>
        { borders &&
          <div className="border">
            <p className="key">Boder Countries:
            { country?.borders.map(( border, i ) => (
              <span className="value" key={i}> { border } </span>
            )) }
            </p>
          </div>
        }

      </div>
    </div>
  )
}

export default Country