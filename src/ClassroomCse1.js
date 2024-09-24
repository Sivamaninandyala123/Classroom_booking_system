import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './classroomcse.css';

function ClassroomCse() {
  const [showCabins, setShowCabins] = useState(false);
  const [showClassroom, setShowClassroom] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [searchError, setSearchError] = useState('');

  const navigate = useNavigate();

  const handleViewCabins = () => {
    setShowCabins(!showCabins);
  };

  const handleViewClassrooms = () => {
    setShowClassroom(!showClassroom);
  };

  const handleBookNow = (classroom) => {
    if (['G6', 'G7'].includes(classroom.name)) {
      alert('Not allowed for booking');
    } else {
      navigate('/bookingform', { state: { classroomName: classroom.name } });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = classroomsData.filter(classroom =>
      classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClassrooms(results);

    if (results.length === 0) {
      setSearchError(`Classroom '${searchTerm}' not found.`);
    } else {
      setSearchError('');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredClassrooms([]);
    setSearchError('');
  };

  const classroomsData = [
    { name: 'G1', image: 'https://thumbs.dreamstime.com/b/school-university-classroom-vector-cartoon-school-classroom-interior-vector-cartoon-illustration-university-schoolroom-design-110507952.jpg' },
    { name: 'G2', image: 'https://en.idei.club/uploads/posts/2023-06/1687243970_en-idei-club-p-classroom-clipart-dizain-instagram-3.jpg' },
    { name: 'G3', image: 'https://img.freepik.com/free-photo/school-classroom-digital-art-style-education-day_23-2151164339.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720396800&semt=ais_user' },
    { name: 'G4', image: 'https://t3.ftcdn.net/jpg/03/36/17/00/360_F_336170083_fVrqQgpNjp7JtunvQZpKPeOLTqyzQ2cw.jpg' },
    { name: 'G5', image: 'https://www.shutterstock.com/image-illustration/interior-classroom-260nw-337235465.jpg' },
    { name: 'G6', image: 'https://www.shutterstock.com/image-vector/interior-design-reading-room-public-260nw-2318928003.jpg' },
    { name: 'G7', image: 'https://5.imimg.com/data5/SELLER/Default/2022/1/QC/YU/AX/82368182/computer-lab-jb-028-500x500.jpg' },
    { name: 'G8', image: 'https://img.freepik.com/free-vector/blank-classroom-scene-with-empty-chalkboard_1308-56419.jpg' },
    { name: 'G9', image: 'https://cdn.vectorstock.com/i/500p/98/90/empty-classroom-interior-school-or-college-class-vector-29389890.jpg' },
    { name: 'G10', image: 'https://thumbs.dreamstime.com/z/empty-classroom-cartoon-empty-classroom-interior-cartoon-vector-illustration-graphic-design-113273536.jpg' }
  ];

  return (
    <div className="container">
      {/* Search Input */}
      <div className="input-group mb-3">
        <form className="d-flex justify-content-end" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a classroom..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-secondary" type="submit">Search</button>
          {searchTerm && (
            <button className="btn btn-danger" type="button" onClick={handleClearSearch}>Clear</button>
          )}
        </form>
      </div>

      {/* Card for Big Seminar Hall */}
      <div className="d-flex justify-content-center my-4">
        <div className="card mb-3 p-3" style={{ width: 1000 }}>
          <div className="row g-0">
            <div className="col-md-6">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5f2e38b9301d9e64e13c2501/1599541615142-LM96TPU6XOWS3C6VTRMW/FACULTY+CABINS+ED+3+%28Small%29.jpg"
                className="img-fluid rounded-start"
                alt="Big Seminar Hall"
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">GROUND FLOOR CLASSROOMS</h5>
                <p className="card-text">
                  In the CSE block:
                  <br />
                  <h6>Right-hand side:</h6>
                  G1, G2, G3, G4, G5, Staff room (not available for classroom booking)
                  <br />
                  <h6>Left-hand side:</h6>
                  G6 (allocated for CSE library, not available for booking)
                  G10, G8, G9, G7 (not available for booking)
                  HOD office room
                </p>
              </div>
              <button className="btn btn-online-success mt-3" onClick={handleViewCabins}>
                {showCabins ? 'CLOSE THE CLASSROOMS' : ' RIGHT HAND SIDE CLASSROOMS'}
              </button>
              <button className="btn btn-online-success mt-3" onClick={handleViewClassrooms}>
                {showClassroom ? 'CLOSE THE CLASSROOMS' : ' LEFT HAND SIDE CLASSROOMS'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display filtered classrooms */}
      <div className="container text-center mt-5">
        {filteredClassrooms.length > 0 ? (
          <div className="row mb-4">
            {filteredClassrooms.map((classroom) => (
              <div key={classroom.name} className="col">
                <img
                  src={classroom.image}
                  className="img-fluid rounded"
                  alt={`Classroom ${classroom.name}`}
                  style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                />
                <br /><br />
                <b><p>{`${classroom.name} CLASSROOM`}</p></b>
                <button className="btn btn-online-success mt-3" onClick={() => handleBookNow(classroom)}>Book Now</button>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchError}</p>
        )}
      </div>

      {showCabins && (
        <div className="container text-center mt-5">
          <h2 className="card-text" style={{textAlign: 'center', fontFamily: 'Arial, sans-serif'}}>RIGHT HAND SIDE CLASSROOMS IN GROUND FLOOR</h2>
          <br></br><br></br>
          <div className="row mb-4">
            {['G1', 'G2', 'G3', 'G4', 'G5'].map(name => {
              const classroom = classroomsData.find(c => c.name === name);
              return (
                <div key={classroom.name} className="col">
                  <img
                    src={classroom.image}
                    className="img-fluid rounded"
                    alt={`Classroom ${classroom.name}`}
                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                  />
                  <br></br><br></br>
                  <b><p>{`${classroom.name} CLASSROOM`}</p></b>
                  <button className="btn btn-online-success mt-3 center-align" onClick={() => handleBookNow(classroom)}>Book Now</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showClassroom && (
        <div className="container text-center mt-5">
          <h2 className="card-text" style={{textAlign: 'center', fontFamily: 'Arial, sans-serif'}}>LEFT HAND SIDE CLASSROOMS IN GROUND FLOOR</h2>
          <br></br><br></br>
          <div className="row mb-4">
            {['G10', 'G8', 'G9'].map(name => {
              const classroom = classroomsData.find(c => c.name === name);
              return (
                <div key={classroom.name} className="col">
                  <img
                    src={classroom.image}
                    className="img-fluid rounded"
                    alt={`Classroom ${classroom.name}`}
                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                  />
                  <br></br><br></br>
                  <b><p>{`${classroom.name} CLASSROOM`}</p></b>
                  <button className="btn btn-online-success mt-3 center-align" onClick={() => handleBookNow(classroom)}>Book Now</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassroomCse;
