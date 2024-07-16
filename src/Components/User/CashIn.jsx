// CashIn.jsx
import { useState, useContext } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const CashIn = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [agentMobileNumber, setAgentMobileNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      toast.error('Amount must be greater than zero');
      return;
    }

    try {
      const response = await axiosInstance.post('/cashInRequest', { amount, agentMobileNumber,mobileNumber:user.mobileNumber });
      toast.success('Cash-in request sent successfully');
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Cash-in request failed. Please try again.');
    }
  };

  return (
    <div className=" flex items-center justify-center text-gray-900">
      <div className="max-w-md w-full p-6">
        <Card className="p-6 shadow-2xl bg-base-100">
          <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold text-secondary">
            Cash In Request
          </Typography>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
            <Typography   className="mb-1 font-bold text-info">
            Amount
          </Typography>
              <Input
                size="lg"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                required
              />
            </div>
            <div className="mb-4">
            <Typography   className="mb-1 font-bold text-info">
            Agent
          </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Agent Mobile Number"
                value={agentMobileNumber}
                onChange={(e) => setAgentMobileNumber(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                required
              />
            </div>
            <Button className="mt-6 bg-secondary" fullWidth type="submit">
              Send Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CashIn;
