import React, { useState } from 'react';
import './Login1.css';
import { VscAccount } from 'react-icons/vsc';
import { FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login1 = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    alert(isSignUp ? 'Sign Up Successful!' : 'Login Successful!');
  };

  const handleForgotPasswordSubmit = (data) => {
    console.log('New Password:', data.newPassword);
    alert('Password has been reset successfully!');
    setShowForgotPassword(false);
  };

  const toggleForm = () => setIsSignUp(!isSignUp);
  const toggleForgotPassword = () => setShowForgotPassword(!showForgotPassword);

  // Updated Google Sign-In Function
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider(); // Initialize Google Auth provider
    try {
      // Sign in the user with Google and retrieve the result
      const result = await signInWithPopup(auth, provider);

      // Retrieve the user from the result
      const user = result.user;

      // Optionally, you can access user details here
      console.log('Google User:', user);

      // Alert the user with their name (or you can use other user details)
      alert(`Welcome, ${user.displayName}!`);

      // Optionally: You could save the user data to your database here (e.g., user info in Firestore)
      // e.g., saveUserToDatabase(user);

    } catch (error) {
      // Handle errors if something goes wrong during the sign-in process
      console.error('Google Sign-In Error:', error.message);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="B">
           <div className='backimage'>
            <img src='/images/shopping-carts-blue-background-with-copy-space.jpg'/>
           </div>
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{isSignUp ? 'Seller Sign Up' : 'Seller Login'}</h1>
          <div className="social-login">
            <button type="button" className="social-button" onClick={signInWithGoogle}>
              <h2>Sign up with Google</h2>
              {/* Google Image Button */}
              <img src="/images/pngwing.com.png" alt="Google Sign In" className="social-icon" />
            </button>
          </div>

          <p className="separator">
            <span>
              <hr />
              OR
              <hr />
            </span>
          </p>

          <div className="input-box">
            <label htmlFor="emailOrPhone"></label>
            <input
              type="text"
              placeholder="Enter your email or phone number"
              {...register('emailOrPhone', {
                required: 'Email or Phone is required',
                validate: (value) => {
                  const phoneRegex = /^[0-9]{10}$/; // Valid phone number: 10 digits
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Valid email: ends with @gmail.com

                  if (phoneRegex.test(value)) {
                    return true; // Valid phone number
                  } else if (emailRegex.test(value)) {
                    return true; // Valid email
                  }
                  return 'Please enter a valid phone number or email address.';
                }
              })}
            />
            <VscAccount className="icon" />
            {errors.emailOrPhone && <div style={{ color: 'red' }}>{errors.emailOrPhone.message}</div>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            <FaLock className="icon" />
            {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
          </div>

          <button type="submit" className="logbutton">{isSignUp ? 'Sign Up' : 'Login'}</button>

          <div className="register-link">
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <a href="#toggle" onClick={toggleForm}>
                {isSignUp ? 'Login now' : 'Sign up now'}
              </a>
            </p>
          </div>

          <div className="forgot-password">
            <a href="#forgot" onClick={toggleForgotPassword}>Forgot password?</a>
          </div>
        </form>

        {showForgotPassword && (
          <div className="forgot-password-modal">
            <div className="modal-content">
              <h2>Reset Your Password</h2>
              <form onSubmit={handleSubmit(handleForgotPasswordSubmit)}>
                <input
                  type="password"
                  placeholder="Enter new password"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.'
                    }
                  })}
                />
                {errors.newPassword && <div style={{ color: 'red' }}>{errors.newPassword.message}</div>}
                <button type="submit" className="logbutton">Reset Password</button>
                <button type="button" className="cancel-button" onClick={toggleForgotPassword}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login1;
