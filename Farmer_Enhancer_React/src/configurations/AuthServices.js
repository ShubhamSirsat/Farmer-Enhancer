import AxiosServices from "./AxiosServices";
let baseURL = "http://localhost:8080/"
// import Configurations from "../configurations/Configurations";
// import Auth from "../components/Auth";
// import AdminDashboard from "../components/Dashboard/AdminDashboard";
// import UserDashboard from "../components/Dashboard/UserDashBoard";

const axiosServices = new AxiosServices();

const headers = {
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
    // "cache-control": "no-cache",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const UserId = localStorage.getItem('UserId')

export default class AuthServices {
  SignUp(data) {
    return axiosServices.post(baseURL + "api/auth/register", data, false);
  }

  SignIn(data) {
    return axiosServices.post(baseURL + "api/auth/login", data, false);
  }

  AllAdminOrders(data) {
    return axiosServices.post(baseURL +`api/admin/all-orders`,data, true,headers);
  }
  
  AllCustomerAdminOrders(data) {
    return axiosServices.post(baseURL +`api/admin/all-users`,data, true,headers);
  }
  AllTrasportDetails(data) {
    return axiosServices.post(baseURL + `api/admin/all-transports`, data, true,headers);
  }
  AllAdminProductList(data) {
    return axiosServices.post(baseURL  + `api/admin/all-products`, data, true,headers);
  }
  FeedBackAdmin(data) {
    return axiosServices.post(baseURL + "api/feedback/all",  data, true,headers);
  }
  GetAllFarmerData(FarmerId,data) {
    return axiosServices.post(baseURL  + `api/farmer/my-products/${FarmerId}`,data,true,headers);
  }
  AddProductDetailsFarmer(data) {
    return axiosServices.post(baseURL + `api/farmer/common/add-product`, data, true,headers);
  }
  AllSeedDetails(data) {
    return axiosServices.post(baseURL+ `api/farmer/all-seeds`, data, true,headers);
  }
  PlaceOrder(data) {
    return axiosServices.post(baseURL + `api/farmer/common/place-order`, data, true,headers);
  }
  AllOrdersFarmer(UserId,data) {
    return axiosServices.post(baseURL  + `api/farmer/my-orders/${UserId}`, data, true,headers);
  }
  InsertFeedback(data) {
    return axiosServices.post(baseURL  + `api/feedback/save`,data, true,headers);
  }
  GetallFeedbackUser(UserId,data) {
    return axiosServices.post(baseURL + `api/feedback/all/${UserId}` , data,true,headers);
  }
  DeleteAdminData(deleteid) {
    return axiosServices.Delete (baseURL + `api/admin/delete-order/${deleteid}`, true,headers);
  }

  SaveExporterDemand(data) {
    return axiosServices.post(baseURL  + `api/exporter/SaveExporterDemand`, data, true,headers);
  }

  getAllExporterDetails(data) {
    return axiosServices.post(baseURL  + `api/exporter/getAllExporterDetails`,data,true,headers);
  }
  UpdateExporterStatus(data) {
    return axiosServices.post(baseURL + `api/exporter/UpdateExporterStatus`,data, true,headers);
  }
  DeleteOrderExporter(UserId) {
    return axiosServices.Delete(baseURL + `api/exporter/delete-order/${UserId}`,  true,headers);
  }
  deleteFarmerOrder(UserId) {
    return axiosServices.Delete(baseURL + `api/farmer/delete-Product/${UserId}`, true,headers);
  }

}
