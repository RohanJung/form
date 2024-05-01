import React, { useState, useEffect } from "react";
import "./Form.css";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { FaCity } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { BsHouses } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const Form = (props) => {
  const {
    handleChange,
    id,
    name,
    type,
    placeholder,
    icons: Icon,
    value,
    address,
    pattern,
    setAddress,
  } = props;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Nepal");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        // Extract the country names from the response data
        const countryNames = response.data.map(
          (country) => country.name.common
        );

        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const provinces = Array.from({ length: 7 }, (_, i) => i + 1);
    setProvinces(provinces);
  }, []);

  const renderIcon = () => {
    switch (Icon) {
      case "CiUser":
        return <CiUser className="icon" />;
      case "CiMail":
        return <CiMail className="icon" />;
      case "CiPhone":
        return <CiPhone className="icon" />;
      case "SlCalender":
        return <SlCalender className="icon" />;
      case "RxAvatar":
        return <RxAvatar className="icon" />;
      case "FaCity":
        return <FaCity className="icon" />;
      case "BsHouses":
        return <BsHouses className="icon" />;
      case "CiLocationOn":
        return <CiLocationOn className="icon" />;
      default:
        return null;
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setAddress({ ...address, Country: country });
    console.log(address);
    setSelectedCountry(country);
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setAddress({ ...address, Province: province });

    setSelectedProvince(province);
    props.handleChange(e);
  };

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="form">
      {renderIcon()}
      {type === "select" && name === "Country" ? (
        <select
          id={id}
          name={name}
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {!selectedCountry && (
            <option disabled value="">
              Country
            </option>
          )}
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      ) : type === "select" && name === "Province" ? (
        <select
          id={id}
          name={name}
          value={selectedProvince}
          onChange={handleProvinceChange}
        >
          {!selectedProvince && (
            <option disabled value="">
              Province
            </option>
          )}
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleFocus}
          value={value}
          pattern={pattern}
          focused={focused.toString()}
          accept=".png"
        />
      )}
      <span>{props.errorMessage}</span>
    </div>
  );
};

export default Form;
