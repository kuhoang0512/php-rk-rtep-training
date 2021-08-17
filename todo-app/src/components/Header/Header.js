import React, { useState, useEffect } from "react";
import { Toolbar, Typography, AppBar, Button } from '@material-ui/core';

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(sessionStorage.getItem("isLoggedIn") ?? null);
    }, 100);
  }, []); 

  const todoLogout = () => {
    let token = sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/user/logout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          window.location.reload();
          sessionStorage.clear();
          let temp = window.location.origin;
          window.location.href = temp + "/login";
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {isLoggedIn ? (
        <AppBar
          position="static"
          style={{ color: "black", backgroundColor: "#F2AA4CFF" }}
        >
          <Toolbar
            style={{ display: " flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Todo App</Typography>
            <Button onClick={todoLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="static"
          style={{ color: "black", backgroundColor: "#F2AA4CFF" }}
        >
          <Toolbar
            style={{ display: " flex", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Todo App</Typography>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default Header;