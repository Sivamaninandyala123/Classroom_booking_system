import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './classroomcse.css'; // Import the custom CSS file

const ClassroomCse = () => {
  const { floor } = useParams();
  const navigate = useNavigate();

  const [showCabins, setShowCabins] = useState(false);
  const [showSmallSeminarHall, setShowSmallSeminarHall] = useState(false);

  const handleCardClick = (roomId) => {
    const seminarHalls = ['BigSeminarHall', 'SmallSeminarHall'];
    const classrooms = ['G1', 'G2', 'G3', 'G4', 'G5', 'G7', 'G8', 'G9', 'G10'];

    if (seminarHalls.includes(roomId) || classrooms.includes(roomId)) {
      navigate('/bookingform');
    }
  };

  const renderGroundFloor = () => (
    <div className="container">
      <center><h2>Ground Floor</h2></center>
      <div className="ground-floor">
        <div className="right-side">
          <p>Right side of the door:</p>
          <div className="classroom-cards">
            <div className="card" onClick={() => handleCardClick('G1')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G1" />
              G1
            </div>
            <div className="card" onClick={() => handleCardClick('G2')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G2" />
              G2
            </div>
            <div className="card" onClick={() => handleCardClick('G3')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G3" />
              G3
            </div>
            <div className="card" onClick={() => handleCardClick('G4')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G4" />
              G4
            </div>
            <div className="card" onClick={() => handleCardClick('G5')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G5" />
              G5
            </div>
          </div>
        </div>
        <br></br>
        <div className="left-side">
          <p>Left side of CSE:</p>
          <div className="classroom-cards">
            <div className="card" onClick={() => handleCardClick('G7')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G7" />
              G7
            </div>
            <div className="card" onClick={() => handleCardClick('G8')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G8" />
              G8
            </div>
            <div className="card" onClick={() => handleCardClick('G9')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G9" />
              G9
            </div>
            <div className="card" onClick={() => handleCardClick('G10')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="G10" />
              G10
            </div>
          </div>
          <div className="info-cards">
            <div className="card">G6: Library (Not Available for Booking)</div>
            <div className="card">In front of G6: HOD Room (Not Available for Booking)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFirstFloor = () => (
    <div>
      <h2><center>First Floor</center></h2>
      <div className="first-floor">
        <div className="seminar-hall-section">
          <div className="Bigseminar-hall">
            <div className="card" onClick={() => handleCardClick('BigSeminarHall')}>
              <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" alt="Big Seminar Hall" />
            </div>
            <center><b><h2>Big Seminar Hall</h2></b></center>
            <center>
              <button onClick={() => setShowCabins(!showCabins)} className="toggle-button">
                We have cabins also
              </button>
            </center>
            <br />
            {showCabins && (
              <div className="cabin-cards">
                <div className="card">
                  <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" alt="Faculty Cabin A" />
                  <div className="card-body">
                    <h5>Faculty Cabin A</h5>
                    <p>This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                    <small>Last updated 3 mins ago</small>
                  </div>
                </div>
                <div className="card">
                  <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" alt="Faculty Cabin B" />
                  <div className="card-body">
                    <h5>Faculty Cabin B</h5>
                    <p>This card has supporting text below as a natural lead-in to additional content.</p>
                    <small>Last updated 3 mins ago</small>
                  </div>
                </div>
                <div className="card">
                  <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" alt="Faculty Cabin C" />
                  <div className="card-body">
                    <h5>Faculty Cabin C</h5>
                    <p>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <small>Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="seminar-hall">
          <div className="card" onClick={() => handleCardClick('SmallSeminarHall')}>
            <img src="https://www.shutterstock.com/image-photo/workshop-university-rear-view-students-260nw-296223497.jpg" alt="Small Seminar Hall" />
          </div>
          <center><b>Small Seminar Hall</b></center>
          <center>
            <button onClick={() => setShowSmallSeminarHall(!showSmallSeminarHall)} className="toggle-button">
              Cabins near by Seminar Hall also
            </button>
          </center>
          {showSmallSeminarHall && (
            <div className="cabin-cards">
              <div className="card">
                <img src="https://www.shutterstock.com/image-photo/workshop-university-rear-view-students-260nw-296223497.jpg" alt="Faculty Cabin D" />
                <div className="card-body">
                  <h5>Faculty Cabin D</h5>
                  <p>This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <small>Last updated 3 mins ago</small>
                </div>
              </div>
              <div className="card">
                <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" alt="Faculty Cabin E" />
                <div className="card-body">
                  <h5>Faculty Cabin E</h5>
                  <p>This card has supporting text below as a natural lead-in to additional content.</p>
                  <small>Last updated 3 mins ago</small>
                </div>
              </div>
              <div className="card">
                <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" alt="Faculty Cabin F" />
                <div className="card-body">
                  <h5>Faculty Cabin F</h5>
                  <p>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                  <small>Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="cse-container">
      <center><h1>Available CLASS ROOMS IN CSE-BLOCK</h1></center>
      <center><p><b>Information about CSE classrooms and bookings</b>.</p></center>
      {floor && (
        <div>
          {floor === 'ground-floor' ? renderGroundFloor() : renderFirstFloor()}
        </div>
      )}
    </div>
  );
};

export default ClassroomCse;
{/* <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ padding: '2px', maxHeight: '3000px', overflow: 'auto' }} // Adjust maxHeight as needed
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://t3.ftcdn.net/jpg/07/04/35/40/360_F_704354002_XkccFYKfcpDqwrLNUwsLat9ZCzvHjg11.jpg" className="d-block w-100" alt="Slide 1" style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg" className="d-block w-100" alt="Slide 2" style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src="https://www.shutterstock.com/image-photo/workshop-university-rear-view-students-260nw-296223497.jpg" className="d-block w-100" alt="Slide 3" style={{ maxHeight: '500px', objectFit: 'cover' }} />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
