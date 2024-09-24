import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AB1.css'; // Import AB1-specific CSS
import BookingForm from './BookingForm'; // Import the renamed BookingForm component

const AB1 = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showFirstFloor, setShowFirstFloor] = useState(false);
  const [showSecondFloor, setShowSecondFloor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleViewCabins = () => {
    setShowFirstFloor(!showFirstFloor);
    setShowSecondFloor(false); // Close second floor if open
  };

  const handleViewClassrooms = () => {
    setShowSecondFloor(!showSecondFloor);
    setShowFirstFloor(false); // Close first floor if open
  };

  const handleBookingClick = (classroom) => {
    setSelectedClassroom(classroom);
    setIsFormVisible(true);
    
    navigate('/bookingform',{ state: { classroomName: classroom } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate slow internet with setTimeout
    setTimeout(() => {
      // Perform search logic
      setShowFirstFloor(true); // Show first floor classrooms by default when searching
      setShowSecondFloor(true); // Show second floor classrooms by default when searching
      setIsLoading(false);
      setError(''); // Clear any previous errors
    }, 1500); // Simulated delay of 1.5 seconds
  };

  // Define classrooms for E1, E2, and E3 as specified
  const firstFloorE1Classrooms = ['F17', 'F18', 'S6', 'S7', 'S8', 'T3']; // Updated to include 'S8' for E1
  const secondFloorE2Classrooms = ['S1', 'S2', 'S3', 'S5', 'S9', 'S15']; // E2 Classrooms
  const secondFloorE3Classrooms = ['S16', 'S17', 'S18', 'S19', 'S20', 'S21']; // E3 Classrooms

  // Filter classrooms based on search query
  const filteredFirstFloorE1 = firstFloorE1Classrooms.filter((classroom) =>
    classroom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSecondFloorE2 = secondFloorE2Classrooms.filter((classroom) =>
    classroom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSecondFloorE3 = secondFloorE3Classrooms.filter((classroom) =>
    classroom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Error handling for no matching classrooms found
  const noClassroomsFound = filteredFirstFloorE1.length === 0 && filteredSecondFloorE2.length === 0 && filteredSecondFloorE3.length === 0;

  return (
    <div className="ab1-container">
      <center><h1>AB1 CLASSROOM DETAILS</h1></center>
      <br /><br />
      <div className="search-container">
        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <br /><br />
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!isLoading && !error && !noClassroomsFound && (
        <div className="d-flex justify-content-center my-4">
          <div className="card mb-3 p-3" style={{ width: 1000 }}>
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src="https://www.shutterstock.com/image-vector/university-buildingeducation-studentcity-landscape-house-600nw-1117704410.jpg"
                  className="img-fluid rounded-start"
                  alt="Big Seminar Hall"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">AB-1 CLASSROOMS</h5>
                  <p className="card-text">
                    In the AB-1:
                    <br />
                    <h6>FIRST FLOOR ROOM:</h6>
                    {filteredFirstFloorE1.length > 0 ? (
                      <span>E1 Classrooms: {filteredFirstFloorE1.join(', ')}</span>
                    ) : (
                      <span>No classrooms found in first floor.</span>
                    )}
                    <br /><br /><br />
                    <h6>SECOND FLOOR ROOM:</h6><br />
                    {filteredSecondFloorE2.length > 0 ? (
                      <span>E2 Classrooms: {filteredSecondFloorE2.join(', ')}</span>
                    ) : (
                      <span>No classrooms found in second floor (E2).</span>
                    )}<br />
                    {filteredSecondFloorE3.length > 0 ? (
                      <span>E3 Classrooms: {filteredSecondFloorE3.join(', ')}</span>
                    ) : (
                      <span>No classrooms found in second floor (E3).</span>
                    )}
                  </p>
                </div>
                <button className="btn btn-online-success mt-3" onClick={handleViewCabins}>
                  {showFirstFloor ? 'CLOSE FIRST FLOOR CLASSROOMS' : 'FIRST FLOOR'}
                </button>
                <button className="btn btn-online-success mt-3" onClick={handleViewClassrooms}>
                  {showSecondFloor ? 'CLOSE SECOND FLOOR CLASSROOMS' : 'SECOND FLOOR'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFirstFloor && !isLoading && filteredFirstFloorE1.length > 0 && (
        <div className="card-container">
          {filteredFirstFloorE1.map((classroom, index) => (
            <div key={classroom} className="card md-4">
              <img
                className="classroom-image"
                src={require(`./images/${classroom.toLowerCase()}.jpg`)}
                alt={classroom}
                onClick={() => handleBookingClick(classroom)}
              />
              <h2 className="classroom-name">{classroom}</h2>
              <button
                className="book-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookingClick(classroom);
                }}
              >
                Book
              </button>
              {/* Conditionally render a line break after every third card */}
              {(index + 1) % 3 === 0 && <div className="w-100"></div>}
            </div>
          ))}
        </div>
      )}

      {showSecondFloor && !isLoading && filteredSecondFloorE2.length > 0 && (
        <div className="card-container">
          {filteredSecondFloorE2.map((classroom, index) => (
            <div key={classroom} className="card md-4">
              <img
                className="classroom-image"
                src={require(`./images/${classroom.toLowerCase()}.jpg`)}
                alt={classroom}
                onClick={() => handleBookingClick(classroom)}
              />
              <h2 className="classroom-name">{classroom} (E2)</h2>
              <button
                className="book-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookingClick(classroom);
                }}
              >
                Book
              </button>
              {/* Conditionally render a line break after every third card */}
              {(index + 1) % 3 === 0 && <div className="w-100"></div>}
            </div>
          ))}
          {filteredSecondFloorE3.map((classroom, index) => (
            <div key={classroom} className="card md-4">
              <img
                className="classroom-image"
                src={require(`./images/${classroom.toLowerCase()}.jpg`)}
                alt={classroom}
                onClick={() => handleBookingClick(classroom)}
              />
              <h2 className="classroom-name">{classroom} (E3)</h2>
              <button
                className="book-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookingClick(classroom);
                }}
              >
                Book
              </button>
              {/* Conditionally render a line break after every third card */}
              {(index + 1) % 3 === 0 && <div className="w-100"></div>}
            </div>
          ))}
        </div>
      )}

      {isFormVisible && (
        <BookingForm
          classroomName={selectedClassroom}
          setIsFormVisible={setIsFormVisible}
        />
      )}

      {noClassroomsFound && (
        <div className="alert alert-warning text-center mt-4" role="alert">
          No classrooms found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default AB1;
