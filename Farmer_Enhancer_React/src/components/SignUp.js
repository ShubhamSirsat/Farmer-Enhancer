import React, { Component } from "react";
import "./SignUp.css";

import AuthServices from "../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";



const authServices = new AuthServices();

const PasswordRegex = RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
);

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {

      FirstName: "",
      LastName: "",
      UserName: "",
      Password: "",

      Role: "Admin",

      FirstNameFlag: false,
      LastNameFlag: false,
      UserNameFlag: false,
      MobileNo: "",
      MobileNoFlag: false,
      PasswordFlag: false,
      ConfirmPasswordFlag: false,
      RoleFlag: false,

      open: false,
      Message: "",
      Zip: "",
      ZipFlag: false,
      Address: "",
      AddressFlag: false,
      City: "",
      CityFlag: false
    };
  }

  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  CheckValidity() {
    console.log("Check Validity Calling");
    //Reset Flag
    this.setState({
      FirstNameFlag: false,
      LastNameFlag: false,
      UserNameFlag: false,
      MobileNoFlag: false,
      PasswordFlag: false,
      ZipFlag: false,
      AddressFlag: false,
      CityFlag: false,

      RoleFlag: false,
    });

    if (this.state.FirstName === "") {
      this.setState({ FirstNameFlag: true });
    }
    if (this.state.LastName === "") {
      this.setState({ LastNameFlag: true });
    }

    if (this.state.UserName === "") {
      this.setState({ UserNameFlag: true });
    }
    if (this.state.MobileNo === "") {
      this.setState({ MobileNoFlag: true });
    }
    if (this.state.Password === "") {
      this.setState({ PasswordFlag: true });
    }

    if (this.state.Zip === "") {
      this.setState({ ZipFlag: true });
    }
    if (this.state.Address === "") {
      this.setState({ AddressFlag: true });
    }
    if (this.state.City === "") {
      this.setState({ CityFlag: true });
    }

    if (this.state.Radiovalue === "Admin" && this.state.Role === "") {
      this.setState({ RoleFlag: true });
    }
  }

  handleSubmit = (e) => {
  
      this.CheckValidity();
     
      if (
        this.state.LastName !== "" &&
        this.state.FirstName !== "" &&
        this.state.Password !== "" &&
        this.state.UserName !== "" &&
        this.state.City !== "" &&
        this.state.Zip !== "" &&
        this.state.Address !== "" &&
        this.state.MobileNo !== ""
      ) {
        const data = {
          "firstName": this.state.FirstName,
          "lastName": this.state.LastName,
          "userName": this.state.UserName,
          "mobileNumber": this.state.MobileNo.toString(),
          "address": this.state.Address,
          "city": this.state.City,
          "zip": parseInt(this.state.Zip),
          "password": this.state.Password,
          "role": this.state.Role.toUpperCase()
        }

      authServices
        .SignUp(data)
        .then((data) => {
          console.log("data : ", data);
          if (data.data.success) {

            this.props.history.push("/SignIn");


          } else {
            console.log("Sign Up Failed");
            this.setState({ open: true, Message: data.data.message });
          }
        })
        .catch((error) => {
          console.log("error : ", error);
          this.setState({ open: true, Message: "Something Went Wrong" });
        });
    } else {
      console.log("Not Acceptable");
      this.setState({ open: true, Message: "Please Fill Required Field" });
    }
  
  };


handleChangePassword = (e) => {
  const { name, value } = e.target;
  console.log("Regex Match : ", PasswordRegex.test(value));
  if (!PasswordRegex.test(value)) {
    this.setState({ PasswordFlag: true });
  } else {
    this.setState({ PasswordFlag: false });
  }
  this.setState(
    { [name]: value },
    console.log(
      "Name : ",
      name,
      "Value : ",
      value,
      " PasswordFlag : ",
      this.state.PasswordFlag
    )
  );
};

