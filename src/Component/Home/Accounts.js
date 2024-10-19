import React, {useState, useEffect} from 'react';
import '../../Styles/Accounts.css'; // Import your CSS
import NewBank from './NewBank'
import EditBank from './EditBank'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

const Accounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [user, setUser] = useState(null);  // State to hold signed-in user data
    const [editId, setEditId] = useState(null);  // State to hold signed-in user data
    const [banks, setBanks] = useState([]);  // State to hold bank accounts
    const navigate = useNavigate();

    // On component mount, retrieve the user from localStorage if available
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/');
        }
    }, [navigate]);

    // Fetch all bank accounts after user is loaded
    useEffect(() => {
        const allBanks = async () => {
            if (user) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BANK_END}/get`, { user_reference: user._id });
                    if (response.data.success && response.status === 200) {
                        setBanks(response.data.accounts);
                    } else {
                        toast.error(response.data.message || "Failed to get bank accounts.");
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };
        allBanks();
    }, [user]);


    const mask = (value) => {
        // Convert the number to a string
        const stringValue = value.toString();
        
        // Use replace to mask digits except the last 4
        return stringValue.replace(/\d(?=\d{4})/g, "*");
    };
    

    const deleteAccountHandler = async (bank) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this account?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BANK_END}/${bank._id}`);
            setBanks(banks.filter((account) => account._id !== bank._id));

            toast.success("Bank Removed!")
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete the account.");
        }
    };
    
    const handleSignOut = () => {
        localStorage.removeItem('user');  // Clear user from localStorage
        navigate('/');  // Redirect to sign-in page
    };

    const addBank = () => {
        setShowModal(true);
    };

    const editBank = (bank) => {
        setShowEdit(true);
        console.log(bank)
        setEditId(bank)
    };
    return (
        <div className="bank-account-container">
            {/* Header section */}
            <div className="header">
                <div className="user">
                    {user && <h2>Hello, {user.username}</h2>}
                    {user && <h2>{user.email}</h2>}
                </div>

                <div className="balance-info">
                    <span>650 💎</span>
                    <span>₹807.00</span>
                    <button className='sign-btn' onClick={handleSignOut}>SignOut</button>
                </div>
            </div>

            {/* Manage Bank Section */}
            <div className="manage-bank">
                <div className="card">
                    <h2>Manage Bank</h2>
                    <p>Add Bank Account to receive money and you can change it at any time.</p>
                </div>
            </div>

            {/* Bank Accounts Section */}
            <div className="bank-accounts">
                <h2>Bank Accounts</h2>
                <div className="add-new-bank">
                    <button className="add-new-bank-btn" onClick={addBank}>Add New Bank</button>
                </div>

                {/* Conditionally render bank accounts */}
                {banks && banks.length > 0 ? (
                    banks.map((bank, index) => (
                        <div className="bank-card" key={index}>
                            <h3>{bank.branch} <span className="bank-tag">{bank.bank}</span></h3>
                            <p>A/C No: { mask(bank.number)}</p>
                            <p>IFSC: {bank.IFSC_code}</p>
                            <p>Holder: {bank.holder}</p>
                            <div className="account-actions">
                            <button className="edit-btn" onClick={() => editBank(bank)}>{<CiEdit size={25}/>} </button>

                                <button className="remove-btn" onClick={() => deleteAccountHandler(bank)}>
                                    { <CiCircleRemove size={25}/>} Remove Account</button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bank accounts added yet.</p>
                )}
            </div>

            {/* Disclaimer Section */}
            <div className="disclaimer">
                <h3>Disclaimer</h3>
                <p>1. Use only a bank account that matches your profile name.</p>
                <p>2. Do not link the same bank account to multiple accounts on the platform.</p>
                <p>3. Never share your personal credentials to unknown sources.</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKg7lwQv9luOKz0GO73ka6XqwheTyEg9Nh-Q&s" alt="" />
            </div>

            {/* Show New Bank Modal */}
            {showModal && <NewBank setShowModal={setShowModal} banks={banks} setBanks={setBanks}/>}
            {showEdit && <EditBank setShowEdit={setShowEdit} bank={editId} banks={banks} setBanks={setBanks}/>}
           
        </div>
    );
};

export default Accounts;
