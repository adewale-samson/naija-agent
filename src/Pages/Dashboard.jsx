import { useEffect, useState } from "react";
import { getAgentById } from "../api/data";
import Sidebar from "../Components/Sidebar";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

// Import dashboard components
import Comments from "../Components/dashboard/Comments";
import Commissions from "../Components/dashboard/Commissions";
import InspectionFees from "../Components/dashboard/InspectionFees";
import TotalRents from "../Components/dashboard/TotalRents";
import TotalSales from "../Components/dashboard/TotalSales";
import EditProfile from "../Components/dashboard/EditProfile";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: null },
  { id: "edit-profile", label: "Edit Profile", icon: null },
  { id: "comments", label: "Comments", icon: null },
  // { id: "commissions", label: "Commissions", icon: null },
  // { id: "inspection-fees", label: "Inspection fees", icon: null },
  // { id: "total-rents", label: "Total Rents", icon: null },
  // { id: "total-sales", label: "Total Sales", icon: null },
];

const DashboardOverview = ({ agentData }) => {
  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-8">
        <div className="w-full min-h-[150px] bg-[#72B89F] p-6 md:p-4 lg:p-6 rounded-[30px]">
          <div className="flex justify-center items-center mb-[20px]">
            <h4 className="font-[800] min-h-[32px] text-[16px] text-[#000000] leading-[100%]">
              Rent
            </h4>
          </div>
          <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#000] leading-[100%] tracking-[0]">
            {agentData?.rentPrice
              ? parseInt(agentData.rentPrice)?.toLocaleString()
              : "-"}
          </p>
        </div>
        <div className="w-full min-h-[150px] bg-[#DEB887] p-6 md:p-4 lg:p-6 rounded-[30px]">
          <div className="flex justify-center items-center mb-[20px]">
            <h4 className="font-[800] min-h-[32px] text-[16px] text-[#000000] leading-[100%]">
              Sales
            </h4>
          </div>
          <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#000] leading-[100%] tracking-[0]">
            {agentData?.sales
              ? `${parseInt(agentData.sales)?.toLocaleString()}`
              : "-"}
          </p>
        </div>
        <div className="w-full min-h-[150px] bg-[#D6D8E7] p-6 md:p-4 lg:p-6 rounded-[30px]">
          <div className="flex justify-center items-center mb-[20px]">
            <h4 className="font-[800] min-h-[32px] text-center text-[16px] text-[#000000] leading-[100%]">
              Commission (%)
            </h4>
          </div>
          <p className="font-[800] text-center text-[16px] lg:text-[24px] text-[#000000] leading-[100%] tracking-[0]">
            {agentData?.commission
              ? agentData.commission?.toLocaleString()
              : "-"}
          </p>
        </div>
      </div>{" "}
      {/* Agent Details Section */}
      <div className="w-full bg-white rounded-[30px] p-2 md:p-8 mb-8">
        <h2 className="font-[800] text-[24px] mb-6">Agent Details</h2>
        <div className="space-y-6">
          <div className="bg-[#F8F8F8] p-4 rounded-[15px]">
            <h3 className="font-[600] text-[14px] sm:text-[18px] text-[#337E66] mb-4">
              Personal Info
            </h3>{" "}
            <div className="space-y-3 text-[12px] sm:text-[14px]">
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  Name:
                </span>
                <span>{agentData?.name || "N/A"}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  Email:
                </span>
                <span>{agentData?.email || "N/A"}</span>
              </p>{" "}
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  Phone:
                </span>
                <span>{agentData?.phone || "N/A"}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  Address:
                </span>
                <span>{agentData?.address || "N/A"}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  State/City:
                </span>
                <span>{agentData?.state || "N/A"}</span>
              </p>{" "}
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[120px] block sm:inline-block mb-1 sm:mb-0">
                  Instagram:
                </span>
                {agentData?.instagram ? (
                  <a
                    href={`https://instagram.com/${agentData.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate max-w-full sm:max-w-[calc(100%-120px)] text-[#337E66] hover:underline"
                  >
                    {agentData.instagram}
                  </a>
                ) : (
                  <span className="truncate max-w-full sm:max-w-[calc(100%-120px)]">
                    N/A
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="bg-[#F8F8F8] p-4 rounded-[15px]">
            <h3 className="font-[600] text-[14px] sm:text-[18px] text-[#337E66] mb-4">
              About
            </h3>
            <p className="text-[#535353] text-[12px] sm:text-[14px] leading-relaxed">
              {agentData?.bio || "No bio available"}
            </p>
          </div>
          <div className="bg-[#F8F8F8] p-4 rounded-[15px]">
            <h3 className="font-[600] text-[14px] sm:text-[18px] text-[#337E66] mb-4">
              Property Statistics
            </h3>{" "}
            <div className="space-y-3 text-[12px] sm:text-[14px]">
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Total Deals:
                </span>
                <span>{agentData?.totalDeals?.toLocaleString() || "0"}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Number of Rents:
                </span>
                <span>
                  {parseInt(agentData?.rentPrice)?.toLocaleString() || "0"}
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Number of Sales:
                </span>
                <span>
                  {parseInt(agentData?.sales)?.toLocaleString() || "0"}
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  AirBnB Listings:
                </span>
                <span>{agentData?.airbnb?.toLocaleString() || "0"}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#F8F8F8] p-4 rounded-[15px]">
            <h3 className="font-[600] text-[14px] sm:text-[18px] text-[#337E66] mb-4">
              Fees & Commissions
            </h3>{" "}
            <div className="space-y-3 text-[12px] sm:text-[14px]">
              <p className="flex flex-col sm:flex-row sm:items-center ">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Inspection Fee:
                </span>
                <span>
                  ₦{agentData?.inspectionFee?.toLocaleString() || "0"}
                </span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Agreement Fee:
                </span>
                <span>{agentData?.agreement?.toLocaleString() || "0"}%</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-[600] min-w-[160px] block sm:inline-block mb-1 sm:mb-0">
                  Commission:
                </span>
                <span>{agentData?.commission?.toLocaleString() || "0"}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Monthly Details + Recent Rentals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    </>
  );
};

const Dashboard = () => {
  const [agentData, setAgentData] = useState({});
  const [id, setId] = useState("");
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const agentId = Cookies.get("id");
      if (agentId) {
        setId(agentId);
      }
    } catch (error) {
      // console.error("Error retrieving token:", error);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getAgentById(id)
      .then((res) => {
        setAgentData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [id]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-[700px] flex justify-center items-center">
          <ClipLoader size={40} color={"#337E66"} />
        </div>
      );
    }

    switch (activeItem) {
      case "dashboard":
        return <DashboardOverview agentData={agentData} />;
      case "edit-profile":
        return (
          <EditProfile
            agentData={agentData}
            setAgentData={setAgentData}
            setActiveItem={setActiveItem}
          />
        );
      case "comments":
        return <Comments />;
      // case "commissions":
      //   return <Commissions />;
      // case "inspection-fees":
      //   return <InspectionFees />;
      // case "total-rents":
      //   return <TotalRents />;
      // case "total-sales":
      //   return <TotalSales />;
      default:
        return <DashboardOverview agentData={agentData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#D9D9D938] font-mont">
      <Sidebar
        agentInfo={agentData}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />

      <div className="flex-1 p-[16px] sm:p-[24px] lg:p-[38px] overflow-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold">
              {navItems.find((item) => item.id === activeItem)?.label ||
                "Dashboard"}
            </h2>
            <p className="text-gray-500">Agent updates</p>
          </div>
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 p-2 rounded-[30px] bg-[#fff] border border-[#fff] bg-[#D9D9D938]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
