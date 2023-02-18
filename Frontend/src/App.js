import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import './App.css';
import AdminHome from "./components/admincomponents/admin-home";
import AdminUserprofileUpdate from "./components/admincomponents/admin-userprofile-update";
import NewUserRegistration from "./components/admincomponents/new-user-registration";
import WasteCollectionEntry from "./components/admincomponents/waste-collection-entry";
import Carousel from "./components/intro/carousel";
import Footer from "./components/intro/footer";
import Cards from "./components/intro/cards";
import Navbar from "./components/intro/navbar";
import GenerateHouseTax from "./components/maincomponents/generate-house-tax";
import Home from "./components/maincomponents/home";
import Userprofile from "./components/maincomponents/userprofile";
import Wastehistory from "./components/maincomponents/wastehistory";
import Adminlogin from "./components/registration/adminlogin";
import Login from "./components/registration/login";
import Usersignup from "./components/registration/usersignup";

function mainLayout() {
  return (<>
    <Navbar/>
    <div>
      <Carousel></Carousel>
      <Cards />
      <Outlet/>
    </div>
    <Footer/>
  </>)
}
function App() {
  return (
    <div className="bg-color">
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/waste-history" element={<Wastehistory/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/userprofile" element={<Userprofile/>}/>
        <Route path="/user-signup" element={<Usersignup/>}/>
        <Route path="/generate-house-tax" element={<GenerateHouseTax/>}/>
        <Route path="/admin-login" element={<Adminlogin/>}/>
        <Route path="/admin-home" element={<AdminHome/>}/>
        <Route path="/user-registration" element={<NewUserRegistration/>}/>
        <Route path="/user-profileupdate-byadmin" element={<AdminUserprofileUpdate/>}/>
        <Route path="/waste-collection-entry" element={<WasteCollectionEntry/>}/>
        
        <Route path="/" element={mainLayout()}>

        </Route>
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
