import { useEffect, useState } from "react";
import { getAgentById } from "../api/data";
import Sidebar from "../Components/Sidebar";
import { FaSearch } from "react-icons/fa";
import Cookies from 'js-cookie'

const Dashboard = () => {
  const [agentData, setAgentData] = useState({})
  const [id, setId] = useState('')

  useEffect(() => {
      try {
        const agentId = Cookies.get("id");
        if (agentId) {
          setId(agentId);
        } else {
          return
        }
      } catch (error) {
      //   console.error("Error retrieving token:", error);
      }
    }, []);

  useEffect(() => {
      if (!id) return;
      getAgentById(id)
        .then((res) => {
          // console.log(res);
          setAgentData(res.data.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }, [id]);
  return (
    <div className="flex min-h-screen bg-[#D9D9D938] font-mont">
      <Sidebar agentInfo={agentData}/>

      <div className="flex-1 p-[16px] sm:p-[24px] lg:p-[38px] overflow-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-gray-500">Agent updates</p>
          </div>
          <div className="relative w-full md:w-1/3">
            <input type="text" placeholder="Search..." className="w-full pl-10 p-2 rounded-[30px] bg-[#fff] border border-[#fff] bg-[#D9D9D938]" />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-8">
          <div className="w-full min-h-[150px] bg-[#72B89F] p-6 md:p-4 lg:p-6 rounded-[30px]">
            <div className="flex justify-between items-center mb-[20px]">
                <h4 className="font-[800] text-[16px] text-[#000000] leading-[100%]">Rent</h4>
                <span className="font-[800] text-[#000] text-[16px] leading-[100%] tracking-[0] rounded-[20px] border-none p-[10px] bg-[#fff]">+15%</span>
            </div>
            <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#fff] leading-[100%] tracking-[0]">₦4,500,000</p>
          </div>
          <div className="w-full min-h-[150px] bg-[#DEB887] p-6 md:p-4 lg:p-6 rounded-[30px]">
            <div className="flex justify-between items-center mb-[20px]">
                <h4 className="font-[800] text-[16px] text-[#000000] leading-[100%]">Sales</h4>
                <span className="font-[800] text-[#000] text-[16px] leading-[100%] tracking-[0] rounded-[20px] border-none p-[10px] bg-[#fff]">+15%</span>
            </div>
            <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#fff] leading-[100%] tracking-[0]">₦{agentData.sales}</p>
          </div>
          <div className="w-full min-h-[150px] bg-[#D6D8E7] p-6 md:p-4 lg:p-6 rounded-[30px]">
            <div className="flex justify-between items-center mb-[20px]">
                <h4 className="font-[800] text-[16px] text-[#000000] leading-[100%]">Rent</h4>
                <span className="font-[800] text-[#000] text-[16px] leading-[100%] tracking-[0] rounded-[20px] border-none p-[10px] bg-[#fff]">+15%</span>
            </div>
            <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#000000] leading-[100%] tracking-[0]"></p>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white p-6 rounded-md mb-8">
          <h4 className="text-gray-600 mb-4">User in the last month <span className="text-green-500 font-bold">+15%</span></h4>
          {/* Simple Graph Replacement */}
          <div className="flex items-end gap-4 h-40">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <div key={month} className="flex flex-col items-center justify-end">
                <div className="w-6 bg-black h-[50%]"></div>
                <span className="text-xs mt-2">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Details + Recent Rentals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Details */}
          <div className="bg-white p-6 rounded-md">
            <h4 className="text-gray-600 mb-4">Monthly Details</h4>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-8 border-green-400 border-t-transparent animate-spin-slow mb-6"></div>
              <h2 className="text-2xl font-bold">4.5M</h2>
              <p className="text-gray-500">Total rent of 3 houses</p>
            </div>
          </div>

          {/* Recent Rentals */}
          <div className="bg-white p-6 rounded-md">
            <h4 className="text-gray-600 mb-4">Recent Rentals</h4>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold">2 Bedroom Apartment</h5>
                    <p className="text-gray-400 text-sm">02 Months ago</p>
                  </div>
                  <span className="text-gray-800 font-semibold">₦2.5M</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

