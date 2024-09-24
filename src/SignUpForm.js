// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth, db } from './firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { Form, InputGroup } from 'react-bootstrap';
// import { BsPerson, BsEnvelope, BsLock } from 'react-icons/bs';
// import UserData from './UserData'; // Correctly import UserData component
// import './signup.css';

// const SignUpForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [userId, setUserId] = useState(''); // State to hold user ID
//   const navigate = useNavigate();

//   const validateUsername = (username) => {
//     const usernameRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{7,19}$/;
//     return usernameRegex.test(username);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/;
//     return emailRegex.test(email) && email.length < 20;
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,10}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateUsername(username)) {
//       alert('Username must start with a capital letter, contain at least one special character, one number, and be between 7 and 19 characters long.');
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert('Email must contain only lowercase letters, be less than 20 characters long, and contain at least one number.');
//       return;
//     }

//     if (!validatePassword(password)) {
//       alert('Password must be between 8 and 10 characters long, contain at least one special character, and at least one number.');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       console.log('Account created');

//       // Save username and email in Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         username: username,
//         email: email,
//       });

//       setUserId(user.uid); // Set the user ID
//       setShowPopup(true); // Show success popup
//     } catch (err) {
//       if (err.code === 'auth/email-already-in-use') {
//         alert('The email address is already in use by another account. Please log in instead.');
//         // Redirect to login page or display a login form
//       } else {
//         console.error('Error creating account or saving data:', err);
//         alert('Error creating account or saving data. Please try again.');
//       }
//     }
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     navigate('/'); // Redirect to booking form after success
//   };

//   return (
//     <div>
//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <h2 className="signup-heading">Sign Up</h2>
//           <Form.Group>
//             <Form.Label>Username:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsPerson /></InputGroup.Text>
//               <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Email:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsEnvelope /></InputGroup.Text>
//               <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Password:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsLock /></InputGroup.Text>
//               <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <button type="submit">Sign Up</button>
//           <p>Already registered?</p>
//           <Link to="/login">Login</Link>
//         </form>
//       </div>

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Success</h2>
//             <p>Successfully account will be created</p>
//             <button onClick={handleClose}>OK</button>
//             <UserData userId={userId} /> {/* Use the correct component name */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsPerson, BsEnvelope, BsLock } from 'react-icons/bs';
import UserData from './UserData'; // Correctly import UserData component
import './signup.css';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(''); // State to hold user ID
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{7,19}$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/;
    return emailRegex.test(email) && email.length < 50;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,10}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    if (!validateUsername(username)) {
      alert('Username must start with a capital letter, contain at least one special character, one number, and be between 7 and 19 characters long.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      alert('Email must contain only lowercase letters, be less than 20 characters long, and contain at least one number.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be between 8 and 10 characters long, contain at least one special character, and at least one number.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Account created');

      // Save username and email in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
      });

      setUserId(user.uid); // Set the user ID
      setShowPopup(true); // Show success popup
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('The email address is already in use by another account. Please log in instead.');
        // Redirect to login page or display a login form
      } else {
        console.error('Error creating account or saving data:', err);
        setError('Error creating account or saving data. Please try again.');
      }
    }

    setLoading(false); // Stop loading
  };

  const handleClose = () => {
    setShowPopup(false);
    navigate('/'); // Redirect to booking form after success
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Please wait...</p>
          </div>
        </div>
      )}

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-heading">Sign Up</h2>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsPerson /></InputGroup.Text>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsEnvelope /></InputGroup.Text>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsLock /></InputGroup.Text>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <button type="submit" disabled={loading}>Sign Up</button>
          {error && <p className="error-message">{error}</p>}
          <p>Already registered?</p>
          <Link to="/login">Login</Link>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Success</h2>
            <p>Successfully created an account</p>
            <button onClick={handleClose}>OK</button>
            <UserData userId={userId} /> {/* Use the correct component name */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;