handleChange = (e) => {
  const { name, value } = e.target;
  if (e.target.name === "FirstName") {
    this.setState({
      FirstName: e.target.value,
      FirstNameFlag: false
    })
  }
  if (e.target.name === "LastName") {
    this.setState({
      LastName: e.target.value,
      LastNameFlag: false
    })
  }


  if (e.target.name === "UserName") {
    this.setState({
      UserName: e.target.value,
      UserNameFlag: false
    })
  }
  if (e.target.name === "MobileNo") {
    this.setState({
      MobileNo: e.target.value,
      MobileNoFlag: false
    })
  }

  if (e.target.name === "Zip") {
    this.setState({
      Zip: e.target.value,
      ZipFlag: false
    })
  }

  if (e.target.name === "Address") {
    this.setState({
      Address: e.target.value,
      AddressFlag: false
    })
  }

  if (e.target.name === "City") {
    this.setState({
      City: e.target.value,
      CityFlag: false
    })
  }




  this.setState(
    { [name]: value },
    console.log("Name : ", name, "Value : ", value)
  );
};

handleRadioChange = (e) => {
  this.setState({ Radiovalue: e.target.value });
};

handleSignIn = (e) => {
  this.props.history.push("/SignIn");
};

render() {
  console.log("state : ", this.state);
  return (
    <div className="SignUp-Container">
      <div className="SignUp-SubContainer">
        <div className="Title">Farmer Enhancer</div>
        <div className="Header_Container">Registration</div>
        <div className="Body">
          <form className="form">
            <TextField
              className="TextField"
              name="FirstName"
              label="FirstName"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.FirstNameFlag}
              value={this.state.FirstName}
              onChange={this.handleChange}
            />
            <TextField
              className="TextField"
              name="LastName"
              label="LastName"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.LastNameFlag}
              value={this.state.LastName}
              onChange={this.handleChange}
            />
            <TextField
              className="TextField"
              name="UserName"
              label="UserName"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.UserNameFlag}
              value={this.state.UserName}
              onChange={this.handleChange}
            />

            <TextField

              className="TextField"
              name="Address"
              label="Address"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.AddressFlag}
              value={this.state.Address}
              onChange={this.handleChange}
            />
            <TextField

              className="TextField"
              name="City"
              label="City"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.CityFlag}
              value={this.state.City}
              onChange={this.handleChange}
            />
            <TextField

              className="TextField"
              name="Zip"
              label="Zip"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.ZipFlag}
              value={this.state.Zip}
              onChange={this.handleChange}
            />
            <TextField
              type="number"
              className="TextField"
              name="MobileNo"
              label="Mobile no"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.MobileNoFlag}
              value={this.state.MobileNo}
              onChange={this.handleChange}
            />
            <TextField
              className="TextField"
              type="password"
              name="Password"
              label="Password"
              variant="outlined"
              size="small"
              style={{ margin: 10 }}
              error={this.state.PasswordFlag}
              value={this.state.Password}
              onChange={this.handleChangePassword}
            />
            {this.state.PasswordFlag ? (
              <div className="PassError">
                Password Must Contain Upper Letter, Lower Letter, Symbol &
                Number.
              </div>
            ) : (
              <></>
            )}
            {/* <TextField
                className="TextField"
                type="password"
                name="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                style={{ margin: 10 }}
                error={this.state.ConfirmPasswordFlag}
                value={this.state.ConfirmPassword}
                onChange={this.handleChange}
              /> */}


            <RadioGroup
              //   aria-label="gender"
              name="Role"
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                // alignItems: "center",
              }}
              value={this.state.Role}
              onChange={this.handleChange}
            >

              <FormControlLabel
                value="Admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                value="Farmer"
                control={<Radio />}
                label="Farmer"
              />
              <FormControlLabel
                value="EXPORTER"
                control={<Radio />}
                label="Exporter"
              />
              <FormControlLabel
                value="SEED_SUPPLIER"
                control={<Radio />}
                label="Seed_Supplier"
              />
            </RadioGroup>

          </form>
        </div>
        <div className="Buttons">
          <Button className="Btn" color="primary" onClick={this.handleSignIn}>
            Sign In
          </Button>
          <Button
            className="Btn"
            variant="contained"
            color="primary"
            onClick={() => this.handleSubmit()}
          >
            Sign Up
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
