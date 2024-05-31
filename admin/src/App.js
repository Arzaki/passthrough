import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageEmployees from "./pages/ManageEmployees";
import AdminLogin from "./pages/AdminLogin";
import ManageSecurityGuards from "./pages/ManageSecurityGuards";
import RegisterEmployee from "./pages/RegisterEmployee";
import RegisterSecurityGuard from "./pages/RegisterSecurityGuard";
import ManageMeetings from "./pages/ManageMeetings";
import RegisterVisitor from "./pages/RegistorVisitor";
import ManageVisitors from "./pages/ManageVisitors";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import UpdateVisitor from "./pages/UpdateVisitor";
// import CaptureImage from './components/CaptureImage';
import VisitorConfirmationPage from "./pages/VisitorConfirmationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisitorCharts from "./pages/VisitorCharts";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      {sessionStorage.getItem("userData") == null ? (
        <>
          <AdminLogin />
        </>
      ) : (
        <>
          <Router>
            <Routes>
              <Route exact path="/Dashboard" element={<Dashboard />} />
              <Route
                exact
                path="/ManageSecurityGuards"
                element={<ManageSecurityGuards />}
              />
              <Route
                exact
                path="/ManageEmployees"
                element={<ManageEmployees />}
              />
              <Route
                exact
                path="/RegisterEmployee"
                element={<RegisterEmployee />}
              />
              <Route
                exact
                path="/RegisterSecurityGuard"
                element={<RegisterSecurityGuard />}
              />
              <Route
                exact
                path="/ManageMeetings"
                element={<ManageMeetings />}
              />
              <Route
                exact
                path="/RegisterVisitor"
                element={<RegisterVisitor />}
              />
              <Route
                exact
                path="/ManageVisitors"
                element={<ManageVisitors />}
              />
              <Route exact path="/UpdateVisitor" element={<UpdateVisitor />} />
              <Route exact path="/RegisterUser" element={<RegisterUser />} />
              <Route
                exact
                path="/VisitorConfirmationPage"
                element={<VisitorConfirmationPage />}
              />
              {/* <Route exact path='/CaptureImage' element={<CaptureImage/>}/> */}
              <Route exact path="/VisitorCharts" element={<VisitorCharts />} />
              <Route
                exact
                path="/UpdateEmployee"
                element={<UpdateEmployee />}
              />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
