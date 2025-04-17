import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data);
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="appContainer">
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchBar"
      />
      <div className="countryGrid">
        {filteredCountries.map((country, index) => (
          <div className="countryCard" key={index}>
            <img src={country.png} alt={`Flag of ${country.common}`} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
