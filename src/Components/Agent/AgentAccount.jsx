// AgentAccount.jsx
import { useState, useEffect, useContext } from "react";
import {  Tooltip  } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";


const AgentAccount = () => {
  const { user,refetchUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  console.log(user.mobileNumber)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get(`/cashInRequests/${user.mobileNumber}`);
        setRequests(response.data);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to fetch cash-in requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axiosInstance.post('/approveCashIn', { requestId, agentMobileNumber: user.mobileNumber });
      toast.success('Cash-in approved successfully');
      setRequests(requests.filter(request => request.requestId !== requestId));
        refetchUser();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Cash-in approval failed. Please try again.');
    }
  };
  const handleBlock = async (requestId) => {
    try {
      await axiosInstance.post('/blockCashIn', { requestId, agentMobileNumber: user.mobileNumber });
      toast.success('Cash-in blocked successfully');
      setRequests(requests.filter(request => request.requestId !== requestId));
        refetchUser();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Cash-in block failed. Please try again.');
    }
  };

  return (
    <div className="w-full p-4 lg:py-10">
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th  className="text-xl font-black">Type</th>
        <th  className="text-xl font-black">User Mobile Number</th>
        <th  className="text-xl font-black">Amount</th>
        <th  className="text-xl font-black">Status</th>
        <th className="text-xl font-black">Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {requests.map((req)=>
    {
        return (
          <tr key={req.requestId}>
            <td>Cash-In</td>
            <td>{req.mobileNumber}</td>
            <td>{req.amount}</td>
            <td>{req.status}</td>
            <td>
              <Tooltip content="Approve Cash-In">
                <button className="btn" onClick={() => handleApprove(req.requestId)}>Approve
                  <TiTick className="text-success inline-block text-xl ml-1" />
                </button>
              </Tooltip>
              <Tooltip content="Block Cash-In">
                <button className="btn" onClick={() => handleBlock(req.requestId)}>Block
                  <RxCross1 className="text-error inline-block text-xl ml-1" />
                </button>
              </Tooltip>
            </td>
          </tr>
        )
  
    })}
      
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AgentAccount;
