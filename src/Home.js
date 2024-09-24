import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/signup'); // Navigate to the signup form
  };

  const handleChange = () => {
    navigate('/login'); // Navigate to the login form
  };

  const buttonStyles = {
    backgroundColor: 'green', // Initial button color
    color: 'white', // Button text color
    padding: '10px 20px', // Padding
    margin: '10px ', // Margin
    border: 'none', // Remove border
    borderRadius: '6px', // Rounded corners
    cursor: 'pointer', // Pointer cursor on hover
    transition: 'background-color 0.3s', // Smooth transition for background color
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = 'green';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#007bff';
  };

  return (
    <div>
      <Card className="text-bg-dark" style={{ width: '100%', height: '95vh', maxWidth: '2000px', margin: 'auto', padding: '2px' }}>
        <Card.Img 
          src="https://www.classroombookings.com/site/assets/files/1/classroombookings-opengraph.png" 
          alt="Card image" 
          className="card-img" 
          style={{ height: '100%', objectFit: 'cover' }} 
        />
        <Card.ImgOverlay>
        <Card.Text>
            <div>
             <marquee><p style={{ fontSize: '3rem', textAlign: 'cenetr', fontFamily: 'Arial, sans-serif',  }}>IIIT RGUKT RK VALLEY CSE BLOCK </p></marquee> 
            </div>
          </Card.Text>
          <Card.Text>
            <div style={{ marginLeft: '250px' }}>
              <p style={{ fontSize: '3rem', textAlign: 'left', fontFamily: 'Arial, sans-serif', marginTop: '200px' }}>WELCOME TO </p>
            </div>
          </Card.Text>
          <Card.Text>
            <div style={{ marginLeft: '500px' }}>
              <p style={{ fontSize: '3rem', textAlign: 'left', fontFamily: 'Arial, sans-serif', marginTop: '80px' }}>SYSTEM</p>
            </div>
          </Card.Text>
          <Card.Text>
            <Button
              type="button"
              onClick={handleBookNow}
              style={buttonStyles}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              SIGN UP
            </Button>
            <Button
              type="button"
              onClick={handleChange}
              style={buttonStyles}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              LOGIN
            </Button>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default Home;
