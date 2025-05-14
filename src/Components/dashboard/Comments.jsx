import React from "react";

const Comments = () => {
  return (
    <div className="bg-white p-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {/* Sample comments - replace with real data */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Client Name</h4>
                <p className="text-gray-500 text-sm">2 days ago</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                New
              </span>
            </div>
            <p className="mt-2 text-gray-700">
              Great service and very professional handling of the property
              viewing.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
