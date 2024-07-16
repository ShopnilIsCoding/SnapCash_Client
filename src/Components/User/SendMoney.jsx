// SendMoney.js
import { useState, useContext } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const SendMoney = () => {
  const { user,refetchUser } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [recipientMobileNumber, setRecipientMobileNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount < 50) {
      toast.error('Minimum transaction amount is 50 taka');
      return;
    }

    try {
      const response = await axiosInstance.post('/sendMoney', { amount : parseInt(amount), pin, recipientMobileNumber,mobileNumber:user.mobileNumber });
      toast.success('Transaction successful');
      refetchUser();
      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Transaction failed. Please try again.');
    }
    setAmount('');
    setRecipientMobileNumber('');
    setPin('');
  };

  return (
    <div className=" w-full flex items-center justify-center text-gray-900">
      <div className="max-w-md w-full p-6">
        <Card className="p-6 shadow-2xl bg-base-100">
          <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold text-secondary">
            Send Money
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
            Recipient
          </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Recipient Mobile Number"
                value={recipientMobileNumber}
                onChange={(e) => setRecipientMobileNumber(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                required
              />
            </div>
            <div className="mb-4">
            <Typography   className="mb-1 font-bold text-info">
            Your PIN
          </Typography>
              <Input
                size="lg"
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                required
              />
            </div>
            <Button className="mt-6 bg-secondary" fullWidth type="submit">
              Send Money
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SendMoney;
