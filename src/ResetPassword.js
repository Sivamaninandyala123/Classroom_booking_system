// import React, { useState } from 'react';
// import { auth } from './firebase';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { Form, InputGroup, Spinner } from 'react-bootstrap';
// import { BsEnvelope } from 'react-icons/bs';
// import './signup.css';

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [resetEmailSent, setResetEmailSent] = useState('');

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setResetEmailSent('Password reset email sent! Please check your inbox.');
//     } catch (err) {
//       console.log(err);
//       setError('Failed to send password reset email. Please check the email address.');
//     }

//     setLoading(false);
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
//         <form className="signup-form" onSubmit={handleResetPassword}>
//           <center><h2>Reset Password</h2></center>
//           <Form.Group>
//             <Form.Label>Email:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><BsEnvelope /></InputGroup.Text>
//               <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
//             </InputGroup>
//           </Form.Group>
//           <button type="submit" disabled={loading}>Send Reset Email</button>
//           {error && <p className="error-message">{error}</p>}
//           {resetEmailSent && <p className="success-message">{resetEmailSent}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { BsEnvelope } from 'react-icons/bs';
import './signup.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent('Password reset email sent! Please check your inbox.');
      
      // No need to wait here, user can reset password via email link.
      // Redirect to login page after reset email sent.
      setTimeout(() => {
        navigate('/login', { state: { message: 'Please log in with your new password.' } });
      }, 40000); // Redirect after 60 seconds
    } catch (err) {
      console.log(err);
      setError('Failed to send password reset email. Please check the email address.');
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
        <form className="signup-form" onSubmit={handleResetPassword}>
          <center><h2>Reset Password</h2></center>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsEnvelope /></InputGroup.Text>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <button type="submit" disabled={loading}>Send Reset Email</button>
          {error && <p className="error-message">{error}</p>}
          {resetEmailSent && <p className="success-message">{resetEmailSent}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
