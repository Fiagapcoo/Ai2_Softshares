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
import PostsOrEvents from './pages/Post_Events/PostsOrEvents';
import Manage from './pages/Manage/Manage';
import CreateOC from './pages/CreateOC/createOC';
import CreatePost from './pages/CreatePost/createPost';
import CreateEvent from './pages/CreateEvent/createEvent';
import Dashboard  from './pages/Dashboard/dashboard';
import CreateArea from './pages/CreateArea/CreateArea';
import CreateSubarea from './pages/CreateSubarea/CreateSubarea';
import NotFoundPage from './pages/FourOFour/fourOfourPage';
import SetupPassword from './pages/SetupPassword/SetupPassword';
const App = () => {


  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/SignUpKeyCode" element={<SignUpKeyCode />} />
         <Route path="/selectcity" element={<SelectCity />}/>
         <Route path="/homepage" element={<Homepage />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/posts" element={<PostsOrEvents type="Post" CreateRoute='/createPost' />} />
         <Route path="/events" element={<PostsOrEvents type="Event" CreateRoute="/createEvent" />}/>
         <Route path="/manage" element={<Manage/>}/>
         <Route path='/createOC' element={<CreateOC/>}/>
         <Route path='/createPost' element={<CreatePost/>}/>
         <Route path='/createEvent' element={<CreateEvent/>}/>
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/addArea" element={<CreateArea/>}/>
         <Route path="/addSubArea" element={<CreateSubarea/>}/>
         <Route path='/setup-password/:mashup' element={<SetupPassword/>}></Route>
         <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}
export default App;