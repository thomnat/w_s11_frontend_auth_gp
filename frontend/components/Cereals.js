import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cereals() {
  const [cereals, setCereals] = useState([]);
  const navigate = useNavigate()

  const logout = () => {
    //wipe the token from local storage
    localStorage.removeItem("token")
    //redirecting the user back to the login page
    navigate("/") //the home page
  };

  useEffect(() => {
    //grab token from local storage
    const token = localStorage.getItem('token')
    //if token is not in local storage, then navigate user back to login page
    if (!token) {
      navigate("/")
    } else {
      const fetchCereals = async () => {
        //GET cereals, appending token to Authorization header
        try {
          const response = await axios.get(
            '/api/cereals',
            { headers: { Authorization: token }}
          )
          setCereals(response.data)
        } catch (error) {
          if (error?.response?.status === 401) logout()
        }
        
        
        //if response is a 401 Unauthorized, perform a logout
        //if response is OK, set the cereals in component state so they will render to screen
      }
      fetchCereals()
    }
  }, []);

  return (
    <div className="container">
      <h3>
        Cereals List <button onClick={logout}>Logout</button>
      </h3>
      {cereals.length > 0 ? (
        <div>
          {cereals.map((cereal) => (
            <div
              key={cereal.id}
              style={{ marginBottom: "20px" }}
              className="cereal"
            >
              <h4>{cereal.name}</h4>
              <p>Brand: {cereal.brand}</p>
              <p>Sugar content: {cereal.sugarContent}</p>
              <p>{cereal.history}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cereals found.</p>
      )}
    </div>
  );
}
