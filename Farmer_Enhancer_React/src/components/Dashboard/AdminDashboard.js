import React, { Component } from "react";
import "./AdminDashboard.css";
// import GetMenuItem from "../Product/GetMenuItem";
// import GetUserMenus from "../Product/GetUserMenus";
import AuthServices from "../../configurations/AuthServices";
import TextField from "@material-ui/core/TextField";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import moment from 'moment';
// import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
// import CustomerServices from "../../services/CustomerServices";

import AppBar from "@material-ui/core/AppBar";
import KitchenIcon from '@material-ui/icons/Kitchen';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Rating from "@material-ui/lab/Rating";

//Table Library
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";



const authServices = new AuthServices();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

// const productServices = new ProductServices();
// const customerServices = new CustomerServices();


class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModel: false,
      OpenUserHome: true,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      TransportList: false,

      pluseCreateDataDeliveryBoy: false,
      tableDataDeliveryBoy: true,

      tableDatCustomerListManagement: true,
      PluseCustomerListManagement: false,

      tableDataProductListAdmin: true,
      pluseDataProductListAdmin: false,

      FirstnameFlag: false,
      LastnameFlag: false,
      EmailIdFlag: false,
      PasswordFlag: false,
      AdharNoFlag: false,
      Firstname: "",
      Lastname: "",
      EmailId: "",
      Password: "",
      AdharNo: "",
      fdata: new FormData(),
      ImageSelectFlag: false,


      NameTiffinFlag: false,
      PriceTiffinFlag: false,
      ImageTiffinFlag: false,
      descriptionFlag: false,
      SelectAddressFlag: false,

      NameTiffin: "",
      PriceTiffin: "",
      ImageTiffin: "",
      description: "",
      SelectAddress: "",
      choosetype: "",
      Address: "",
      AddressFlag: false,
      EnterArea: "",
      EnterAreaFlag: false,
      EnterPin: "",
      EnterPinFlag: false,




      orderTableData: [],
      FeedBackDetailsData: [],
      CustomerListData: [],
      ActiveUserCustomerList: [],
      CurrentUser: [],
      TiffinData: [],
      AddressData: [],
      forceUpdate: false,
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      PageNumber: 0,

      FeedbackPageNumber: 1,
      deliveryboodby: "",
      boyiddelivery: "",
      //
      TotalPages: 0,
      TotalRecords: 0,

      Open: false,
      OpenEdit: false, // Open Editing Booking Model
      OpenLoader: false,
      OpenSnackBar: false,

      OpenHome: true,
      OpenAddProduct: false,
      OpenOrderList: false,
      OpenFeedBack: false,
      buttonTiffinChange: true,
      tiffinidSave: 0,
      OrderList: true,
      PlusHomeDataCurrent: false,
      deliveryboylist: "",
      Update: false,
      ShowApplicantInfo: false,
      OpenBookModel: false, //Editing Booking Application
      ProductListData: [],
      TransportList: []
    };
  }

  //
  componentWillMount() {

    this.GetAllOrderDetails(this.state.PageNumber);
    this.handleFeedBackAdmin(this.state.PageNumber)

  }

  //AddMenuItem GetMenuItem UpdateMenuItem DeleteMenuItem GetCustomerOrderList UpdateOrderStatus

  GetAllOrderDetails = async (CurrentPage) => {
    console.log("Get User Appointments Calling ... ");

    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllAdminOrders(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            orderTableData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };

  GetAllAdminProductList = async (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllAdminProductList(data)
      .then((data) => {
        console.log("AddressData Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ProductListData: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  };



  // GetAllCustomerAdminOrders = (CurrentPage) => {

  //   let data = {
  //     "page": CurrentPage,
  //     "size": 15
  //   }
  //   authServices
  //     .AllCustomerAdminOrders()
  //     .then((data) => {
  //       console.log("GetUserAppointments Data : ", data);
  //       // debugger
  //       if (data.data.data !== null) {

  //         this.setState({
  //           TiffinData: data.data.data,

  //           OpenLoader: false,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("GetUserAppointments Error : ", error);
  //       this.setState({ OpenLoader: false });
  //     });
  // }


  handleInputChangeDeliveryboy = (e) => {
    let val = e.target.value
    if (e.target.name === "Firstname") {
      this.setState({
        Firstname: e.target.value,
        FirstnameFlag: false
      })
    }
    if (e.target.name === "Lastname") {
      this.setState({
        Lastname: e.target.value,
        LastnameFlag: false
      })
    }
    if (e.target.name === "EmailId") {
      this.setState({
        EmailId: e.target.value,
        EmailIdFlag: false
      })
    }
    if (e.target.name === "Password") {
      this.setState({
        Password: e.target.value,
        PasswordFlag: false
      })
    }
    if (e.target.name === "AdharNo") {
      this.setState({
        AdharNo: e.target.value,
        AdharNoFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }




  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      open: false,
      Update: false,
      OpenEdit: false,
      OpenBookModel: false,
    });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };









  handlePaging = async (e, value) => {
    debugger
    let state = this.state;
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (this.state.OpenHome) {
      await this.GetAllOrderDetails(value);

    }
    if (this.state.FeedBackDetails) {
      await this.handleFeedBackAdmin(value)
    }
    if (this.state.CustomerListManagement) {
      await this.handleCustomerListData(value)
    }

    if (this.state.ProductListAdmin) {
      await this.GetAllAdminProductList(value)
    }


  };

  // setItemTypeRadioValue = async (ID, value) => {
  //   console.log("setItemTypeRadioValue Value : ", value);

  //   if (this.state.OpenHome) {
  //     this.setState({ ItemTypeRadioValue: value });
  //     this.GetMenuItem(1, value);
  //   } else if (this.state.OpenOrderList) {
  //     this.setState({ OrderStatusRadioValue: value });
  //     await this.UpdateOrderStatus(ID, value);
  //   }
  // };

  SignOut = async () => {
    await localStorage.removeItem("token");
    this.props.history.push("/SignIn");
  };


  //

  handleHomeNav = () => {


    this.setState({
      PageNumber: 0,

      OpenUserHome: true,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      TransportList: false,
      OpenCard: false,
    });

    this.GetAllOrderDetails(this.state.PageNumber);
  };

  handleFeedBackDetails = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: true,
      TransportList: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      OpenCard: false,
    });
    this.handleFeedBackAdmin(this.state.PageNumber)
  }

  handleCustomerList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: true,
      ProductListAdmin: false,
      TransportList: false
      // OpenCard: false,
    });
    this.handleCustomerListData(this.state.PageNumber)
  }

  handleProductList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: true,
      OpenCard: false,
      TransportList: false
    });

    this.GetAllAdminProductList(this.state.PageNumber)
  }

  handleTransportList = () => {
    this.setState({
      OpenUserHome: false,
      FeedBackDetails: false,
      CustomerListManagement: false,
      ProductListAdmin: false,
      OpenCard: false,
      TransportList: true
    });

    this.handleAllTrasportDetails(this.state.PageNumber)
  }



  handleAllTrasportDetails = (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllTrasportDetails(data)
      .then((data) => {
        console.log("ActiveUserCustomerList : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            TransportList: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,

          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }


  handlePluseIcon = () => {
    this.setState({
      tableDataDeliveryBoy: false,
      pluseCreateDataDeliveryBoy: true
    })

  }

  handlePluseIconCustomerList = (CurrentPage) => {
    authServices
      .ActiveUserCustomerList(CurrentPage, 5)
      .then((data) => {
        console.log("ActiveUserCustomerList : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            ActiveUserCustomerList: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
            tableDatCustomerListManagement: false,
            PluseCustomerListManagement: true
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handlePluseIconProductListAdmin = () => {
    this.setState({
      tableDataProductListAdmin: false,
      pluseDataProductListAdmin: true
    })
  }


  handleFeedBackAdmin = (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .FeedBackAdmin(data)
      .then((data) => {
        console.log("FeedBackDetailsData : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            FeedBackDetailsData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleSubmitDeliveryboy = (e) => {
    e.preventDefault();
    debugger;

    this.CheckValidationDeliveryboy();

    if (
      this.state.LastName !== "" &&
      this.state.FirstName !== "" &&
      this.state.Password !== ""

    ) {
      const data = {
        "firstName": this.state.Firstname,
        "lastName": this.state.Lastname,
        "email": this.state.EmailId,
        "aadharNumber": this.state.AdharNo.toString(),
        "password": this.state.Password,
        "confirmPassword": this.state.Password,
        "role": "DELIVERY_BOY"

      };

      authServices
        .SignUp(data)
        .then((data) => {
          debugger
          console.log("data : ", data);
          if (data.data.success) {
            this.setState({
              Firstname: "",
              Lastname: "",
              EmailId: "",
              Password: "",
              AdharNo: "",
              tableDataDeliveryBoy: true,
              pluseCreateDataDeliveryBoy: false
            })
            this.handleFeedBackAdmin(this.state.PageNumber)

          } else {
            console.log("Sign Up Failed");
            this.setState({ open: true, Message: data.message });
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


  handleCustomerListData = (CurrentPage) => {
    let data = {
      "page": CurrentPage,
      "size": 15
    }

    authServices
      .AllCustomerAdminOrders(data)
      .then((data) => {
        console.log("FeedBackDetailsData : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            CustomerListData: data.data.data.content,
            TotalPages: data.data.data.totalPages,
            PageNumber: data.data.data.number,
            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      fdata: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })

  }

  CheckValidationTiifin = () => {

    debugger
    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress, choosetype } = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, PasswordFlag: false });

    if (NameTiffin === "") {
      this.setState({
        NameTiffinFlag: true
      })

    }
    if (PriceTiffin === "") {
      this.setState({
        PriceTiffinFlag: true
      })

    }
    if (description === "") {
      document.getElementById("description").classList.add("validation")

    }
    if (SelectAddress === "") {
      document.getElementById("SelectAddress").classList.add("validation")

    }
    // if ( choosetype === "") {
    //   document.getElementById("myfile").classList.add("validation")
    //   isvalid=false
    // }



  }
  handleSubmitTiffinData = (e) => {
    e.preventDefault()
    debugger;
    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress } = this.state
    this.CheckValidationTiifin()

    let fdataa = new FormData();

    fdataa.append("planName", NameTiffin);
    fdataa.append("pricePerDay", PriceTiffin)
    fdataa.append("bannerImg", fdata)
    fdataa.append("description", description)
    fdataa.append("addressId", SelectAddress)
    authServices

      .TiffinInsertData(fdataa)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            pluseDataProductListAdmin: false,
            tableDataProductListAdmin: true,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }

  handleEditTiffin = (id, planName, bannerUrl, pricePerDay, description) => {
    this.setState({
      NameTiffin: planName,
      description: description,
      PriceTiffin: pricePerDay,

      tableDataProductListAdmin: false,
      pluseDataProductListAdmin: true,
      tiffinidSave: parseInt(id),
      buttonTiffinChange: false
    })

  }
  handledeletetiffin = (id) => {
    authServices

      .DeleteTiffin(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  handleSubmitTiffinDataUpdate = (e) => {
    e.preventDefault()

    const { NameTiffin, PriceTiffin, fdata, description, SelectAddress, tiffinidSave } = this.state
    this.CheckValidationTiifin()

    let fdataa = new FormData();

    fdataa.append("planName", NameTiffin);
    fdataa.append("pricePerDay", PriceTiffin)
    fdataa.append("bannerImg", fdata)
    fdataa.append("description", description)
    fdataa.append("addressId", SelectAddress)
    authServices
      .TiffinIUpdateData(fdataa, tiffinidSave)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            pluseDataProductListAdmin: false,
            tableDataProductListAdmin: true,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetALlTtffines()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }


  handleClose = () => {
    this.setState({
      openModel: false
    })

  };


  getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  handledeleteAdmin = (id) => {
    authServices

      .DeleteAdminData(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllOrderDetails()
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }
  render() {

    let state = this.state;
    let self = this;

    const { OpenUserHome, ProductListData, LastnameFlag, Lastname, EmailId, EmailIdFlag, Password, choosetype, buttonTiffinChange, OrderList, PlusHomeDataCurrent,
      PasswordFlag, AdharNo, AdharNoFlag, orderTableData, FeedBackDetailsData, CustomerListData, ActiveUserCustomerList, CurrentUser,
      OpenSnackBar, Message, tableDatCustomerListManagement, PluseCustomerListManagement, tableDataDeliveryBoy, TiffinData, openModel,
      pluseCreateDataDeliveryBoy, FeedBackDetails, CustomerListManagement, ProductListAdmin, TransportList, deliveryboylist,
      tableDataProductListAdmin, pluseDataProductListAdmin, NameTiffin, NameTiffinFlag, PriceTiffin, PriceTiffinFlag, ImageSelectFlag,
      ImageTiffin, ImageTiffinFlag, description, descriptionFlag, SelectAddress, SelectAddressFlag, AddressData, AddressFlag, Address, EnterArea, EnterAreaFlag, EnterPin, EnterPinFlag } = this.state
    console.log("state : ", state);
    const { classes } = this.props;
    return (

      <div className="AdminDashboard-Container">

        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static" style={{ backgroundColor: "#355d35" }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{
                    flexGrow: 3,
                    display: "flex",
                    padding: "5px 0 0 21px",
                    boxSizing: "border-box",
                  }}
                >
                  Farmer Enhancer (Admin)

                </Typography>
                <div className="search" style={{ flexGrow: 0.5 }}>
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search"
                    classes={{
                      root: "inputRoot",
                      input: "inputInput",
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>

                <Button
                  color="inherit"
                  onClick={() => {
                    this.SignOut();
                  }}
                >
                  LogOut
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className="SubBody11">
                <div
                  className={OpenUserHome ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleHomeNav();
                  }}
                >

                  <div className="NavButtonText">Order List</div>
                </div>

                <div
                  className={CustomerListManagement ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleCustomerList();
                  }}
                >

                  <div className="NavButtonText">Customer List</div>
                </div>
                <div
                  className={ProductListAdmin ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductList();
                  }}
                >

                  <div className="NavButtonText">Product List</div>
                </div>

                <div
                  className={FeedBackDetails ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedBackDetails();
                  }}
                >

                  <div className="NavButtonText">FeedBack</div>
                </div>
              </div>
              <div className="SubBody21">
                <div className="bodyContent">
                  {OpenUserHome &&
                    <>
                      {/* <div>
                        <TextField
                          type="date"
                          className="textFieldDate"
                          id="OrderDate"
                          name="OrderDate"
                          label="Order Date"
                          placeholder="dd-mm-yyyy"
                          size="small"
                          style={{ margin: 20 }}
                          // error={OrderDateFlag}
                          // value={OrderDate}
                          // onChange={(e) => this.handleInputChangeMyorder(e)}
                          InputLabelProps={{
                            shrink: true,
                          }}

                        />
                      </div> */}

                      {OrderList &&
                        <>
                          {/* <div className="deliveryboybtn mb-4">Fetch Current Orders <ControlPointIcon onClick={() => this.handlePluseIconHome(this.state.PageNumber)} /> </div> */}
                          <div className="GetUserMenus-SubContainerAdmin ">
                            <TableContainer component={Paper}>
                              <Table className="" aria-label="simple table">
                                {/* {props.State === "UserHome" ? ( */}
                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order ID
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order image
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Quantity
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Unit
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Mfg Date
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Exp Date
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Total Price
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Action
                                      </TableCell>

                                    </TableRow>
                                  </TableHead>
                                </>
                                {/* ) : ( */}
                                <></>
                                {/* )} */}
                                <TableBody>
                                  {orderTableData.length > 0
                                    ? orderTableData.map((data, index) => {
                                      return (
                                        <TableRow >
                                          {/* {props.State === "UserHome" ? ( */}
                                          <>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.id}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.product.productName}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              <img className="bannerurl" src={data.product.imageUrl} alt="Girl in a jacket" />

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.quantity}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.unit}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.product.mfgDate).format("DD-MM-YYYY").toString()}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.product.expDate).format("DD-MM-YYYY").toString()}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.totalPrice}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdmin(data.id)} />

                                            </TableCell>


                                          </>
                                          {/* ) : ( */}
                                          <></>
                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>


                          </div>


                        </>


                      }


                    </>

                  }
                  {FeedBackDetails &&
                    <>


                      {tableDataDeliveryBoy &&
                        // <div>
                        <>

                          {/* <div className="deliveryboybtn mb-4">Delivery Boy <ControlPointIcon onClick={() => this.handlePluseIcon()} /> </div> */}
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Customer Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Feedback
                                      </TableCell>


                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {FeedBackDetailsData.length > 0
                                    ? FeedBackDetailsData.map((data, index) => {
                                      return (
                                        <TableRow key={index}>

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.user.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.product.productName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.review}
                                            </TableCell>


                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        // </div>
                      }

                    </>}

                  {CustomerListManagement &&
                    <>
                      {tableDatCustomerListManagement &&
                        // <div>
                        <>
                          {/* <div className="deliveryboybtn mb-4"> Active Customers <ControlPointIcon onClick={() => this.handlePluseIconCustomerList(this.state.PageNumber)} /> </div> */}
                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="tableDeliveryboy" aria-label="simple table">

                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Id
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        First Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 150, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Last Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Username
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 193, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Mobile Number
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        City
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Address
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Zip
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Role
                                      </TableCell>
                                     

                                    </TableRow>
                                  </TableHead>
                                </>

                                <TableBody>
                                  {CustomerListData.length > 0
                                    ? CustomerListData.map((data, index) => {
                                      return (
                                        <TableRow >

                                          <>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.id}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 200 }}>
                                              {data.firstName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.lastName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.userName}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.mobileNumber}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.city}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.address}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.zip}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.role}
                                            </TableCell>
                                            {/* <TableCell align="center" style={{ width: 100 }}>
                                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdmin(data.id)} />

                                            </TableCell> */}

                                          </>

                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>
                        // </div>
                      }

                    </>}

                  {ProductListAdmin &&
                    <>

                      {tableDataProductListAdmin &&
                        <>

                          <div className="GetUserMenus-SubContainerAdmin">
                            <TableContainer component={Paper}>
                              <Table className="" aria-label="simple table">
                                {/* {props.State === "UserHome" ? ( */}
                                <>
                                  <TableHead></TableHead>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order ID
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 200, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Order image
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Quantity
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Unit
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Mfg Date
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Exp Date
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Type
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        style={{ width: 210, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Total Price
                                      </TableCell>
                                     



                                    </TableRow>
                                  </TableHead>
                                </>
                                {/* ) : ( */}
                                <></>
                                {/* )} */}
                                <TableBody>
                                  {ProductListData.length > 0
                                    ? ProductListData.map((data, index) => {
                                      return (
                                        <TableRow >
                                          {/* {props.State === "UserHome" ? ( */}
                                          <>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.id}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 200 }}>
                                              {data.productName}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              <img className="bannerurl" src={data.imageUrl} alt="Girl in a jacket" />

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.quantity}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.unit}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.mfgDate).format("DD-MM-YYYY").toString()}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {moment(data.expDate).format("DD-MM-YYYY").toString()}

                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.productType}
                                            </TableCell>
                                            <TableCell align="center" style={{ width: 100 }}>
                                              {data.price}
                                            </TableCell>

                                            {/* <TableCell align="center" style={{ width: 100 }}>
                                              <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdmin(data.id)} />

                                            </TableCell> */}

                                          </>
                                          {/* ) : ( */}
                                          <></>
                                          {/* )} */}
                                        </TableRow>
                                      );
                                    })
                                    : null}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </>}
                    </>
                  }

                  {(OpenUserHome || FeedBackDetails || CustomerListManagement || ProductListAdmin) &&
                    <Pagination
                      className="Pagination"
                      count={this.state.TotalPages}
                      Page={this.state.PageNumber}
                      onChange={(e) => this.handlePaging(e, this.state.TotalPages)}
                      variant="outlined"
                      shape="rounded"
                      color="secondary"
                    />}
                </div>
              </div>


            </div>
            <div className="FooterDiv">Footer</div>
          </div>
        </div>


        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={state.OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={state.Message}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.handleSnackBarClose}
              >
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackBarClose}
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

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AdminDashboard);
