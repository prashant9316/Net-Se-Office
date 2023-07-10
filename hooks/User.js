import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import server_url from 'api/server';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)

  const login = async(formData) => {
    
    try {
        const response = await axios.post(`${server_url}login`, formData)
        console.log(response.data)
        if(response.data.success == true){
          const token = response.data.token;
          localStorage.setItem('token', token);
          // Fetch the user data
          fetchUser(token);           

        } else {
          alert("logged in failed!")
        }
  
      } catch (error) {
        console.log(error);
        alert("Login failed!")
      }

    // Store the token in localStorage or sessionStorage

    
  };

  const logout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('token');

    // Clear the user state
    setUser(null);
    setIsAdmin(false);
  };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get(`${server_url}me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        const userData = response.data;
        setIsAdmin(userData.admin)
        setUser(userData.user);
      } else {
        setUser(null);
      }

      setLoading(false);
    } catch (error) {
      console.log("maa ka bhosda")
      // console.error('Failed to fetch user data:', error);
      setUser(null)
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the token is stored in localStorage or sessionStorage
    try {
        const token = localStorage.getItem('token');

        if (token) {
        // Fetch the user data if the token exists
        fetchUser(token);
        } else {
        setLoading(false);
        }
    } catch (error) {
        console.log("Here is the error you mo--------------------------")
        console.log(error)
        setLoading(false)
    }
    
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext)