import React, { Component } from "react";

import "./FarmerDashboard.css";
// import "../Product/GetUserMenus.css"
import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import GetUserMenus from "../Product/GetUserMenus";
// import ProductServices from "../../services/ProductServices";
// import CustomerServices from "../../services/CustomerServices";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/Delete";

import RestaurantIcon from "@material-ui/icons/Restaurant";
// import AgricultureIcon from '@mui/icons-material/Agriculture';
// import AgricultureIcon from '@material-ui/icons/Agriculture';
import KitchenIcon from '@material-ui/icons/Kitchen';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import AuthServices from "../../configurations/AuthServices";

// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Pagination from "@material-ui/lab/Pagination";
import { FormatListBulletedRounded } from "@material-ui/icons";

const authServices = new AuthServices();
const minDate = new Date(Date.now());
// const customerServices = new CustomerServices();

export default class SeedDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      UserDataTable: [],
      ItemTypeRadioValue: "Pending",
      //
      FeedBack: "",
      RatingValue: 1,
      // FeedBackFlag: false,
      OpenFeedback: false,
      //
      Message: "",
      //
      NumberOfRecordPerPage: 6,
      //
      PageNumber: 0,
      fdata: new FormData(),
      //
      TotalPages: 0,
      TotalRecords: 0,

      Open: false, // Flag For Open Feedback
      OpenLoader: false,
      OpenSnackBar: false,

      Update: false,

      ProductListFlag: true,

      FeedbackFlag: false,
      MyOrder: false,
      OpenMyOrder: false,
      Address: "",
      SelectArea: "",
      MyOrderData: [],
      TiffinData: [],

      ProdtNameFlag: false,
      ProductPriceFlag: false,
      QuantityFlag: false,
      UnitFlag: false,
      MfgDateFlag: false,
      ProdtName: "",
      ProductPrice: "",
      Quantity: "",
      Unit: "",
      MfgDate: "",
      ExpDate: "",
      ExpDateFlag: false,
      ProductType: "",
      ProductTypeFlag: false,
      VehicalNeed: "",
      VehicalNameFlag: false,
      VehicalName: "",
      QuantityVehicle: "",
      QuantityVehicleFlag: false,
      NoOfDays: "",
      NoOfDaysFlag: false,
      TotalPrice: "",
      PriceVehicle: "",
      PriceVehicleFlag: false,
      OrderDateFlag: false,
      OrdernameFlag: false,
      OrderPriceFlag: false,
      OrderDate: "",
      Ordername: "",
      OrderPrice: "",
      SeedData:[],

      OrderDetails: true,

      FromDate: "",
      FromDateFlag: false,
      ToDate: "",
      ToDateFlag: false,
      TiifinPanId: "",
      TiifinPanIdFlag: false,
      TotalDays: "",
      TotalDaysFlag: false,
      BookedBy: "",
      BookedByFlag: false,

      paymentPage: true,
      PaymentModeSelect: "",
      FeedbackFlag: false,
      FeedBack: "",

      AccountNumberFlag: false,
      AccountNumber: "",
      CVV: "",
      CVVFlag: false,
      CustomerName: "",
      CustomerNameFlag: false,

      orderId: "",
      TiffinIDPlan: "",
      FeedBackDetails:[],

      OpenCard: false,
    };
  }

  componentWillMount() {
    this.GetAllSeedDetails(this.state.PageNumber)

  }

  handlePluseIcon = () => {
    this.setState({
      OrderDetails: false
    })
  }

  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      fdata: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })

  }
  handleInputChange = (e) => {

    if (e.target.name === "Address") {
      this.setState({
        Address: e.target.value
      })
      document.getElementById("Address")?.classList.remove('validation')

    }
    if (e.target.name === "SelectArea") {
      this.setState({
        SelectArea: e.target.value
      })
      document.getElementById("SelectArea")?.classList.remove('validation')

    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))
  }


  GetAllSeedDetails = (CurrentPage) => {
    let UserId = localStorage.getItem("UserId")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllSeedDetails(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            SeedData: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  UserOrderData = (CurrentPage) => {
    let UserId = localStorage.getItem("UserId")
    authServices
      .UserOrderData(CurrentPage, 5)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            MyOrderData: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }




  handleClose = () => {
    console.log("Handle Close Calling ...");
    this.setState({
      Open: false,
      Update: false,
      OpenBookModel: false,
      FeedBackFlag: false,
    });
  };


  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handlePaging = async (e, value) => {
    let state = this.state;
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (state.ProductListFlag) {
      await this.GetAllSeedDetails(value);
    }
  };

  SignOut = async () => {
    await localStorage.removeItem("token")
    this.props.history.push("/SignIn");
  };

  handleProductDetete = (id) => {
    authServices

        .deleteFarmerOrder(id)
        .then((data) => {
            console.log("filedata : ", data);
            debugger
            if (data.data !== null) {

                this.setState({
                    OpenLoader: false,
                    OpenSnackBar: true,
                    Message: data.data.message
                });
                this.GetAllSeedDetails(this.state.PageNumber)
            }
        })
        .catch((error) => {
            console.log("GetUserAppointments Error : ", error);
            this.setState({ OpenLoader: false });
        });
}

  //
  handleProductListFlag = () => {


    this.setState({
      ProductListFlag: true,
      FeedbackFlag: false,
      MyOrder: false,
      OpenCard: false,
    });

    this.GetUserAppointments(this.state.PageNumber);
  };

  handleProductSellFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: true,
      FeedbackFlag: false,
      MyOrder: false,
      OpenCard: false,
    });
  }

  handleFeedback = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      FeedbackFlag: true,
      MyOrder: false,
      // OpenCard: false,
    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }


  GetallFeedbackUser = (CurrentPage) => {
    let SeedId = localStorage.getItem("SeedId")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .GetallFeedbackUser(SeedId,data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        this.setState({
          FeedBackDetails:data.data.data.content
        })
       
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }


  
  CheckValidationProductSell = () => {
    const { ProdtName, ProductPrice, Quantity, Unit, MfgDate, ExpDate} = this.state
    console.log("CheckValidation Calling...");


    // this.setState({ EmailIDFlag: false, UnitFlag: false });

    if (ProdtName === "") {
      this.setState({
        ProdtNameFlag: true
      })
    }
    if (ProductPrice === "") {
      this.setState({
        ProductPriceFlag: true
      })
    }
    if (Quantity === "") {
      this.setState({
        QuantityFlag: true
      })
    }
    if (Unit === "") {
      this.setState({
        UnitFlag: true
      })
    }
    if (MfgDate === "") {
      this.setState({
        MfgDateFlag: true
      })
    }
    if (ExpDate === "") {
      this.setState({
        ExpDateFlag: true
      })
    }
  }

  handleProductOrderSubmit = (e) => {
    e.preventDefault()
    debugger
    let SeedId = localStorage.getItem("SeedId")
    this.CheckValidationProductSell()
    let fdataa = new FormData();

    fdataa.append("unit", parseInt(this.state.Unit));
    fdataa.append("userId", parseInt(SeedId));
    fdataa.append("productType", "SEEDS")
    fdataa.append("price", parseInt(this.state.ProductPrice))
    fdataa.append("quantity", parseInt(this.state.Quantity))
    fdataa.append("expDate", moment(this.state.ExpDate).format("YYYY/MM/DD").toString())
    fdataa.append("productImage", this.state.fdata)
    fdataa.append("productName", this.state.ProdtName)
    fdataa.append("mfgDate", moment(this.state.MfgDate).format("YYYY/MM/DD").toString())

    authServices

      .AddProductDetailsFarmer(fdataa)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data.data !== null) {

          this.setState({
            ProdtName: "",
            Unit: "",
            ProductPrice: "",
            Quantity: "",
            ExpDate: "",
            fdata: "",
            MfgDate: "",
            OrderDetails: true,
            paymentPage: false,
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllSeedDetails(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }


  handleInputChangeProductSell = (e) => {
    let val = e.target.value
    if (e.target.name === "ProdtName") {
      this.setState({
        ProdtName: e.target.value,
        ProdtNameFlag: false
      })
    }
    if (e.target.name === "ProductPrice") {
      this.setState({
        ProductPrice: e.target.value,
        ProductPriceFlag: false
      })
    }
    if (e.target.name === "Quantity") {
      this.setState({
        Quantity: e.target.value,
        QuantityFlag: false
      })
    }
    if (e.target.name === "Unit") {
      this.setState({
        Unit: e.target.value,
        UnitFlag: false
      })
    }
    if (e.target.name === "MfgDate") {
      this.setState({
        MfgDate: e.target.value,
        MfgDateFlag: false
      })
    }
    if (e.target.name === "ExpDate") {
      this.setState({
        ExpDate: e.target.value,
        ExpDateFlag: false
      })
    }
    if (e.target.name === "ProductType") {
      this.setState({
        ProductType: e.target.value,
        ProductTypeFlag: false
      })
    }


    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }
 
  
  

  handleOpenFeedbackModel = () => {
    this.setState({ OpenFeedback: true });
  };

  handleClose = () => {
    this.setState({ OpenFeedback: false });
  };

  disablePrevDates = (date) => {
    return date?.getDay() === 0;
  }
  render() {
    const { ProdtNameFlag, ProdtName, ProductPriceFlag, ProductPrice, Quantity, QuantityFlag, Unit,SeedData,
      UnitFlag, MfgDate, MfgDateFlag, ProductListFlag, TiffinData, ExpDate, ExpDateFlag,FeedBackDetails,
      OpenSnackBar, Message, MyOrder, OrderDetails,  FeedbackFlag, Feedback } = this.state
    return (
      <div className="UserDashBoard-Container">
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
                    fontSize: "23px",
                    fontWeight: "bold"
                  }}
                >
                  Farmer Enhancer (Seed_Supplier)
                  {/* <div style={{ margin: "3px 0 0 0" }}>
                    <AgricultureIcon />
                  </div> */}
                </Typography>
                <div className="search" style={{ flexGrow: 0.5 }}>
                  <div className="searchIcon">
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search "
                    classes={{
                      root: "inputRoot",
                      input: "inputInput",
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                {/* <Button
                  variant="outlined"
                  style={{
                    color: "white",
                    margin: "0 50px",
                  }}
                  onClick={() => {
                    this.handleFeedOpen();
                  }}
                >
                  Feedback &nbsp;
                  <FeedbackIcon />
                </Button> */}
                <Button
                  // style={{ flexGrow: 1 }}
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
                  className={ProductListFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductListFlag();
                  }}
                >
                  {/* <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton> */}
                  <div className="NavButtonText">Product Details </div>
                </div>



                <div
                  className={FeedbackFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedback();
                  }}
                >
                  {/* <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton> */}
                  <div className="NavButtonText">FeedBack</div>
                </div>

              </div>
              <div className="SubBody22">
                <div className="bodyContent" >
                  {ProductListFlag &&
                    <>

                      {OrderDetails ?
                        <>
                          <div className="sportstitle1 mb-4">Sell Products Details <ControlPointIcon className="iconbtn" onClick={() => this.handlePluseIcon()} /> </div>

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
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Seed Name
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Seed Image
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Seed Price
                                    </TableCell>

                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Mfg Date
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Expiry Date
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product type
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Action
                                    </TableCell>
                                  
                                  </TableRow>
                                </TableHead>
                              </>

                              <TableBody>
                                {SeedData?.length > 0
                                  ? SeedData.map((data, index) => {
                                    return (
                                      <TableRow >
                                        <>
                                          <TableCell align="Left" style={{ width: 200 }}>
                                            {data.id}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 200 }}>
                                            {data.productName}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            <img className="bannerurl" src={data.imageUrl} alt="Girl in a jacket" />
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.price}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {moment(data.mfgDate).format("DD-MM-YYYY").toString()}

                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {moment(data.expDate).format("DD-MM-YYYY").toString()}

                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.productType}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                          <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handleProductDetete(data.id)} />
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
                        :
                        <>
                          <div className="plusContent">
                            <div className="plusContent_sub">
                              <div className="sportstitlePlus">Product Details</div>
                              <div>
                                <form className="form">

                                  <TextField
                                    className="TextField1"
                                    name="ProdtName"
                                    label="Product Name"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProdtNameFlag}
                                    value={ProdtName}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="ProductPrice"
                                    label="Product Price"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={ProductPriceFlag}
                                    value={ProductPrice}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="Quantity"
                                    label="Quantity"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={QuantityFlag}
                                    value={Quantity}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <TextField
                                    type="number"
                                    className="TextField1"
                                    name="Unit"
                                    label="Unit"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: 20 }}
                                    error={UnitFlag}
                                    value={Unit}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />
                                  <div className="fileImage">
                                    <label className="imagetitle" for="myfile">Select a Image :</label>
                                    <div className="fileInput">
                                      <input className="inputFile" type="file" id="myfile" name="choosetype" onChange={(e) => this.filechangehandler(e)} />
                                      <label>{this.state.fdata.name}</label>
                                    </div></div>
                                  <TextField
                                    id="MfgDate"
                                    label="Manufacture Date"
                                    type="date"
                                    name="MfgDate"
                                    error={MfgDateFlag}
                                    value={MfgDate}
                                    minDate={minDate}
                                    // defaultValue="2017-05-24"
                                    className="textFieldDate"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />

                                  <TextField
                                    id="ExpDate"
                                    label="Expiry Date"
                                    type="date"
                                    name="ExpDate"
                                    error={ExpDateFlag}
                                    value={ExpDate}
                                    defaultValue="2017-05-24"
                                    className="textFieldDate"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(e) => this.handleInputChangeProductSell(e)}
                                  />

                                  <div className="buttons">
                                    <button className="submitbtn1"
                                      onClick={(e) => this.handleProductOrderSubmit(e)}
                                    >Submit</button>
                                    <button className="cancelbhn">Cancel</button>
                                  </div>

                                </form>
                              </div>
                            </div>


                          </div>
                        </>

                      }
                    </>

                  }

                  {/* {ProductSellFlag &&

                    <>
                      {paymentPage &&
                       

                            <div className="plusContent">
                          <div className="plusContent_subPayment">
                            <div className="sportstitlePlus">Payment Details</div>
                            <div>
                              <form className="form">
                                <select className="TextField2"
                                  name="PaymentModeSelect"
                                  variant="outlined"
                                  size="small"
                                  id="PaymentModeSelect"
                                  style={{ margin: 20 }}
                                  error={SportNameFlag}
                                  value={PaymentModeSelect}
                                  onChange={(e) => this.handleInputChangePayment(e)}
                                >

                                  <option value="" disabled selected >Select Payment Mode</option>
                                  <option value="Debit"  >Debit</option>
                                  <option value="Credit"  >Credit</option>
                                  <option value="UPI"  >UPI</option>
                                  <option value="NetBanking"  >NetBanking</option>
                                  <option value="COD"  >COD</option>


                                  {Array.isArray(props.Listsport) && props.List.length > 0
                                                && props.Listsport.map(function (ele, ind) {
                                                    return (
                                                        <>
                                                            <option key={ind} value={ele.sportsName}>{ele.sportsName}</option>
                                                        </>
                                                    )
                                                })}


                                </select>

                                <div className="buttons">
                                  <button className="submitbtn1"
                                    onClick={(e) => this.handleSubmitDetailsPaymentDetails(e)}
                                  >Submit</button>
                                  <button className="cancelbhn">Cancel</button>
                                </div>

                              </form>
                            </div>
                          </div>
                        </div>}

                    </>


                  } */}

                  {FeedbackFlag &&
                    <>
                      <div className="GetUserMenus-SubContainerAdmin">
                        <TableContainer component={Paper}>
                          <Table className="tableDeliveryboy" aria-label="simple table">

                            <>
                              <TableHead></TableHead>
                              <TableHead>
                                <TableRow>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 50, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Id
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                  >
                                    User Name
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Mobile Number
                                  </TableCell>
                                  <TableCell
                                    align="Center"
                                    style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                  >
                                    Review
                                  </TableCell>

                                </TableRow>
                              </TableHead>
                            </>

                            <TableBody>
                              {FeedBackDetails?.length > 0
                                ? FeedBackDetails.map((data, index) => {
                                  return (
                                    <TableRow >

                                      <>
                                        <TableCell align="Center" style={{ width: 200 }}>
                                          {data.id}
                                        </TableCell>
                                        <TableCell align="Center" style={{ width: 200 }}>
                                          {data.user.firstName}
                                        </TableCell>
                                        <TableCell align="Center" style={{ width: 100 }}>
                                          {data.mobileNumber}
                                        </TableCell>
                                       
                                        <TableCell align="Center" style={{ width: 100 }}>
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
                    </>}

                  {MyOrder &&
                    <>

                      <div className="GetUserMenus-SubContainer mt-3">
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



                                </TableRow>
                              </TableHead>
                            </>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <TableBody>
                              {/* {MyOrderData.length > 0
                                ? MyOrderData.map((data, index) => {
                                  return ( */}
                              <TableRow >
                                {/* {props.State === "UserHome" ? ( */}
                                <>
                                  <TableCell align="center" style={{ width: 200 }}>
                                    {/* {data.id}  */}
                                    123
                                  </TableCell>
                                  <TableCell align="center" style={{ width: 200 }}>
                                    {/* {data.tiffinPlan.planName} */}
                                    1234
                                  </TableCell>
                                  <TableCell align="center" style={{ width: 100 }}>
                                    {/* <img className="bannerurl" src={data.tiffinPlan.bannerUrl} alt="Girl in a jacket" /> */}
                                    123
                                  </TableCell>
                                  <TableCell align="center" style={{ width: 100 }}>
                                    {/* {data.totalDays} */}123
                                  </TableCell>
                                  <TableCell align="center" style={{ width: 100 }}>
                                    {/* {moment(data.startFrom).format("DD-MM-YYYY").toString()} */}
                                    1324
                                  </TableCell>
                                  <TableCell align="center" style={{ width: 100 }}>
                                    {/* {moment(data.endTo).format("DD-MM-YYYY").toString()} */}123

                                  </TableCell>
                                  <TableCell align="center" style={{ width: 100 }}>
                                    {/* {data.bookedBy.firstName} */}1223
                                  </TableCell>

                                  {/* <TableCell align="center" style={{ width: 100 }}>
                                          {data.totalPrice}1213132314
                                        </TableCell> */}

                                </>
                                {/* ) : ( */}
                                <></>
                                {/* )} */}
                              </TableRow>
                              {/* );
                                })
                                : null} */}
                            </TableBody>
                          </Table>
                        </TableContainer>


                      </div>

                      <Modal
                        open={this.state.OpenFeedback}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                        className="Model-Create-Feedback"
                      >
                        <Fade in={this.state.OpenFeedback}>
                          <div className="Model-Create-Feedback-Main">
                            <div className="Model-Create-Feedback-Header">
                              {/* <div className="Model-Create-Feedback-Header-Text"> */}
                              Send Your Feedback
                              {/* </div> */}
                            </div>
                            <div className="Model-Create-Feedback-Body">
                              <TextField
                                id="outlined-basic"
                                label="Feedback"
                                name="Feedback"
                                variant="outlined"
                                style={{ width: "100%" }}
                                multiline
                                rows={10}
                                size="small"
                                error={FeedbackFlag}
                                value={Feedback}
                                onChange={this.handleChanges}
                              />
                            </div>
                            <div className="Model-Create-Feedback-Footer">
                              <Button
                                variant="contained"
                                style={{ margin: "10px" }}
                                onClick={() => {
                                  this.handleClose();
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  this.InsertFeedback();
                                }}
                              >
                                Send
                              </Button>
                            </div>
                          </div>
                        </Fade>
                      </Modal>

                      <Pagination
                        className="Pagination"
                        count={this.state.TotalPages}
                        Page={this.state.PageNumber}
                        onChange={(e) => this.handlePaging(e, this.state.TotalPages)}
                        variant="outlined"
                        shape="rounded"
                        color="secondary"
                      />
                    </>
                  }

                </div>



              </div>
            </div>
          </div>

          <div className="FooterDiv">Footer</div>
        </div>
        <Backdrop
          style={{ zIndex: "1", color: "#fff" }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false });
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={OpenSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackBarClose}
          message={Message}
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
