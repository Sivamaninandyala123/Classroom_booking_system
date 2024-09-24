import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './classroomcse.css'; // Import your custom styles

function CardComponent() {
  const [showCabins, setShowCabins] = useState(false); // State to track whether to show cabins information
  const [showSmallCabins, setShowSmallCabins] = useState(false); 
  // State to track whether to show small seminar hall cabins information
  
  const navigate = useNavigate();

  const handleViewCabins = () => {
    setShowCabins(!showCabins); // Toggle the state between true and false
  };

  const handleViewSmallCabins = () => {
    setShowSmallCabins(!showSmallCabins); // Toggle the state between true and false
  };

  const handleBookNow = (hallName) => {
    navigate('/bookingform',{ state: { classroomName: hallName } }); // Navigate to the booking form
  };

  return (
    <div className="container">
      {/* Card for Big Seminar Hall */}
      <div className="d-flex justify-content-center my-4">
        <div className="card mb-3 p-3" style={{ width: 1000 }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img 
                src="https://c8.alamy.com/comp/B8NA96/lecture-hall-in-columbia-university-harlem-B8NA96.jpg" 
                className="img-fluid card-img rounded-start" 
                alt="Big Seminar Hall" 
                style={{ height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Big Seminar Hall</h5>
                <p className="card-text">
                The big seminar hall has a capacity of 180 members. It is used for various purposes, including seminar classes and meetings. This versatile space is ideal for accommodating large groups, providing a suitable environment for educational sessions, conferences, and other significant gatherings
                </p>
                
                <button className="btn btn-primary mt-3" onClick={() => handleBookNow('Big Seminar Hall')}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary mt-3" onClick={handleViewCabins}>
          {showCabins ? 'Close cabins' : 'View the cabins of faculty near big seminar hall'}
        </button>
      </div>
      
      {showCabins && (
        <div className="container text-center mt-5">
          <div className="row mb-4">
            <div className="col">
              <img 
                src="https://www.littleflowerschool.ac.in/public/img/images/cs1.jpg" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 1" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
               <p>HPC lab1 information goes here.</p>
              <p>HIGH PROGRAMMING COMPUTER LAB1</p>
            </div>
            <div className="col">
              <img 
                src="https://en.idei.club/uploads/posts/2023-08/thumbs/1691293390_en-idei-club-p-office-boss-room-design-dizain-vkontakte-5.jpg" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 2" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
               <p>Cabin 2 information goes here.</p>
              <p>MUNIBABU SIR</p>
            </div>
            <div className="col">
              <img 
                src="https://i.pinimg.com/474x/1f/b2/c4/1fb2c4c315ab3c613672ef3e5057d7b9.jpg" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 3" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Cabin 3 information goes here.</p>
              <p>SRAVANI MADAM.</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img 
                src="https://i.pinimg.com/564x/3d/d9/99/3dd999f8df03200c9ce70e5fc634e3cd.jpg" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 4" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Cabin 4 information goes here.</p>
              <p>SUNITHA MADAM</p>
            </div>
            <div className="col">
              <img 
                src="https://mati.gov.in/assets/img/mati_img/14.jpg" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 5" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Cabin 5 information goes here.</p>
              <p>HIMABINDU MADAM</p>
            </div>
            <div className="col">
              <img 
                src="https://ssdc.ac.in/wp-content/uploads/2023/03/Computer-Lab-4.png" 
                className="img-fluid card-img rounded" 
                alt="Faculty Cabin 6" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
               <p>HPC lab information goes here.</p>
              <p>HIGH PROGRAMMING COMPUTER LAB2</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Card for Small Seminar Hall */}
      <div className="d-flex justify-content-center my-4">
        <div className="card mb-3 p-3" style={{ width: 1000 }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img 
                src="https://mati.gov.in/assets/img/mati_img/15.jpg" 
                className="img-fluid card-img rounded-start" 
                alt="Small Seminar Hall" 
                style={{ height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Small Seminar Hall</h5>
                <p className="card-text">
                The small seminor hall has a capacity of 180 members. It is used for various purposes, including seminar classes and meetings. This versatile space is ideal for accommodating large groups, providing a suitable environment for educational sessions, conferences, and other significant gatherings
                </p>
                
                <button className="btn btn-primary mt-3" onClick={() => handleBookNow('Small Seminar Hall ')}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary mt-3" onClick={handleViewSmallCabins}>
          {showSmallCabins ? 'Close cabins' : 'View the cabins of faculty near small seminar hall'}
        </button>
      </div>
      
      {showSmallCabins && (
        <div className="container text-center mt-5">
          <div className="row mb-4">
            <div className="col">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1604733612458-8PLB1ESIZMPT1VRFIVRC/FACULTY+CABINS+ED+1+%28Small%29.jpg" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 1" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 1 information goes here.</p>
              <p>VINOD SIR</p>
              
            </div>
            <div className="col">
              <img 
                src="https://mati.gov.in/assets/img/mati_img/18.jpg" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 2" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 2 information goes here.</p>
              <p>SANTHOSH SIR</p>
            </div>
            <div className="col">
              <img 
                src="https://i.pinimg.com/originals/77/16/39/771639e09340b8912b40392cc3ffda7a.jpg" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 3" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 3 information goes here.</p>
              <p>SATYANANDAM SIR.</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img 
                src="https://i.pinimg.com/736x/23/0f/fe/230ffe7a07417ad0bbff721ef145c5e4.jpg" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 4" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 4 information goes here.</p>
              <p>MAHENDRAN SIR</p>
            </div>
            <div className="col">
              <img 
                src="https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1fii06udbmlc18gh1qm112f9gr817.png" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 5" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 5 information goes here.</p>
              <p>SUSMITHA MADAM</p>
            </div>
            <div className="col">
              <img 
                src="https://i.pinimg.com/originals/7e/6c/f0/7e6cf0111840f6c2898f3b7685fb0d9d.jpg" 
                className="img-fluid card-img rounded" 
                alt="Small Cabin 6" 
                style={{ height: '200px', width: '100%', objectFit: 'cover' }} 
              />
              <p>Small Cabin 6 information goes here.</p>
              <p>RAJESHWARI MADAM.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardComponent;
