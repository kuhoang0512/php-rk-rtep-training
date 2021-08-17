import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./RegistrationStyle.scss";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

const Registration = () => {
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    full_name: "",
  });

  const [hidden, setHidden] = useState(true);
  const [errMsgFirstName, setErrMsgFistName] = useState("");
  const [errMsgLastName, setErrMsgLastName] = useState("");
  const [errMsgPhone, setErrMsgPhone] = useState("");
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);

  const toggleShow = () => {
    setHidden(!hidden);
  }

  const onChangeHandler = (e, key) => {
    let tmpSignup = { ...signupData };
    tmpSignup[e.target.name] = e.target.value.trim();
    setSignupData(tmpSignup);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("first_name", signupData.first_name);
    formdata.append("last_name", signupData.last_name);
    formdata.append("email", signupData.email);
    formdata.append("password", signupData.password);
    formdata.append("phone", signupData.phone);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/register`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setSignupData({
            first_name: "",
            last_name: "",
            password: "",
            email: "",
            phone: "",
          });
          setErrMsgFistName("");
          setErrMsgLastName("");
          setErrMsgPhone("");
          setErrMsgEmail("");
          setSuccessMsg("");
          setErrMsgPassword("");
          setError(false);

        }
        setTimeout(() => {
          setSuccessMsg(result.message);
        }, 1000);
        if (result.status === "error" && result.validation_errors.first_name) {
          setError(true);
          setErrMsgFistName(result.validation_errors.first_name[0]);
        }
        if (result.status === "error" && result.validation_errors.last_name) {
          setError(true);
          setErrMsgLastName(result.validation_errors.last_name[0]);
        }
        if (result.status === "error" && result.validation_errors.phone) {
          setError(true);
          setErrMsgPhone(result.validation_errors.phone[0]);
        }
        if (result.status === "error" && result.validation_errors.email) {
          setError(true);
          setErrMsgEmail(result.validation_errors.email[0]);
        }
        if (result.status === "error" && result.validation_errors.password) {
          setError(true);
          setErrMsgPassword(result.validation_errors.password[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="themed-container mt-2" fluid="sm">
      <div className="text-center">
        <i className="fa fa-2x fa-lock" aria-hidden="true"></i>
        <div className="text-color">Signup</div>
        <div className="hr"></div>
      </div>
      <ThemeProvider theme={theme}>
        <div className="d-flex justify-content-around mb-5">
          <div className="txt-first">
            <TextField
              error={error}
              name="first_name"
              label="First Name"
              fullWidth
              hintText="Phone"
              color="primary"
              variant="outlined"
              value={signupData.first_name}
              onChange={onChangeHandler}
              autoFocus
              helperText={errMsgFirstName}
            />
          </div>
          <div className="txt-last">
            <TextField
              error={error}
              name="last_name"
              label="Last Name"
              color="primary"
              variant="outlined"
              value={signupData.last_name}
              onChange={onChangeHandler}
              fullWidth
              helperText={errMsgLastName}
            />
          </div>
        </div>
        <div className="signup-wrapper">
          <TextField
            error={error}
            name="phone"
            label="Phone"
            type="number"
            fullWidth
            variant="outlined"
            value={signupData.phone}
            onChange={onChangeHandler}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 10);
            }}
            min={0}
            helperText={errMsgPhone}
          />
          <TextField
            error={error}
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={signupData.email}
            onChange={onChangeHandler}
            helperText={errMsgEmail}
          />
          <div className="show-hide-pwd-wrapper">
            <TextField
              error={error}
              name="password"
              label="Password"
              type={hidden ? "password" : "text"}
              fullWidth
              variant="outlined"
              value={signupData.password}
              onChange={onChangeHandler}
              helperText={errMsgPassword}
            />
            {/* <img
              src={hidden ? showPwd : hidePwd}
              onClick={toggleShow}
              alt="showPwd"
              className="eyeIcon"
            /> */}
          </div>
          <div className="alert alert-success">{successMsg}</div>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={onSubmitHandler}
          >
            SIGN UP
          </Button>
          <p className="already-txt ml-5">
            Already have an account?
            <Link to="/login" className="sign-in-txt">
              Sign In
            </Link>
          </p>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default Registration;