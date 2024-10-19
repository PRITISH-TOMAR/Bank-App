import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Signin.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import sign from '../Images/sign.jpg';

const SignIn = () => {
    // Single state object to store all form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const [user, setUser] = useState(null); // State to hold signed-in user data
    const [login, setLogin] = useState(false); // State to hold error message

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Keep previous form data
            [name]: value // Update the field that changed
        });
    };
    const handleSignIn = async (e) => {

     
        try {
            const userRes = await axios.post(`${process.env.REACT_APP_USER_END}/get`, formData);

            if (userRes.status === 200 && userRes.data.success) {
                // Save user data to localStorage
                // console.log(userRes)
              
                localStorage.setItem('user', JSON.stringify(userRes.data.user));

                // Update user state
                setUser(userRes.data.user);
                toast.success(userRes.data.message);

                // Navigate to home page
                navigate('/home');
            } else {
                // Handle unsuccessful status code or API response error
                toast.error(userRes.data.message || "Failed to sign in, please try again.");
            }
        } catch (err) {
            console.error('Error during sign-up:', err);
            // Set error message based on the response or general error
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || "Something went wrong, please try again.");
            } else {
                toast.error("Network error, please check your connection.");
            }
        }
    }

    // Function to handle sign-up
    const handleSignUp = async (e) => {
        e.preventDefault();
        if(login)
        {
            handleSignIn();
            return;
        }
      

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const userRes = await axios.post(`${process.env.REACT_APP_USER_END}`, formData);
                console.log(userRes.status)
            if (userRes.status === 201 && userRes.data.success) {
               
                setUser(userRes.data.user);
                toast.success(userRes.data.message);
                setLogin(!login)

               

               
            } else {
                // Handle unsuccessful status code or API response error
                toast.error(userRes.data.message || "Failed to sign up, please try again.");
            }
            
        } catch (err) {
            console.error('Error during sign-up:', err);
            // Set error message based on the response or general error
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || "Something went wrong, please try again.");
            } else {
                toast.error("Network error, please check your connection.");
            }
        }
        finally{
            setFormData({email:'', password:'', username:'', confirmPassword:''})
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-image">
                <img src={sign} alt="Sign In" />
            </div>
            <div className="signin-form">
            <h2> { login ? "Sign In" : "Sign Up"}   </h2>
               
                <form onSubmit={handleSignUp}>
                    { !login && 

                        <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            />
                    </div>
                        }
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {
                        !login && 
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            />
                    </div>
                        }
                    <button type="submit" className="signin-btn">{ login ? "Sign In" : "Sign Up"} </button>
                </form>
                    

                    <div className="bottom">
                        
                <button onClick={()=>setLogin(!login)} className='btn'>
                {
                    login ?
                    "Not a user! SignUp"
                    :
                    
                    "Already a user! SignIn"
                    
                }
                </button>
                <button onClick={()=>navigate('/admin')} className='btn'>
                {
                    "Login as Admin?"
                    
                }
                </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
