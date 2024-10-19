import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../Styles/Admin.css'; // Make sure to add your styles here
import { CiEdit, CiCircleRemove } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [banks, setBanks] = useState([]);  

    const [bank, setBank] = useState(null);  
    const [branch, setBranch] = useState(null);  
    const [live, setLive] = useState(false);  
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BANK_END}/get`, { bank, branch});
                console.log(response)
                if (response.data.success) {
                    setBanks(response.data.accounts); // assuming response.data.accounts has the required data
                } else {
                    toast.error(response.data.message || 'Failed to fetch bank accounts.');
                }
            } catch (err) {
                console.error(err);
                toast.error('An error occurred while fetching bank accounts.');
            }
        };
        fetchBankAccounts();
    }, [live]);

   // Function to handle edit (for example purposes)
const editBank = (id) => {
    toast.success('Edit Bank feature coming soon.');
};

// Function to handle delete (for example purposes)
const deleteBank = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this account?');
    if (!confirmDelete) return;

    try {
        await axios.delete(`${process.env.REACT_APP_BANK_END}/${id}`);
        setBanks(banks.filter((account) => account._id !== id));
        toast.success('Bank account deleted.');
    } catch (err) {
        console.error(err);
        toast.error('Failed to delete bank account.');
    }
};


   

    return (
        <div className="admin-page">
            <div className="top">

            <h1>Admin Dashboard</h1>
            <button className='edit-btn' onClick={()=>navigate('/')}> Get Back</button>
            </div>

            {/* Search Inputs */}
            <div className="search-filters">
               
                <input
                    type="text"
                    placeholder="Search by bank name"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Search by branch"
                    value={branch}
B                onChange={(e) => setBranch(e.target.value)}
                    className="search-input"
                />
            <button className='edit-btn' onClick={()=>setLive(!live)}> Search </button>
            </div>

            {/* Grid layout for displaying bank accounts */}
            <div className="bank-accounts-grid">
                {banks.length > 0 ? (
                    banks.map((bank, index) => (
                        <div className="bank-card" key={index}>
                            <h3>{bank.bank_name}</h3>
                            {bank.user_reference && 
                            <>
                <p><strong>User Linked:</strong> {bank.user_reference.username}</p>
                <p><strong>User Email:</strong> {bank.user_reference.email}</p>
                            </>
            }
                            <p><strong>Bank:</strong> {bank.bank}</p>
                            <p><strong>Branch:</strong> {bank.branch}</p>
                            <p><strong>A/C No:</strong> {bank.number}</p>
                            <p><strong>IFSC:</strong> {bank.IFSC_code}</p>
                            <p><strong>A/C Holder:</strong> {bank.holder}</p>
                            <div className="card-actions">
                                <button className="edit-btn" onClick={() => editBank(bank._id)}>
                                    <CiEdit size={20} /> Edit
                                </button>
                                <button className="remove-btn" onClick={() => deleteBank(bank._id)}>
                                    <CiCircleRemove size={20} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bank accounts found.</p>
                )}
            </div>
        </div>
    );
};




export default Admin;