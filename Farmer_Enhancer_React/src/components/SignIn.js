import React, { Component } from "react";
import AuthServices from "../configurations/AuthServices";
import "./SignIn.css";
import TextField from "@material-ui/core/TextField";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// import { Dataservices } from "../configurations/Dataservice";

const authServices = new AuthServices();

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
     
      Username: "",
      UsernameFlag: false,
      Password: "",
      PasswordFlag: false,
      open: false,
      Message: "",
    };
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      { [name]: value },
      console.log("Name : ", name, "Value : ", value)
    );
  };

  handleSignUp = (e) => {
    this.props.history.push("/");
  };

  CheckValidation() {
    console.log("CheckValidation Calling...");

    this.setState({ UsernameFlag: false, PasswordFlag: false });

    if (this.state.Username === "") {
      this.setState({ UsernameFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }
  }

  handleSubmit = (e) => {
    this.CheckValidation();
    if (this.state.Username !== "" && this.state.Password !== "") {
      console.log("Acceptable");
      let data = {
        userName: this.state.Username,
        password: this.state.Password,
       
      };
      authServices
        .SignIn(data)
        .then((data) => {
          console.log("Sign In Data : ", data);
          if (data.data.success) {
             localStorage.setItem("token", data.data.data.token);
             localStorage.setItem("UserId", data.data.data.user.id);
            if (data.data.data.user.role === "FARMER") {
              localStorage.setItem("FarmerID", data.data.data.user.id);
              this.props.history.push("/FarmerDashboard");
            } 
            else if(data.data.data.user.role === "ADMIN"){
              localStorage.setItem("AdminId", data.data.data.user.id);
              this.props.history.push("/AdminDashboard");
            }
            else if(data.data.data.user.role === "EXPORTER"){
              localStorage.setItem("ExpoterId", data.data.data.user.id);
              this.props.history.push("/ExporterDashboard");
            }
            else {
              localStorage.setItem("SeedId", data.data.data.user.id);
              this.props.history.push("/SeedDashboard");
            }
            
          } else {
            console.log("Something Went Wrong");
            this.setState({ open: true, Message: data.message });
          }
        })
        .catch((error) => {
          console.log("Sign In Error : ", error);
          this.setState({ open: true, Message: "Something Went Wrong" });
        });
    } else {
      console.log("Not Acceptable");
      this.setState({ open: true, Message: "Please Field Mandetory Field" });
    }
  };

  render() {
    console.log("State : ", this.state);
    return (
      <div className="SignIn-Container">
        <div className="SignUp-SubContainer">
          <div className="Title">Farmer Enhancer</div>
          <div className="Header_Container">Log In</div>
          <div className="Body">
            <form className="form">
              <TextField
                className="TextField"
                name="Username"
                label="Username"
                variant="outlined"
                size="small"
                style={{ margin: 20 }}
                error={this.state.UsernameFlag}
                value={this.state.Username}
                onChange={this.handleChange}
              />
              <TextField
                className="TextField"
                type="password"
                name="Password"
                label="Password"
                variant="outlined"
                size="small"
                style={{ margin: 20 }}
                error={this.state.PasswordFlag}
                value={this.state.Password}
                onChange={this.handleChange}
              />
           
            </form>
          </div>
          <div className="Buttons" style={{ alignItems: "flex-start" }}>
            <Button className="Btn" color="primary" onClick={this.handleSignUp}>
              Create New Account
            </Button>
            <Button
              className="Btn"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={this.state.Message}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
