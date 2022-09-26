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

export default class FarmerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //

      fdata: new FormData(),
      OpenFeedback: false,
      SaveOrderId: 0,
      SaveMobileNumber: "",
      Message: "",
      NumberOfRecordPerPage: 6,
      PageNumber: 0,
      TotalPages: 0,
      TotalRecords: 0,
      OpenLoader: false,
      OpenSnackBar: false,
      ProductListFlag: true,
      SeedDetailsFlag: false,
      RequestGoodsFlag: false,
      MyOrder: false,
      seedOrderBuy: true,
      SeedData: [],
      MyOrderData: [],
      FarmerData: [],
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
      OrderDetails: true,
      FromDate: "",
      Feedback: "",
      FromDateFlag: false,
      ToDate: "",
      ToDateFlag: false,
      TotalDays: "",
      TotalDaysFlag: false,
      BookedBy: "",
      BookedByFlag: false,
      FeedBackPage: false,
      paymentPage: true,
      PaymentModeSelect: "",
      FeedbackFlag: false,
      FeedBack: "",
      orderId: "",
      TiffinIDPlan: "",
      OpenCard: false,
      BordingPoint: "",
      BordingPointFlag: false,
      DroppingPoint: "",
      DroppingPointFlag: false,
      SaveSeedId: 0,
      SaveSeedPrice: 0,
      OrderDetailsFarmer: [],
      requestedGoodsDetails:[],
      FeedBackDetails: [],
      QuantitySeed: "",
      QuantityFlag: false,
      UnitSeed: "",
      UnitSeedFlag: false
    };
  }

  componentWillMount() {
    this.GetAllFarmerData(this.state.PageNumber)

  }

  handlePluseIcon = () => {
    this.setState({
      OrderDetails: false
    })
  }

  handleChangesFeedback = (e) => {
    this.setState({
      Feedback: e.target.value
    })
  }


  GetAllFarmerData = (CurrentPage) => {
    let FamerId = localStorage.getItem("FarmerID")
    let data = {
      "page": CurrentPage,
      "size": 16
    }
    authServices
      .GetAllFarmerData(FamerId, data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            FarmerData: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
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



  ////////////////////////////////////////////////////


  handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ OpenSnackBar: false });
  };

  handlePaging = async (e, value) => {
    const { ProductListFlag, SeedDetailsFlag, RequestGoodsFlag, FeedbackFlag } = this.state
    console.log("Current Page : ", value);

    this.setState({
      PageNumber: value,
    });

    if (ProductListFlag) {
      await this.GetAllFarmerData(value);
    }
    if (SeedDetailsFlag) {
      await this.GetAllSeedDetails(value);
    }
    if(RequestGoodsFlag){
       await this.getAllExporterDetails(this.state.PageNumber)
    }
  };


  SignOut = async () => {
    await localStorage.removeItem("token");
    this.props.history.push("/SignIn");
  };

  handledeleteAdmin = (id) => {
    authServices

      .DeleteOrderExporter(id)
      .then((data) => {
        console.log("filedata : ", data);
        debugger
        if (data.data !== null) {

          this.setState({
            OpenLoader: false,
            OpenSnackBar: true,
            Message: data.data.message
          });
          this.GetAllOrdersFarmer(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

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
          this.GetAllFarmerData(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }


  
  //////////////////////////////////////////


  handleProductListFlag = () => {

    this.setState({
      ProductListFlag: true,
      SeedDetailsFlag: false,
      FeedBackPage: false,
      MyOrder: false,
      OpenCard: false,
      RequestGoodsFlag: false
    });

    this.GetAllFarmerData(this.state.PageNumber);
  };


  handleSeedDetailsFlag = () => {
    this.setState({
      ProductListFlag: false,
      ProductSellFlag: false,
      SeedDetailsFlag: true,
      FeedBackPage: false,
      MyOrder: false,
      RequestGoodsFlag: false
      // OpenCard: false,
    });
    this.GetAllSeedDetails(this.state.PageNumber)
  }

  handleMyOrder = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: true,
      FeedBackPage: false,
      OpenCard: false,
      RequestGoodsFlag: false
    });
    this.GetAllOrdersFarmer(this.state.PageNumber)
  }

  handleFeedback = () => {
    this.setState({
      ProductListFlag: false,
      SeedDetailsFlag: false,
      MyOrder: false,
      FeedBackPage: true,
      RequestGoodsFlag: false

     
    });
    this.GetallFeedbackUser(this.state.PageNumber)
  }


  handleRequestgoodsFlag = () => {
    this.setState({
        ProductListFlag: false,
        ProductSellFlag: false,
        SeedDetailsFlag: false,
        MyOrder: false,
        RequestGoodsFlag: true
    })
    this.getAllExporterDetails(this.state.PageNumber)
}
  ////////////////////////////////////////////////////



  handleSubmitAddress = (e) => {
    e.preventDefault()
    debugger


    this.isValidHandler()
    // let UserId = localStorage.getItem("UserId")
    let data = {
      "id": null,
      "address": this.state.Address.toString(),
      "area": this.state.SelectArea.toString().toUpperCase(),
      "pin": "string"
    }
    authServices
      .SaveAddressUser(data)
      .then((data) => {
        debugger
        console.log("data : ", data);
        if (data.data.success) {
          this.setState({

            Address: "",
            SelectArea: "",
            OpenSnackBar: true,
            Message: data.data.message

          })


        } else {
          console.log("Sign Up Failed");
          this.setState({ open: true, Message: data.message });
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        this.setState({ open: true, Message: "Something Went Wrong" });
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


    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }
  //////////////////////////////////////////////////////////////



  CheckValidationProductSell = () => {
    const { ProdtName, ProductPrice, Quantity, Unit, MfgDate, ExpDate, ProductType, VehicalNeed, VehicalName, QuantityVehicle, PriceVehicle, NoOfDays } = this.state
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
    let FarmerID = localStorage.getItem("FarmerID")
    this.CheckValidationProductSell()
    let fdataa = new FormData();

    fdataa.append("unit", parseInt(this.state.Unit));
    fdataa.append("userId", parseInt(FarmerID));
    fdataa.append("productType", "CROPS")
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
          this.GetAllFarmerData(this.state.PageNumber)
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }

  ///////////////////////////////////////////////////////////////////

  handleInputChangeProductBuySeed = (e) => {
    if (e.target.name === "QuantitySeed") {
      this.setState({
        QuantitySeed: e.target.value,
        QuantitySeedFlag: false
      })
    }
    if (e.target.name === "UnitSeed") {
      this.setState({
        UnitSeed: e.target.value,
        UnitSeedFlag: false
      })
    }
    if (e.target.name === "VehicalNeed") {
      this.setState({
        VehicalNeed: e.target.value,

      })
      document.getElementById("VehicalNeed").classList.remove('validation')

    }

    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))

  }

  handleInputChangeVehicleData = (e) => {

    let val = e.target.value
    let name = e.target.name
    if (this.state.VehicalNeed === "Yes") {
      if (name === "VehicalName") {
        this.setState({
          VehicalName: val,
          VehicalNameFlag: false
        })
      }
      if (name === "QuantityVehicle") {
        this.setState({
          QuantityVehicle: val,
          QuantityVehicleFlag: false
        })
      }
      if (name === "NoOfDays") {
        this.setState({
          NoOfDays: val,
          NoOfDaysFlag: false
        })
      }
      if (name === "PriceVehicle") {
        this.setState({
          PriceVehicle: val,
          PriceVehicleFlag: false,
        })
      }
      if (name === "BordingPoint") {
        this.setState({
          BordingPoint: val,
          BordingPointFlag: false,
        })
      }
      if (name === "DroppingPoint") {
        this.setState({
          DroppingPoint: val,
          DroppingPointFlag: false,
        })
      }
    }

  }
  handleInputChangeVehicle = (e) => {
    this.setState({
      VehicalNeed: e.target.value
    })
  }

  handleSeedOrderDetails = (id, price) => {
    this.setState({
      seedOrderBuy: false,
      SaveSeedId: id,
      SaveSeedPrice: price
    })
  }

  CheckValidationProductBuySeed = () => {
    const { QuantitySeed, UnitSeed, VehicalNeed, VehicalName, QuantityVehicle, PriceVehicle, NoOfDays, BordingPoint, DroppingPoint } = this.state
    console.log("CheckValidation Calling...");

    if (QuantitySeed === "") {
      this.setState({
        QuantitySeedFlag: true
      })
    }
    if (UnitSeed === "") {
      this.setState({
        UnitSeedFlag: true
      })
    }
    if (VehicalNeed === "") {
      document.getElementById("VehicalNeed").classList.add('validation')
    }

    if (VehicalNeed === "Yes") {
      if (VehicalName === "") {
        this.setState({
          VehicalNameFlag: true
        })
      }
      if (QuantityVehicle === "") {
        this.setState({
          QuantityVehicleFlag: true
        })
      }
      if (PriceVehicle === "") {
        this.setState({
          PriceVehicleFlag: true
        })

      }
      if (NoOfDays === "") {
        this.setState({
          NoOfDaysFlag: true
        })
      }
      if (BordingPoint === "") {
        this.setState({
          BordingPointFlag: true
        })
      }
      if (DroppingPoint === "") {
        this.setState({
          DroppingPointFlag: true
        })
      }
    }
  }

  handleSeedOrderSubmit = (e) => {
    e.preventDefault();
    debugger
    let FarmerID = localStorage.getItem("FarmerID")
    this.CheckValidationProductBuySeed()
    let UserId = localStorage.getItem('UserId')
    var TotalPrice = parseInt(this.state.SaveSeedPrice) * parseInt(this.state.UnitSeed);
    var TotalPriceVehicle = parseInt(this.state.PriceVehicle) * parseInt(this.state.NoOfDays)

    this.setState({
      TotalPrice: TotalPriceVehicle
    })

    let data = {

      "userId": parseInt(FarmerID),
      "productId": this.state.SaveSeedId,
      "quantity": parseInt(this.state.QuantitySeed),
      "unit": parseInt(this.state.UnitSeed),
      "price": parseInt(this.state.SaveSeedPrice),
      "totalPrice": parseInt(TotalPrice),
      "paymentStatus": true,
      "haveVehicle": this.state.VehicalNeed === "Yes" ? true : false,
      "vehicleDetails": this.state.VehicalNeed === "Yes" ? ({
        "vehicleName": this.state.VehicalName.toString(),
        "quantity": parseInt(this.state.QuantityVehicle),
        "price": parseInt(this.state.PriceVehicle),
        "noOfDays": parseInt(this.state.NoOfDays),
        "totalPrice": parseInt(TotalPriceVehicle),
        "isRequired": true,
        "boardingPoint": this.state.BordingPoint.toString(),
        "droppingPoint": this.state.DroppingPoint.toString()
      }) : null


    }
    this.setState({ OpenLoader: true })
    authServices
      .PlaceOrder(data)
      .then((data) => {

        this.setState({
          paymentPage: false,
          FromDate: "",
          tiffinPlan: "",
          ToDate: "",
          TotalDays: "",
          BookedBy: "",
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.data.message,
          orderId: data.data.data.id
        })

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });


  }

  handleInputChangePayment = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.namepayment", e.target.value))
  }

  handleSubmitDetailsPaymentDetails = (e) => {
    if (this.state.PaymentModeSelect !== "")
      this.setState({
        OpenSnackBar: true,
        Message: "Payment Successful"
      })

  }

  //////////////////////////////////////////////////////////////////////

  GetAllOrdersFarmer = (CurrentPage) => {
    let FarmerID = localStorage.getItem("FarmerID")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .AllOrdersFarmer(FarmerID, data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            OrderDetailsFarmer: data.data.data.content,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }


  getAllExporterDetails = (CurrentPage) => {
    let FarmerID = localStorage.getItem("FarmerID")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .getAllExporterDetails(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            requestedGoodsDetails: data.data.data,

            OpenLoader: false,
          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }




  
  handleOpenFeedbackModel = (id, mobile) => {
    this.setState({
      OpenFeedback: true,
      SaveOrderId: id,
      SaveMobileNumber: mobile
    });
  };

  InsertFeedback = () => {
    let FarmerID = localStorage.getItem("FarmerID")
    let data = {
      "userId": parseInt(FarmerID),
      "productId": parseInt(this.state.SaveOrderId),
      "mobileNumber": this.state.SaveMobileNumber,
      "rating": 5,
      "review": this.state.Feedback
    }
    authServices
      .InsertFeedback(data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        // debugger
        if (data.data.data !== null) {

          this.setState({
            OpenFeedback: false,
            OpenSnackBar: true,
            Message: data.data.message,
            OpenLoader: false,

          });
        }
      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });

  }


  GetallFeedbackUser = (CurrentPage) => {
    let FarmerID = localStorage.getItem("FarmerID")
    let data = {
      "page": CurrentPage,
      "size": 15
    }
    authServices
      .GetallFeedbackUser(FarmerID, data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        this.setState({
          FeedBackDetails: data.data.data.content
        })

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
  }






  CheckValidationMyOrder = () => {
    const { Ordername, OrderDate, OrderPrice } = this.state
    if (Ordername === "") {
      this.setState({
        OrdernameFlag: true
      })
    }
    if (OrderDate === "") {
      this.setState({
        OrderDateFlag: true
      })
    }
    if (OrderPrice === "") {
      this.setState({
        OrderPriceFlag: true
      })
    }

  }
  handleInputChangeMyorder = (e) => {

    let val = e.target.value
    if (e.target.name === "Ordername") {
      this.setState({
        Ordername: e.target.value,
        OrdernameFlag: false
      })
    }
    if (e.target.name === "OrderDate") {
      this.setState({
        OrderDate: e.target.value,
        OrderDateFlag: false
      })

    }
    if (e.target.name === "OrderPrice") {
      this.setState({
        OrderPrice: e.target.value,
        OrderPriceFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))
  }



  handleOrderDetailsPage = (e) => {
    const { FromDate, ToDate, TotalDays, BookedBy, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
    if (e.target.name === "FromDate") {
      this.setState({
        FromDate: e.target.value,
        FromDateFlag: false
      })
    }
    if (e.target.name === "ToDate") {
      this.setState({
        ToDate: e.target.value,
        ToDateFlag: false

      })
    }
    if (e.target.name === "TiifinPanId") {
      this.setState({
        TiifinPanId: e.target.value,
        TiifinPanIdFlag: false

      })
    }
    if (e.target.name === "TotalDays") {
      this.setState({
        TotalDays: e.target.value,
        TotalDaysFlag: false
      })
    }
    if (e.target.name === "BookedBy") {
      this.setState({
        BookedBy: e.target.value,
        BookedByFlag: false
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("e.target.name", e.target.value))





  }

  CheckValidationOrderDetails = () => {
    const { FromDate, ToDate, TotalDays, BookedBy, TiifinPanId, TotalDaysFlag, BookedByFlag, ToDateFlag, FromDateFlag } = this.state;
    if (FromDate === "") {
      this.setState({
        FromDateFlag: true
      })
    }
    if (ToDate === "") {
      this.setState({
        ToDateFlag: true
      })
    }
    if (TiifinPanId === "") {
      this.setState({
        TiifinPanIdFlag: true
      })
    }

    if (TotalDays === "") {
      this.setState({
        TotalDaysFlag: true
      })
    }
    if (BookedBy === "") {
      this.setState({
        BookedByFlag: true
      })
    }

  }

  handleSubmitDetails = (e) => {

    e.preventDefault();
    debugger
    this.CheckValidationOrderDetails()
    let UserId = localStorage.getItem('UserId')
    var date1 = new Date(this.state.FromDate);
    var date2 = new Date(this.state.ToDate);
    var diffDays = date2.getDate() - date1.getDate();
    this.setState({
      TotalDays: diffDays
    })
    console.log("diddfff", diffDays)
    let data = {
      "tiffinPlanId": parseInt(this.state.TiffinIDPlan),
      "bookedBy": parseInt(UserId),
      "startFrom": moment(this.state.FromDate).format("YYYY-MM-DD").toString(),
      "endTo": moment(this.state.ToDate).format("YYYY-MM-DD").toString(),
      "numberOfDays": parseInt(diffDays)
    }
    this.setState({ OpenLoader: true })
    authServices
      .SaveOrders(data)
      .then((data) => {

        this.setState({
          // paymentPage: false,
          FromDate: "",
          tiffinPlan: "",
          ToDate: "",
          TotalDays: "",
          BookedBy: "",
          OpenLoader: false,
          OpenSnackBar: true,
          Message: data.data.message,
          orderId: data.data.data.id
        })

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });



  }




  handleShowDetails = (id) => {
    this.setState({
      OrderDetails: false,
      TiffinIDPlan: id
    })

  }



  handleClose = () => {
    this.setState({ OpenFeedback: false });
  };

  disablePrevDates = (date) => {
    return date?.getDay() === 0;
  }





  filechangehandler = (e) => {
    console.log("filename", e.target.files)
    this.setState({
      fdata: e.target.files[0],
      forceUpdate: !this.state.forceUpdate
    })

  }
  pendingREquesthandle=(id)=>{
    

    let FarmerID = localStorage.getItem("FarmerID")
    let data = {
      "isPending": false,
      "exportProductID": parseInt(id)
    }
    authServices
      .UpdateExporterStatus( data)
      .then((data) => {
        console.log("GetUserAppointments Data : ", data);
        this.setState({
          OpenSnackBar: true,
          Message:data.data.message
        })

        this.getAllExporterDetails(this.state.PageNumber)

      })
      .catch((error) => {
        console.log("GetUserAppointments Error : ", error);
        this.setState({ OpenLoader: false });
      });
    
  }

  
  render() {
    const { ProdtNameFlag, ProdtName, ProductPriceFlag, ProductPrice, Quantity, QuantityFlag, Unit, QuantitySeedFlag, QuantitySeed, UnitSeedFlag, UnitSeed,
      seedOrderBuy, CardNumber, CardNumberFlag, CVVDetailsFlag, CVVDetails, ExpiryDateCardFlag,requestedGoodsDetails, ExpiryDateCard, SeedData, OrderDetailsFarmer,
      UnitFlag, MfgDate, MfgDateFlag, ProductListFlag, FarmerData, ExpDate, ExpDateFlag, BordingPoint, BordingPointFlag, DroppingPoint, DroppingPointFlag,
      OpenSnackBar, Message, SeedDetailsFlag, MyOrder, RequestGoodsFlag, VehicalNeed, OrderDetails, VehicalNameFlag, VehicalName, QuantityVehicle, QuantityVehicleFlag, FeedBackDetails,
      NoOfDays, NoOfDaysFlag, TotalPrice, PriceVehicle, PriceVehicleFlag, FeedbackFlag, Feedback, FeedBackPage, PaymentModeSelect, paymentPage } = this.state
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
                  Farmer Enhancer (Farmer)

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
                  className={ProductListFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleProductListFlag();
                  }}
                >
                  <div className="NavButtonText">Product Details </div>
                </div>

                <div
                  className={SeedDetailsFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleSeedDetailsFlag();
                  }}
                >
                  <div className="NavButtonText">Seed Details</div>
                </div>
                <div
                  className={RequestGoodsFlag ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleRequestgoodsFlag();
                  }}
                >
                  <div className="NavButtonText">Requested Goods</div>
                </div>

                <div
                  className={MyOrder ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleMyOrder();
                  }}
                >
                  <div className="NavButtonText">My Orders</div>
                </div>

                <div
                  className={FeedBackPage ? "NavButton1" : "NavButton2"}
                  onClick={() => {
                    this.handleFeedback();
                  }}
                >
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
                                        Product Name
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Image
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Product Price
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Quantity
                                      </TableCell>
                                      <TableCell
                                        align="Left"
                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                      >
                                        Unit
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
                                  {FarmerData?.length > 0
                                    ? FarmerData.map((data, index) => {
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
                                              {data.quantity}
                                            </TableCell>
                                            <TableCell align="Left" style={{ width: 100 }}>
                                              {data.unit}
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

                  {SeedDetailsFlag &&
                    <>
                      {seedOrderBuy ?
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
                                            <div className="icons">
                                              <Button className="submitbtn1" size="small" onClick={() => this.handleSeedOrderDetails(data.id, data.price)}>Order</Button>
                                              {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                            </div>

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
                        </div> :
                        <>
                          {paymentPage ?
                            <div className="plusContent">
                              <div className="plusContent_sub">
                                <div className="sportstitlePlus">Expoter Details</div>
                                <div>
                                  <form className="form">

                                    <TextField
                                      type="number"
                                      className="TextField1"
                                      name="QuantitySeed"
                                      label="Seed Quantity"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={QuantitySeedFlag}
                                      value={QuantitySeed}
                                      onChange={(e) => this.handleInputChangeProductBuySeed(e)}
                                    />
                                    <TextField
                                      type="number"
                                      className="TextField1"
                                      name="UnitSeed"
                                      label="Unit"
                                      variant="outlined"
                                      size="small"
                                      style={{ margin: 20 }}
                                      error={UnitSeedFlag}
                                      value={UnitSeed}
                                      onChange={(e) => this.handleInputChangeProductBuySeed(e)}
                                    />


                                    <select className="TextField2"
                                      name="VehicalNeed"
                                      variant="outlined"
                                      size="small"
                                      id="VehicalNeed"
                                      style={{ margin: 20 }}
                                      // error={SportNameFlag}
                                      value={VehicalNeed}
                                      onChange={(e) => this.handleInputChangeVehicle(e)}
                                    >

                                      <option value="" disabled selected >Vehical Need:</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>

                                    {
                                      VehicalNeed === "Yes" &&
                                      <>
                                        <TextField
                                          className="TextField1"
                                          name="VehicalName"
                                          label="Vehicle Name"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={VehicalNameFlag}
                                          value={VehicalName}
                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />
                                        <TextField
                                          type="number"
                                          className="TextField1"
                                          name="QuantityVehicle"
                                          label="Quantity "
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={QuantityVehicleFlag}
                                          value={QuantityVehicle}
                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />

                                        <TextField
                                          type="number"
                                          className="TextField1"
                                          name="PriceVehicle"
                                          label=" Vehicle Price"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={PriceVehicleFlag}
                                          value={PriceVehicle}
                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />
                                        <TextField
                                          type="number"
                                          className="TextField1"
                                          name="NoOfDays"
                                          label="No of Days"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={NoOfDaysFlag}
                                          value={NoOfDays}
                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />
                                        <TextField
                                          type="number"
                                          className="TextField1"
                                          name="TotalPrice"
                                          label="Total Price"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          // error={TotalPriceFlag}
                                          value={PriceVehicle * NoOfDays}
                                          disabled
                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />
                                        <TextField

                                          className="TextField1"
                                          name="BordingPoint"
                                          label="Bording Point"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={BordingPointFlag}
                                          value={BordingPoint}

                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />

                                        <TextField

                                          className="TextField1"
                                          name="DroppingPoint"
                                          label="Dropping Point"
                                          variant="outlined"
                                          size="small"
                                          style={{ margin: 20 }}
                                          error={DroppingPointFlag}
                                          value={DroppingPoint}

                                          onChange={(e) => this.handleInputChangeVehicleData(e)}
                                        />
                                      </>
                                    }


                                    <div className="buttons">
                                      <button className="submitbtn1"
                                        onClick={(e) => this.handleSeedOrderSubmit(e)}
                                      >Submit</button>
                                      <button className="cancelbhn">Cancel</button>
                                    </div>

                                  </form>
                                </div>
                              </div>


                            </div>

                            :



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
                                      // error={SportNameFlag}
                                      value={PaymentModeSelect}
                                      onChange={(e) => this.handleInputChangePayment(e)}
                                    >

                                      <option value="" disabled selected >Select Payment Mode</option>
                                      <option value="Debit"  >Debit</option>
                                      <option value="Credit"  >Credit</option>
                                      <option value="UPI"  >UPI</option>
                                      <option value="NetBanking"  >NetBanking</option>
                                      <option value="COD"  >COD</option>

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
                            </div>}</>}
                    </>}

                    {  RequestGoodsFlag &&
                    <>
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
                                      Product Name
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 115, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Product Type
                                    </TableCell>
                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                     Quentity
                                    </TableCell>

                                    <TableCell
                                      align="Left"
                                      style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                    >
                                      Status
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
                                {requestedGoodsDetails?.length > 0
                                  ? requestedGoodsDetails.map((data, index) => {
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
                                           {data.productType} 
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                            {data.quentity}
                                          </TableCell>
                                          <TableCell align="Left" style={{ width: 100 }}>
                                           {data.isPending === true ? "Pending":"Done"}

                                          </TableCell>
                                           <TableCell align="Left" style={{ width: 100 }}>
                                            <div className="icons">
                                            {data.isPending === true ? 
                                              <Button className="cancelbhn" size="small" onClick={() => this.pendingREquesthandle(data.id)}>Pending</Button>
                                              :     <Button className="submitbtn1" size="small">Done</Button>
                                            }
                                              {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                              {/* <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledel(data.id)} /> */}
                                            </div>

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
                                    Actions
                                  </TableCell>

                                </TableRow>
                              </TableHead>
                            </>
                            {/* ) : ( */}
                            <></>
                            {/* )} */}
                            <TableBody>
                              {OrderDetailsFarmer.length > 0
                                ? OrderDetailsFarmer.map((data, index) => {
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
                                          {/* {data.bookedBy.email}123 */}
                                          <Button
                                            variant="outlined"
                                            className="submitbtn1"
                                            onClick={() => {
                                              this.handleOpenFeedbackModel(data.id, data.user.mobileNumber);
                                            }}
                                          >
                                            Feedback
                                          </Button>


                                          <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeleteAdmin(data.id)} />


                                        </TableCell>
                                        {/* <TableCell align="center" style={{ width: 100 }}>
                                          {data.totalPrice}1213132314
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
                                onChange={(e) => this.handleChangesFeedback(e)}
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
                                // color="primary"
                                className="submitbtn1"
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

                  {FeedBackPage &&
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
                                    Feedback
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
