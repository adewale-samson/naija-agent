import React from "react";

const TotalSales = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Total Sales</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Total Property Sales</h4>
          {/* <span className="text-2xl font-bold text-[#DEB887]">
            ₦150,000,000
          </span> */}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h5 className="font-semibold">Duplex</h5>
                <p className="text-sm text-gray-500">
                  Location: Victoria Island
                </p>
              </div>
              {/* <div className="text-right">
                <p className="font-semibold">₦50,000,000</p>
                <p className="text-sm text-gray-500">Apr 20, 2025</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
