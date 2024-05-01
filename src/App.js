import "./";
import Form from "./component/Form";
import { useState, useEffect } from "react";
import React from "react";
import Table from "./component/Table";
import { Routes, Route } from "react-router-dom";
import Profile from "./component/Profile";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);

  const [data, setData] = useState({
    name: "",
    Email: "",
    Phone: "",
    DOB: "",
    City: "",
    District: "",
    Province: "",
    Country: "Nepal",
    ProfilePic: "",
  });

  const [values, setValues] = useState({
    name: "",
    Email: "",
    Phone: "",
    DOB: "",
  });
  console.log("values", values);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "name",
      errorMessage: "Required",
      required: true,
      pattern: "Rohan",

      icons: "CiUser",
    },
    {
      id: 2,
      name: "Email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Invalid Email address",
      required: true,
      label: "Email",

      icons: "CiMail",
    },
    {
      id: 3,
      name: "Phone",
      type: "Tel",
      placeholder: "Phone",
      label: "Phone",
      required: true,
      pattern: "^[0-9]{7,10}$",
      errorMessage: "Number should be 7 to 10 digits",
      icons: "CiPhone",
    },
    {
      id: 4,
      name: "DOB",
      type: "datetime-local",
      placeholder: "DOB",
      label: "DOB",
      icons: "SlCalender",
      required: true,
    },
  ];

  const [address, setAddress] = useState({
    City: "",
    District: "",
    Province: "",
    Country: "Nepal",
  });
  console.log("Address", address);

  const placeInput = [
    {
      id: 5,
      name: "City",
      type: "text",
      placeholder: "City",
      label: "City",
      icons: "FaCity",
      required: true,
    },
    {
      id: 6,
      name: "District",
      type: "text",
      placeholder: "District",
      label: "District",
      required: true,
      icons: "BsHouses",
    },
    {
      id: 7,
      name: "Province",
      type: "select",
      placeholder: "Province",
      label: "Province",
      required: true,
      icons: "CiLocationOn",
    },
    {
      id: 8,
      name: "Country",
      type: "select",
      placeholder: "Country",
      label: "Country",
      icons: "",
      required: true,
    },
  ];
  const [profile, setProfile] = useState({
    ProfilePic: "",
  });
  console.log("Profile", profile);

  const profileInput = [
    {
      id: 9,
      name: "ProfilePic",
      type: "file",
      placeholder: "ProfilePic",
      label: "ProfilePic",
      icons: "RxAvatar",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAddress = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(address);
  }, [address]);

  const handleProfile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContents = event.target.result;

        setData({ ...data, ProfilePic: fileContents });
      };
      console.log(profileInput);

      reader.readAsDataURL(file);
    }
  };

  const clickedSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    // if (!data.name || !data.Email || !data.Phone || !data.DOB || !data.City || !data.District || !data.Country ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }
    setRecords([...records, data]);
    setData({
      name: "",
      Email: "",
      Phone: "",
      DOB: "",
      City: "",
      District: "",
      Province: "",
      Country: "Nepal",
      profilePic: "",
    });
  };
  records.forEach((record) => {
    const keys = Object.keys(record);
    console.log(keys);
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="formApp">
              <form>
                <h3>Personal Details</h3>
                {inputs.map((input) => (
                  <Form
                    key={input.id}
                    {...input}
                    value={data[input.name]}
                    state={values}
                    setState={setValues}
                    handleChange={handleChange}
                    data={data[input.name]}
                  />
                ))}
              </form>
              <form>
                <h3>Address Details</h3>
                {placeInput.map((placeInput) => (
                  <Form
                    key={placeInput.id}
                    {...placeInput}
                    value={data[placeInput.name]}
                    state={address}
                    setState={setAddress}
                    adress={address}
                    setAddress={setAddress}
                    handleChange={handleAddress}
                    data={data[placeInput.name]}
                  />
                ))}
              </form>
              <form>
                <h3>Profile Picture</h3>
                {profileInput.map((profileInput) => (
                  <Form
                    key={profileInput.id}
                    {...profileInput}
                    value={profile[profileInput.name]}
                    state={profile}
                    setState={setProfile}
                    handleChange={handleProfile}
                    data={data[profileInput.name]}
                  />
                ))}
                <button type="submit" onClick={clickedSubmit}>
                  Submit
                </button>
              </form>
            </div>
            <Table formdata={records} setFormdata={setRecords} />
          </div>
        }
      />
      <Route
        path="/Profile"
        element={<Profile formdata={records} setFormdata={setRecords} />}
      />
    </Routes>
  );
}

export default App;
