import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Navbar from './Navbar';
import Home from './Home';
import BookingForm from './BookingForm';
import ViewBookings from './ViewBookings';
import ClassroomCse from './ClassroomCse';
import ClassroomCse1 from './ClassroomCse1';
import UserData from './UserData';
import AB1 from './AB1';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/viewbooking" element={<ViewBookings />} />
          <Route path="/classroomcse/:firstfloor" element={<ClassroomCse />} />
          <Route path="/classroomcse1/:groundfloor" element={<ClassroomCse1 />} />
          <Route path="/userdata" element={<UserData />} />
         
           {/* Updated to include URL parameter */}
           <Route path="/ab-1" element={<AB1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
