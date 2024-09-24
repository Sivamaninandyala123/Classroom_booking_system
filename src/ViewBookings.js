import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import './ViewBooking.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const bookingsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(bookingsList);
        console.log('Fetched bookings:', bookingsList);
      } catch (error) {
        console.error('Error fetching bookings: ', error);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
      alert('Booking successfully deleted!');
    } catch (error) {
      console.error('Error deleting booking: ', error);
      alert('Failed to delete booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Please wait, fetching data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="bookings-container">
      <center><h2>ClassRoom Bookings Details</h2></center>
      <table className="table table-striped table-bordered table-hover bookings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Faculty Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Students Strength</th>
            <th>Description</th>
            <th>Classroom</th> {/* Add this column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.section}</td>
              <td>{booking.subject}</td>
              <td>{booking.facultyName}</td>
              <td>{booking.date}</td>
              <td>{booking.startTime}</td>
              <td>{booking.endTime}</td>
              <td>{booking.studentsStrength}</td>
              <td>{booking.description}</td>
              <td>{booking.classroom}</td> {/* Display classroom */}
              <td>
                <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBookings;
