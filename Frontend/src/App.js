import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import './App.css';
import Index from "./components";
import Navbar from "./components/navbar";

function mainLayout() {
  <Navbar>
  <Outlet/>
  </Navbar>
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/nav" element={<Navbar/>}/>
        <Route path="/index" element={<Index/>}/>
      </Routes>
    </Router>
  );
}

export default App;
