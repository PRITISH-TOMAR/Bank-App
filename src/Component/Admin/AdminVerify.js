import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../Styles/AdminVerify.css'; // Import your CSS for styling
import Admin from './Admin';

const AdminVerify = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAdmin, setShowAdmin] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios.post(`${process.env.REACT_APP_USER_END}/get`, {
                email,
                password,
            });
                // console.log()
            if (response.status && response.data.user.role==='ADMIN') {
                toast.success('Login successful!');
                setShowAdmin(true)
                // Redirect or perform any action you want after successful login
            } else {
                toast.error( 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while logging in.');
        }
    };


    if(showAdmin)
        return <Admin/>

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default AdminVerify;
