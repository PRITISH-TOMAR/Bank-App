import React, { useState, useEffect } from 'react';
import '../../Styles/Modal.css';  // Import your CSS file
import axios from 'axios';  // Import axios for API requests
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const EditBank = ({setShowEdit, id, bank, banks, setBanks}) => {
    // Single state object to store all form data
    const [formData, setFormData] = useState(bank);
    const navigate = useNavigate()

    const [user, setUser] = useState(null); // State to hold signed-in user data




    // State to track errors
    // const [error, setError] = useState('');

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,  // Keep the existing form data
            [name]: value  // Update the changed field
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        

        // API request to edit bank account
        try {
            const response = await axios.put(`${process.env.REACT_APP_BANK_END}`, formData);
            // console.log(response)
            if (response.data.success && response.status === 200) {
                // Close the modal if the request is successful
                toast.success("Bank Added Successfully")
                setShowEdit(false);
                console.log(response.data)
                const leftBanks = (banks.filter((account) => account._id !== bank._id));
                setBanks([response.data.bank,...leftBanks]);

            } else {
                toast.error(response.data.message || "Failed to add bank account.");
            }
        } catch (err) {
            console.error(err);
            // setError("An error occurred while adding the bank account.");
        }
    };

    const handleCloseModal = () => {
        setShowEdit(false);
    };

    return (
        <div className="bank-account-container">
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Edit Bank Details</h2>
                    <button className="close-btn" onClick={handleCloseModal}>
                        ✖
                    </button>
                    <form className="add-bank-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input
                                type="text"
                                name="bank"
                                placeholder="Enter bank name"
                                value={formData.bank}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Branch Name</label>
                            <input
                                type="text"
                                name="branch"
                                placeholder="Enter branch name"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input
                                type="number"
                                name="number"
                                disabled
                                placeholder="Enter account number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Holder Name</label>
                            <input
                                type="text"
                                name="holder"
                                placeholder="Enter account holder's name"
                                value={formData.holder}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <input
                                type="text"
                                disabled
                                name="IFSC_code"
                                placeholder="Enter IFSC code"
                                value={formData.IFSC_code}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* {error && <p className="error">{error}</p>} */}
                        <button type="submit" className="add-bank-btn" onClick={handleSubmit}>
                            Edit Bank
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBank;
