//imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
//page imports

import Login from "./pages/Login/Login";
import SignUp from './pages/Signup/Signup';
import SignUpKeyCode from './pages/SignUpKeyCode/SignUpKeyCode';
import SelectCity from './pages/SelectCity/SelectCity';
import Homepage from './pages/HomePage/Homepage';
import Profile from './pages/Profile/Profile';



const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/SignUpKeyCode" element={<SignUpKeyCode />} />
         <Route path="/selectcity" element={<SelectCity />}/>
         <Route path="/homepage" element={<Homepage />} />
         <Route path="/profile" element={<Profile />} />
        {/*<Route path="/createpost/:area" element={<CreatePost />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/post/:area" element={<Post />} />
        <Route path="/*" element={<FourOFour/>} /> */}
      </Routes>
    </Router>
  );
}
export default App;