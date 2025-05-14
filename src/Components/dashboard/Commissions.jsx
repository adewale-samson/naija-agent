import React from "react";

const Commissions = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Commissions</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Total Commission</h4>
          {/* <span className="text-2xl font-bold text-green-600">₦1,250,000</span> */}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h5 className="font-semibold">2 Bedroom Apartment</h5>
                <p className="text-sm text-gray-500">Commission: 5%</p>
              </div>
              {/* <div className="text-right">
                <p className="font-semibold">₦250,000</p>
                <p className="text-sm text-gray-500">Mar 15, 2025</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Commissions;
