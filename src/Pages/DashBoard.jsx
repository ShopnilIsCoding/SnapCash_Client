// DashBoard.js
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card, Typography, Button } from "@material-tailwind/react";
import CountUp from "react-countup";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [reveal, setReveal] = useState(false);

  const handleReveal = () => {
    setReveal(true);
  };

  return (
    <div className=" bg-gradient-to-r w-full from-base-300 via-base-100 to-secondary flex items-center justify-center text-gray-900">
      <div className="max-w-4xl w-fit opacity-75 p-6">
        <Card className="p-6 shadow-2xl bg-base-100">
          <Typography variant="h3" color="blue-gray" className="mb-4 text-center font-bold text-info">
            Welcome, {user.name}
          </Typography>
          <div className="flex flex-col items-center space-y-4">
            <Typography className="font-semibold text-error text-2xl border border-error px-2 py-1">
              {user.role}
            </Typography>
            <Typography variant="h5" className="font-semibold text-secondary">
              <span className="text-info">Email:</span> {user.email}
            </Typography>
            <Typography variant="h5" className="font-semibold text-secondary">
              <span className="text-info">Phone Number:</span> {user.mobileNumber}
            </Typography>
            {user.role !== "admin" && (
              <div className="w-full text-center">
                <SwitchTransition>
                  <CSSTransition
                    key={reveal ? "balance" : "reveal"}
                    timeout={500}
                    classNames="fade"
                  >
                    {reveal ? (
                      <Typography variant="h5" className="font-semibold text-secondary mt-1">
                        <span className="text-info">Account Balance:</span>
                        <CountUp end={user.balance} duration={2.5} separator="," decimals={2} decimal="." prefix=" " suffix=" tk" />
                      </Typography>
                    ) : (
                      <span className="mt-4 border border-accent text-accent px-2 py-1 cursor-pointer" onClick={handleReveal}>
                        Reveal Balance
                      </span>
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </div>
            )}
            <Button className="mt-4 bg-secondary w-fit" fullWidth>
              View Transactions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
