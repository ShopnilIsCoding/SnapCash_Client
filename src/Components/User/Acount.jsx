// Account.jsx
import { useContext, useState } from "react";
import { Card, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { FiSend, FiDollarSign } from "react-icons/fi";
import SendMoney from "./SendMoney";
import CashOut from "./CashOut";
import { AuthContext } from "../../context/AuthContext";
import CountUp from "react-countup";
import CashIn from "./CashIn";

const Account = () => {
  const [activeTab, setActiveTab] = useState("sendMoney");
  const {user}=useContext(AuthContext)

  return (
    <div className=" w-full  bg-gradient-to-r  from-base-300  via-base-100 to-secondary flex flex-col items-center justify-center text-gray-900">
      <div className="max-w-4xl w-full p-6">
        <Card className="p-6 bg-inherit w-full">
          <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold text-secondary">
            Account Management
          </Typography>
          <Typography variant="h5" className="font-semibold text-secondary mt-1 w-fit mx-auto mb-4">
                        <span className="text-info ">Account Balance:</span>
                        <CountUp end={user.balance} duration={2.5} separator="," decimals={2} decimal="." prefix=" " suffix=" tk" />
                      </Typography>
          <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} className="mb-4">
            <TabsHeader>
              <Tab value="sendMoney" icon={<FiSend className="w-5 h-5 mr-2" />}>
                Send Money
              </Tab>
              <Tab value="cashIn" icon={<FiDollarSign className="w-5 h-5 mr-2" />}>
                Cash In
              </Tab>
              <Tab value="cashOut" icon={<FiDollarSign className="w-5 h-5 mr-2" />}>
                Cash Out
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="sendMoney">
                <SendMoney />
              </TabPanel>
              <TabPanel value="cashOut">
                <CashOut />
              </TabPanel>
              <TabPanel value="cashIn">
                <CashIn />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Account;
