import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import { getCurrentUser } from "./services/authService";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/Dashboard1";
import Transactionhistory from "./components/Transactionhistory"
import LoginCredentials from "./components/LoginCredentials";
import Logout from "./components/Logout";
import TransferMoney from "./components/TransferMoney";


function App() {
  const isAuthenticated=!!getCurrentUser();
  return (
    <Router>
      <Routes>
        <Route path="/"element={<Dashboard1/>}></Route>
        <Route path="/account"element={<Register/>}></Route>
        <Route path="/login"element={<Login/>}></Route>
        <Route path="/dashboard"element={isAuthenticated?<Dashboard/>:<Navigate to="/login"/>}></Route>
        <Route path="/transactionhistory"element={<Transactionhistory/>}></Route>
        <Route path="/LoginCredentials"element={<LoginCredentials/>}></Route>
        <Route path="/logout"element={<Logout/>}></Route>
        <Route path="/transfermoney"element={<TransferMoney/>}></Route>
      </Routes>
      
      
    </Router>
  );
}

export default App;
