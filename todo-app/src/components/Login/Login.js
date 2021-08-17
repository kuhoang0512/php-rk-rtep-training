import React, { useState }  from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./LoginStyle.scss";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

const Login  = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [hidden] = useState(true);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const [errMsgPassword, setErrMsgPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const onChangeHandler = (e) =>{
    let tmpLogin = { ...loginData };
    tmpLogin[e.target.name] = e.target.value;
    setLoginData(tmpLogin);
  }

  const onSubmitHandler = () =>{
    var formdata = new FormData();
    formdata.append("email", loginData.email);
    formdata.append("password", loginData.password);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if(result.status === 'success'){

          sessionStorage.setItem('token', result.token)
          sessionStorage.setItem('userName', loginData.email)
          sessionStorage.setItem('isLoggedIn', true)
        }
    if(result.status === 'failed'){
      setErrMsg(result.message)
    }
    if(result.status === "error"){
      setError(true);
      setErrMsgEmail(result.validation_errors.email[0]);
      setErrMsgPassword(result.validation_errors.password[0]);
    }
    if(result.error === false){
      setRedirect(true);
    }
      })
      .catch((error) => {
        console.log("errro",error);
      });  
  }

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (redirect ) {
    return <Redirect to="/todo" />;
  }

  if(isLoggedIn){
    return <Redirect to="/todo" />;
  }

  return (
    <Container className="themed-container mt-2" fluid="sm">
        <ThemeProvider theme={theme}>
        <div className="wrapper">
          <div className="text-center">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            <div className="text-color">Signin</div>
            <div className="hr"></div>
          </div>
          <div className="signin-wrapper">  
              <TextField
                error={error}
                helperText={loginData.email === ''? error : errMsgEmail}
                label="Email"
                type="text"
                name="email"
                fullWidth
                variant="outlined"
                value={loginData.email}
                onChange={onChangeHandler}
              />
              <div className="show-hide-pwd-wrapper">
                <TextField
                  error={error}
                  helperText={loginData.password ===''? error : errMsgPassword }
                  label="Password"
                  name="password"
                  type={hidden ? "password" : "text"}
                  fullWidth
                  variant="outlined"
                  value={loginData.password}
                  onChange={onChangeHandler}
                />
              </div>
              <p className="errMsgStyl">{errMsg}</p>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={onSubmitHandler}
              disabled={!loginData.email || !loginData.password}
            >
              SIGN IN
            </Button>
            <p to="/sign-up" className="dont-have-txt">
              Don't have an Account to Signin? <Link to="/" className="signup-txt">SignUp</Link>
            </p>
          </div>
        </div>
        </ThemeProvider>
      </Container>
  )
}

export default Login;