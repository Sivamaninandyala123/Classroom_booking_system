import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './userdata.css';

const UserData = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>User Details</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>Username:</strong></td>
            <td>{userDetails.username}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userDetails.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
