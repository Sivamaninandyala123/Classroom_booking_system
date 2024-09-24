// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { auth } from './firebase';
// // import { signInWithEmailAndPassword } from 'firebase/auth';
// // import { Form, InputGroup } from 'react-bootstrap';
// // import { BsEnvelope, BsLock } from 'react-icons/bs';
// // import './signup.css';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await signInWithEmailAndPassword(auth, email, password);
// //       console.log('login successfully');
// //       navigate('/'); // Redirect to booking form after success
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="signup-container">
// //         <form className="signup-form" onSubmit={handleSubmit}>
// //           <center><h2>Login page</h2></center>
// //           <Form.Group>
// //             <Form.Label>Email:</Form.Label>
// //             <InputGroup>
// //               <InputGroup.Text><BsEnvelope /></InputGroup.Text>
// //               <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
// //             </InputGroup>
// //           </Form.Group>
// //           <Form.Group>
// //             <Form.Label>Password:</Form.Label>
// //             <InputGroup>
// //               <InputGroup.Text><BsLock /></InputGroup.Text>
// //               <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
// //             </InputGroup>
// //           </Form.Group>
// //           <button type="submit"onClick={handleSubmit}>Login</button>
// //           <p>Don't have an account?</p>
// //           <Link to="/signup">Register</Link>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { Form, InputGroup, Spinner } from 'react-bootstrap';
// import { BsEnvelope, BsLock } from 'react-icons/bs';
// import './signup.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(''); // Error state
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true); // Start loading

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('Login successful');
//       navigate('/'); // Redirect to booking form after success
//     } catch (err) {
//       console.log(err);
//       setError('Login failed. Please check your email and password.');
//     }

//     setLoading(false); // Stop loading
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="loading-overlay">
//           <div className="loading-content">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//             <p>Please wait...</p>
//           </div>
//         </div>
//       )}

//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <center><h2>Login Page</h2></center>
//           <Form.Group>
//             <Form.Label>Email:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsEnvelope /></InputGroup.Text>
//               <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Password:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsLock /></InputGroup.Text>
//               <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <button type="submit" disabled={loading}>Login</button>
//           {error && <p className="error-message">{error}</p>}
//           <p>Don't have an account?</p>
//           <Link to="/signup">Register</Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
// import { Form, InputGroup, Spinner } from 'react-bootstrap';
// import { BsEnvelope, BsLock } from 'react-icons/bs';
// import './signup.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [resetEmailSent, setResetEmailSent] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log('Login successful');
//       navigate('/');
//     } catch (err) {
//       console.log(err);
//       setError('Login failed. Please check your email and password.');
//     }

//     setLoading(false);
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setError('Please enter your email address first.');
//       return;
//     }
    
//     try {
//       await sendPasswordResetEmail(auth, email);
//       setResetEmailSent('Password reset email sent! Please check your inbox.');
//     } catch (err) {
//       setError('Failed to send password reset email. Please try again.');
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="loading-overlay">
//           <div className="loading-content">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//             <p>Please wait...</p>
//           </div>
//         </div>
//       )}

//       <div className="signup-container">
//         <form className="signup-form" onSubmit={handleSubmit}>
//           <center><h2>Login Page</h2></center>
//           <Form.Group>
//             <Form.Label>Email:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsEnvelope /></InputGroup.Text>
//               <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Password:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsLock /></InputGroup.Text>
//               <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <button type="submit" disabled={loading}>Login</button>
//           {error && <p className="error-message">{error}</p>}
//           {resetEmailSent && <p className="success-message">{resetEmailSent}</p>}

//           <p>Don't have an account?</p>
//           <Link to="/signup">Register</Link>
          
//           <p>Forgot your password?</p>
//           <Link to="/reset-password">Reset Password</Link> {/* Link to reset password page */}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsEnvelope, BsLock } from 'react-icons/bs';
import './signup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Login failed. Please check your email and password.');
    }

    setLoading(false);
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
          <center><h2>Login Page</h2></center>

          {/* Display message if redirected from Reset Password */}
          {location.state?.message && <p className="info-message">{location.state.message}</p>}

          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsEnvelope /></InputGroup.Text>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsLock /></InputGroup.Text>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <button type="submit" disabled={loading}>Login</button>
          {error && <p className="error-message">{error}</p>}
          <p>Don't have an account?</p>
          <Link to="/signup">Register</Link>
          <p>Forgot your password?</p>
          <Link to="/reset-password">Reset Password</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
