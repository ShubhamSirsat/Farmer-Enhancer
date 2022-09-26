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

export default class ExporterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

            QuantityVehicle: "",
            QuantityVehicleFlag: false,
            FeedBack: "",
            OpenFeedback: false,
            Message: "",
            BordingPoint: "",
            BordingPointFlag: false,
            DroppingPoint: "",
            DroppingPointFlag: false,
            QuantitySeed: "",
            QuantityFlag: false,
            UnitSeed: "",
            UnitSeedFlag: false,
            NumberOfRecordPerPage: 6,
            RequestGoodsFlag: false,
            ProductNameExproter: "",
            ProductNameExproterFlag: false,
            QuantityExporterFarFlag: false,
            QuantityExporterFar: "",
            //
            PageNumber: 0,
            //
            TotalPages: 0,
            TotalRecords: 0,

            Open: false, // Flag For Open Feedback
            OpenLoader: false,
            Feedback: "",
            OpenSnackBar: false,

            Update: false,

            ProductListFlag: true,

            SeedDetailsFlag: false,
            MyOrder: false,
            OpenMyOrder: false,
            Address: "",
            SelectArea: "",
            MyOrderData: [],
            TiffinData: [],

            ExporterNameFlag: false,
            ExporterAddressFlag: false,
            ExporterPhoneNoFlag: false,
            ExporterEmailFlag: false,
            MfgDateFlag: false,
            ExporterName: "",
            ExporterAddress: "",
            ExporterPhoneNo: "",
            ExporterEmail: "",
            MfgDate: "",
            ExpDate: "",
            ExpDateFlag: false,
            ProductType: "",
            ProductTypeFlag: false,
            VehicalNeed: "",
            VehicalNameFlag: false,
            VehicalName: "",
            ExporterPhoneNoVehicle: "",
            ExporterPhoneNoVehicleFlag: false,
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
            SaveOrderId: 0,
            SaveMobileNumber: "",

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


            ExporterNameFlag: false,
            ProductListData: [],
            OrderDetailsFarmer: []
        };
    }

    componentWillMount() {
        this.GetAllAdminProductList()

    }









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

        if (state.MyOrder) {
            await this.GetAllAdminProductList(value);
        }
    };

    SignOut = async () => {
        await localStorage.removeItem("token");

        this.props.history.push("/SignIn");
    };

    //
    handleProductListFlag = () => {


        this.setState({
            ProductListFlag: true,
            ProductSellFlag: false,
            SeedDetailsFlag: false,
            RequestGoodsFlag: false,
            MyOrder: false,
            OpenCard: false,
        });


    };

    handleRequestgoodsFlag = () => {
        this.setState({
            ProductListFlag: false,
            ProductSellFlag: false,
            SeedDetailsFlag: false,
            MyOrder: false,
            RequestGoodsFlag: true
        })
    }


    handleMyOrder = () => {
        this.setState({
            ProductListFlag: false,
            ProductSellFlag: false,
            SeedDetailsFlag: false,
            RequestGoodsFlag: false,
            MyOrder: true,
            OpenCard: false,
        });
        this.GetAllOrdersFarmer(this.state.PageNumber)
    }
    //
    handleOpenCartNav = () => {
        console.log("Handle Open Cart Nav Calling .....");

        localStorage.setItem("ProductListFlag", false);
        localStorage.setItem("OpenCart", true);

        this.setState({
            PageNumber: 1,
            ProductListFlag: false,
            OpenCard: true,
        });

        this.GetAllCardDetails(this.state.PageNumber);
    };





    handleInputChangeVehicle = (e) => {
        this.setState({
            VehicalNeed: e.target.value
        })
    }




    handleOpenFeedbackModel = (id, mobile) => {
        this.setState({
            OpenFeedback: true,
            SaveOrderId: id,
            SaveMobileNumber: mobile
        });
    };

    InsertFeedback = () => {
        let ExpoterId = localStorage.getItem("ExpoterId")
        let data = {
            "userId": parseInt(ExpoterId),
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
                        OpenSnackBar: true,
                        OpenFeedback: false,
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

    handleInputChangePayment = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("e.target.namepayment", e.target.value))
    }
    handleClose = () => {
        this.setState({ OpenFeedback: false });
    };

    disablePrevDates = (date) => {
        return date?.getDay() === 0;
    }

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
            OrderDetails: false,
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
        let ExpoterId = localStorage.getItem("ExpoterId")
        this.CheckValidationProductBuySeed()
        let UserId = localStorage.getItem('UserId')
        var TotalPrice = parseInt(this.state.SaveSeedPrice) * parseInt(this.state.UnitSeed);
        var TotalPriceVehicle = parseInt(this.state.PriceVehicle) * parseInt(this.state.NoOfDays)

        this.setState({
            TotalPrice: TotalPriceVehicle
        })

        let data = {

            "userId": parseInt(ExpoterId),
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

    GetAllOrdersFarmer = (CurrentPage) => {
        let ExpoterId = localStorage.getItem("ExpoterId")
        let data = {
            "page": CurrentPage,
            "size": 15
        }
        authServices
            .AllOrdersFarmer(ExpoterId, data)
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


    handleChangesFeedback = (e) => {
        this.setState({
            Feedback: e.target.value
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    SaveExporterDemand = (CurrentPage) => {
        let ExpoterId = localStorage.getItem("ExpoterId")
        let data = {
            "userID": parseInt(ExpoterId),
            "quentity": parseInt(this.state.QuantityExporterFar),
            "productType": "CROPS",
            "productName": this.state.ProductNameExproter.toString()
        }
        this.setState({ OpenLoader: true, })
        authServices
            .SaveExporterDemand(data)
            .then((data) => {

                debugger
                console.log("GetUserAppointments Data : ", data);
                // debugger
                if (data.data.data !== null) {

                    this.setState({
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

   

    render() {
        const { QuantitySeedFlag, QuantitySeed, UnitSeedFlag, UnitSeed, BordingPoint, BordingPointFlag, DroppingPoint, DroppingPointFlag, QuantityVehicle, QuantityVehicleFlag,
            ExporterEmailFlag, MfgDate, MfgDateFlag, Address, SelectArea, ProductListFlag, TiffinData, MyOrderData, OrderDetailsFarmer, ExpDateFlag,
            OpenSnackBar, Message, ProductSellFlag, SeedDetailsFlag, MyOrder, OrderDate, ProductTypeFlag, ProductType, VehicalNeed,
            ProductListData, OrderPrice, OrderPriceFlag, Ordername, OrdernameFlag, OrderDetails, VehicalNameFlag, VehicalName, ExporterPhoneNoVehicle, ExporterPhoneNoVehicleFlag,
            NoOfDays, NoOfDaysFlag, TotalPrice, PriceVehicle, PriceVehicleFlag, FeedbackFlag, Feedback, RequestGoodsFlag,
            ProductNameExproter, ProductNameExproterFlag, QuantityExporterFarFlag, QuantityExporterFar, TotalDays, TotalDaysFlag, BookedBy, BookedByFlag, TiifinPanIdFlag, TiifinPanId
            , paymentPage, PaymentModeSelect, CardNumber, CardNumberFlag, CVVDetailsFlag, CVVDetails, ExpiryDateCardFlag, ExpiryDateCard } = this.state
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
                                    Farmer Enhancer (Exporter)

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

                                    <div className="NavButtonText">Product Details </div>
                                </div>
                                <div
                                    className={RequestGoodsFlag ? "NavButton1" : "NavButton2"}
                                    onClick={() => {
                                        this.handleRequestgoodsFlag();
                                    }}
                                >
                                    <div className="NavButtonText">Request Goods</div>
                                </div>

                                <div
                                    className={MyOrder ? "NavButton1" : "NavButton2"}
                                    onClick={() => {
                                        this.handleMyOrder();
                                    }}
                                >
                                    {/* <IconButton edge="start" className="NavBtn" color="inherit">
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton> */}
                                    <div className="NavButtonText">My Orders</div>
                                </div>

                            </div>
                            <div className="SubBody22">
                                <div className="bodyContent" >
                                    {ProductListFlag &&
                                        <>

                                            {OrderDetails ?
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
                                                                    {ProductListData?.length > 0
                                                                        ? ProductListData.map((data, index) => {
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
                                                                                                {/* <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeletetiffin(data.id)} /> */}
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


                                                </>
                                                :
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
                                                                            label="Quantity"
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


                                        </>

                                    }

                                    {RequestGoodsFlag &&
                                        <>
                                            <div className="plusContent">
                                                <div className="plusContent_sub">
                                                    <div className="sportstitlePlus">Expoter Details</div>
                                                    <div>
                                                        <form className="form">

                                                            <TextField

                                                                className="TextField1"
                                                                name="ProductNameExproter"
                                                                label="Product Name"
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ margin: 20 }}
                                                                error={ProductNameExproterFlag}
                                                                value={ProductNameExproter}
                                                                onChange={(e) => this.handleInputChange(e)}
                                                            />
                                                            <TextField
                                                                type="number"
                                                                className="TextField1"
                                                                name="QuantityExporterFar"
                                                                label="Quantity"
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ margin: 20 }}
                                                                error={QuantityExporterFarFlag}
                                                                value={QuantityExporterFar}
                                                                onChange={(e) => this.handleInputChange(e)}
                                                            />

                                                            <div className="buttons">
                                                                <button className="submitbtn1"
                                                                    onClick={(e) => this.SaveExporterDemand(e)}
                                                                >Submit</button>
                                                                <button className="cancelbhn">Cancel</button>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>


                                            </div>
                                        </>}






                                    {SeedDetailsFlag &&
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
                                                                        Seed Name
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
                                                                        ExporterPhoneNo
                                                                    </TableCell>
                                                                    <TableCell
                                                                        align="Left"
                                                                        style={{ width: 100, fontWeight: 600, fontSize: 15 }}
                                                                    >
                                                                        ExporterEmail
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
                                                                </TableRow>
                                                            </TableHead>
                                                        </>

                                                        <TableBody>
                                                            {TiffinData?.length > 0
                                                                ? TiffinData.map((data, index) => {
                                                                    return (
                                                                        <TableRow >

                                                                            <>
                                                                                <TableCell align="Left" style={{ width: 200 }}>
                                                                                    {data.id}
                                                                                </TableCell>
                                                                                <TableCell align="Left" style={{ width: 200 }}>
                                                                                    {data.planName}
                                                                                </TableCell>
                                                                                <TableCell align="Left" style={{ width: 100 }}>
                                                                                    <img className="bannerurl" src={data.bannerUrl} alt="Girl in a jacket" />
                                                                                </TableCell>
                                                                                <TableCell align="Left" style={{ width: 100 }}>
                                                                                    {data.pricePerDay}
                                                                                </TableCell>
                                                                                <TableCell align="Left" style={{ width: 100 }}>
                                                                                    {data.description}
                                                                                </TableCell>
                                                                                <TableCell align="Left" style={{ width: 100 }}>
                                                                                    <div className="icons">
                                                                                        <Button className="showDetialsbtn" size="small" onClick={() => this.handleShowDetails(data.id)}>Order</Button>
                                                                                        {/* <CreateIcon style={{ cursor: "pointer" }} onClick={()=>this.handleEditTiffin(data.id,data.planName,data.bannerUrl,data.pricePerDay,data.description)} /> */}
                                                                                        {/* <DeleteIcon style={{ cursor: "pointer" }} onClick={() => this.handledeletetiffin(data.id)} /> */}
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
                                                                onChange={this.handleChangesFeedback}
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
            </div >
        );
    }
}
