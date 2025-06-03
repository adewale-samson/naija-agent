import React, { useEffect, useState } from "react";
import { getComments } from "../../api/data";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const Comments = () => {
  const [agentId, setAgentId] = useState();
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState();
  useEffect(() => {
    const id = Cookies.get("id");
    if (!id) {
      return;
    }
    setAgentId(id);
  }, []);
  useEffect(() => {
    if (!agentId) return;
    setIsLoadingComments(true);
    getComments(agentId)
      .then((res) => {
        setComments(res.data.data.comments);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setIsLoadingComments(false);
      });
  }, [agentId]);
  // console.log(comments);
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }
  return (
    <div className="bg-white p-6 rounded-md">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        {isLoadingComments ? (
          <div className="flex justify-center items-center py-8">
              <ClipLoader size={30} color={"#337E66"} />
            </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p>No comments yet.</p>
            </div>
        ) : (
          comments.map((comment, i, arr) => (
            <div key={comment._id} className={`${arr.length - 1 === i ?'':'border-b border-b-[#EAEAEA] pb-4'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{comment.fullname}</h4>
                  <p className="text-gray-500 text-sm">
                    {formatDate(comment.updatedAt)}
                  </p>
                </div>
                {/* <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  New
                </span> */}
              </div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
