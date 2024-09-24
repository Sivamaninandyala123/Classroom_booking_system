import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Alert,Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingForm.css';

const BookingForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    section:'',
    subject: '',
    facultyName: '',
    startTime: '',
    endTime: '',
    date: '',
    studentsStrength: '',
    description: '',
    classroom: ''
  });
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/signin'); // Redirect to sign-in page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (location.state && location.state.classroomName) {
      setFormData((prevData) => ({
        ...prevData,
        classroom: location.state.classroomName
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Set loading to true when starting the submission process
      try {
        // Check if the classroom is already booked
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('classroom', '==', formData.classroom),
          where('date', '==', formData.date),
          where('startTime', '==', formData.startTime),
          where('endTime', '==', formData.endTime)
        );
        const querySnapshot = await getDocs(bookingsQuery);
        if (!querySnapshot.empty) {
          setAlert({ show: true, message: 'This classroom is already booked for the selected date and time.', variant: 'danger' });
          setLoading(false); // Set loading to false if booking is already taken
          return;
        }

        await addDoc(collection(db, 'bookings'), { ...formData, userId: user.uid });
        setAlert({ show: true, message: 'your classroom is successfully booked!', variant: 'success' });
        setLoading(false); // Set loading to false after successful booking
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        console.error('Error adding document: ', error);
        setAlert({ show: true, message: 'Error adding document.', variant: 'danger' });
        setLoading(false); // Set loading to false if there's an error
      }
    }
  };

  const validateForm = () => {
    const { name, email, facultyName, date, startTime, endTime, studentsStrength } = formData;
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[r][0-9]{2}[0-9]{4}@rguktrkv\.ac\.in$/; // Updated email regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^(0[6-9]|1[0-1]):[0-5][0-9] [AP]M$/;
    const isNameValid = name.trim() !== '' && name.match(nameRegex);
    const isFacultyNameValid = facultyName.trim() !== '' && facultyName.match(nameRegex);
    const isEmailValid = email.trim() !== '' && email.match(emailRegex);
    const isDateValid = date.trim() !== '' && date.match(dateRegex);
    const isStartTimeValid = startTime.trim() !== '' && startTime.match(timeRegex);
    const isEndTimeValid = endTime.trim() !== '' && endTime.match(timeRegex);
    const isTimeInRange = isStartTimeValid && isEndTimeValid && isTimeWithinRange(startTime, endTime);
    const isStudentsStrengthValid = studentsStrength.trim() !== '' && !isNaN(studentsStrength);

    const isSunday = new Date(date).getDay() === 0; // Check if the date is Sunday

    if (isSunday) {
      setAlert({ show: true, message: 'Classroom cannot be booked on Sundays.', variant: 'danger' });
      return false;
    }
    if (!isNameValid) {
      setAlert({ show: true, message: 'Name should not be empty and should only contain letters.', variant: 'danger' });
      return false;
    }
    if (!isFacultyNameValid) {
      setAlert({ show: true, message: 'Faculty name should not be empty and should only contain letters.', variant: 'danger' });
      return false;
    }
    if (!isEmailValid) {
      setAlert({ show: true, message: 'The email should start with r and end with @rguktrkv.ac.in', variant: 'danger' });
      return false;
    }
    if (!isDateValid) {
      setAlert({ show: true, message: 'Please enter a valid date in the format YYYY-MM-DD.', variant: 'danger' });
      return false;
    }
    if (!isTimeInRange) {
      setAlert({ show: true, message: 'The class can only be booked between 6:00 AM and 11:00 PM and for a maximum of 2 hours.', variant: 'danger' });
      return false;
    }
    if (!isStudentsStrengthValid) {
      setAlert({ show: true, message: 'Student strength should be a positive number.', variant: 'danger' });
      return false;
    }

    const studentsStrengthValue = parseInt(studentsStrength);
    if (studentsStrengthValue > 180) {
      setAlert({ show: true, message: 'Student strength exceeds 180. Please choose the big seminar hall.', variant: 'danger' });
      return false;
    }
    if (studentsStrengthValue > 90 && studentsStrengthValue <= 120) {
      setAlert({ show: true, message: 'For student strength between 90 and 120, please choose G9 or G10 classes for booking.', variant: 'info' });
    } else if (studentsStrengthValue <= 90) {
      setAlert({ show: true, message: 'For student strength 90 or below, please choose classrooms on the ground floor, right-hand side.', variant: 'info' });
    }

    return true;
  };

  const isTimeWithinRange = (startTime, endTime) => {
    const validTimeSlots = [
      ['07:00 AM', '08:00 AM'], ['08:00 AM', '09:00 AM'], ['09:00 AM', '10:00 AM'], ['10:00 AM', '11:00 AM'],
      ['11:00 AM', '12:00 PM'], ['12:00 PM', '01:00 PM'], ['01:00 PM', '02:00 PM'], ['02:00 PM', '03:00 PM'],
      ['03:00 PM', '04:00 PM'], ['04:00 PM', '05:00 PM'], ['05:00 PM', '06:00 PM'], ['06:00 PM', '07:00 PM'],
      ['07:00 PM', '08:00 PM'], ['08:00 PM', '09:00 PM'], ['09:00 PM', '10:00 PM'], ['10:00 PM', '11:00 PM'],
      ['07:00 AM', '09:00 AM'], ['09:00 AM', '11:00 AM'], ['11:00 AM', '12:00 PM'], ['12:00 PM', '02:00 PM'],
      ['02:00 PM', '04:00 PM'], ['04:00 PM', '06:00 PM'], ['06:00 PM', '08:00 PM'], ['08:00 PM', '10:00 PM']
    ];
    const convertTo24HourFormat = (time) => {
      const [hours, minutesPart] = time.split(':');
      const [minutes, amPm] = minutesPart.split(' ');
      let hoursInt = parseInt(hours.replace(/^0/, '')); // Remove leading zero and convert to int
      if (amPm === 'PM' && hoursInt !== 12) {
        hoursInt += 12;
      } else if (amPm === 'AM' && hoursInt === 12) {
        hoursInt = 0;
      }
      return `${hoursInt.toString().padStart(2, '0')}:${minutes}`;
    };
  
    
  
    // Check if start time is between 6:00 AM (360 minutes) and 11:00 PM (1380 minutes),
    // and end time is between 6:00 AM (360 minutes) and 11:00 PM (1380 minutes).
    const start24Hour = convertTo24HourFormat(startTime);
    const end24Hour = convertTo24HourFormat(endTime);
    const isValidTimeSlot = validTimeSlots.some(([validStart, validEnd]) => {
      const validStart24Hour = convertTo24HourFormat(validStart);
      const validEnd24Hour = convertTo24HourFormat(validEnd);
      return start24Hour === validStart24Hour && end24Hour === validEnd24Hour;
    });

    return isValidTimeSlot;
  };
  

  const handleCancel = () => {
    navigate('/');
  };
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      section:'',
      subject: '',
      facultyName: '',
      startTime: '',
      endTime: '',
      date: '',
      studentsStrength: '',
      description: '',
      classroom: ''
    });
  };

  return (
    <Container className="booking-container">
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <div className="booking-form-container">
        <Form className="booking-form" onSubmit={handleSubmit}>
          <center><h2>Booking Form</h2></center>
          <Form.Group as={Row} controlId="formClassroom">
            <Form.Label column sm="4">Classroom:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="classroom" value={formData.classroom} onChange={handleChange} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm="4">Name:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange}  placeholder='username' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm="4">Email:</Form.Label>
            <Col sm="8">
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange}  placeholder='example@gmail.com' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formName">
            <Form.Label column sm="4">Section:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="section" value={formData.section} onChange={handleChange}  placeholder='enter ection name' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formSubject">
            <Form.Label column sm="4">Subject:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange}  placeholder='DBMS' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formFacultyName">
            <Form.Label column sm="4">Faculty Name:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="facultyName" value={formData.facultyName} onChange={handleChange}  placeholder='faculty name' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formStartTime">
            <Form.Label column sm="4">Start Time:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="startTime" value={formData.startTime} onChange={handleChange}  placeholder='start time' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formEndTime">
            <Form.Label column sm="4">End Time:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="endTime" value={formData.endTime} onChange={handleChange}  placeholder='endtime' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formDate">
            <Form.Label column sm="4">Date:</Form.Label>
            <Col sm="8">
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}  placeholder='seletct date ' required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formStudentsStrength">
            <Form.Label column sm="4">Student Strength:</Form.Label>
            <Col sm="8">
              <Form.Control type="text" name="studentsStrength" value={formData.studentsStrength}  placeholder='enter student strength correctly' onChange={handleChange} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formDescription">
            <Form.Label column sm="4">Description:</Form.Label>
            <Col sm="8">
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} placeholder='enter valid description ' required />
            </Col>
          </Form.Group>
          <center>
          <Button variant="warning" onClick={handleReset} className="ml-2">
          Reset
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Book Now'}
          </Button>
            <Button className="cancel-button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </center>
        </Form>
        <div className="booking-image">
          <img src="https://cdn-icons-png.flaticon.com/512/1486/1486433.png" alt="Classroom" />
        </div>
      </div>
    </Container>
  );
};

export default BookingForm;


