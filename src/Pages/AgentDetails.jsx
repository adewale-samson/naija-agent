import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAgentById, getComments, postComment } from "../api/data";
import { toast } from "react-toastify";

const AgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState({});
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      text: "Great agent to work with!",
      date: "2025-04-28",
    },
    {
      id: 2,
      user: "Jane Smith",
      text: "Very professional service.",
      date: "2025-04-29",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAgentById(id)
      .then((res) => {
        console.log(res);
        setAgent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getComments()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Mock agent data
  // const agent = {
  //   name: "Sarah Johnson",
  //   image: "https://placeholder.com/150",
  //   about:
  //   "Experienced real estate agent with 10 years in the industry. Specialized in luxury properties and commercial real estate.",
  //   instagram: "https://instagram.com/sarahjohnson",
  //   phone: "+234 801 234 5678",
  // };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !userName.trim()) return;

    setIsSubmitting(true);
    const currentDate = new Date().toISOString().split("T")[0];
    const newValue = {
      fullName: userName,
      content: comment
    }
    
    postComment(newValue, id)
      .then((res) => {
        toast.success("Comment posted successfully");

        const newComment = {
          id: comments.length + 1,
          user: userName,
          text: comment,
          date: currentDate,
        };

        setComments([...comments, newComment]);
        setComment("");
        setUserName("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to post comment");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="font-mont bg-[#FAFAFA] px-4 sm:px-6 py-[24px] max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* Agent Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-48 h-48 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{agent.name}</h1>
            <p className="text-gray-600 mb-4">{agent.bio}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <a
                  href={agent.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#337E66] hover:underline"
                >
                  Instagram Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
                </svg>
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.0002 0C5.37024 0 0.000244141 5.37 0.000244141 12C0.000244141 18.63 5.37024 24 12.0002 24C18.6302 24 24.0002 18.63 24.0002 12C24.0002 5.37 18.6302 0 12.0002 0ZM15.8502 14.63C15.7202 14.88 15.5902 15.12 15.4502 15.34C14.7202 16.42 13.9402 17.46 13.1202 18.46C12.7902 18.88 12.4002 19.18 11.9702 19.31C11.5402 19.44 11.0002 19.34 10.6302 19.06C10.2802 18.8 10.0002 18.43 9.81024 18.02C9.59024 17.54 9.45024 17.02 9.31024 16.5C8.91024 14.85 8.51024 13.2 8.11024 11.54C8.09024 11.46 8.07024 11.38 8.05024 11.3C7.99024 11.08 7.90024 10.86 7.77024 10.67C7.63024 10.47 7.44024 10.32 7.22024 10.23C7.17024 10.21 7.13024 10.19 7.08024 10.16C7.06024 10.15 6.97024 10.12 7.00024 10.09C7.03024 10.06 7.09024 10.06 7.12024 10.05C7.31024 10.03 7.50024 10.03 7.70024 10.05C8.00024 10.1 8.28024 10.21 8.53024 10.38C8.80024 10.56 9.03024 10.8 9.21024 11.07C9.40024 11.36 9.54024 11.68 9.67024 12C9.81024 12.36 9.94024 12.73 10.0702 13.09C10.4102 14.05 10.7602 15.01 11.1002 15.97C11.2502 16.4 11.4002 16.83 11.7002 17.18C11.9402 17.46 12.2902 17.66 12.6602 17.66C13.0302 17.66 13.3502 17.47 13.6102 17.22C14.0302 16.82 14.4002 16.38 14.7602 15.93C15.1402 15.44 15.4902 14.93 15.8502 14.43C15.9202 14.33 15.9102 14.53 15.8502 14.63ZM12.0002 7.45C12.5802 7.45 13.1502 7.62 13.6302 7.94C14.1102 8.26 14.4802 8.71 14.6902 9.24C14.9002 9.77 14.9402 10.35 14.8002 10.91C14.6602 11.47 14.3502 11.97 13.9202 12.36C13.2702 12.94 12.4002 13.23 11.5402 13.13C11.1302 13.08 10.7402 12.93 10.4002 12.71C10.0602 12.49 9.77024 12.2 9.55024 11.85C9.33024 11.5 9.18024 11.11 9.12024 10.7C9.05024 10.23 9.10024 9.75 9.27024 9.31C9.44024 8.87 9.72024 8.48 10.0802 8.18C10.4402 7.88 10.8702 7.66 11.3302 7.55C11.5502 7.49 11.7802 7.45 12.0002 7.45Z" />
                </svg>
                <span>
                  {agent.airbnb ? "Available on Airbnb" : "Not on Airbnb"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Inspection Fee</p>
                  <p className="text-lg font-semibold">
                    ₦{agent.inspectionFee?.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Total Deals</p>
                  <p className="text-lg font-semibold">
                    {agent.totalDeals || 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Sales</p>
                  <p className="text-lg font-semibold">
                    ₦{agent.sales?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-[#EAEAEA] rounded-lg mb-4"
            placeholder="Your name"
            required
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-[#EAEAEA] rounded-lg mb-4 min-h-[120px]"
            placeholder="Write your comment here..."
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#337E66] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-[#EAEAEA] last:border-b-0 pb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.user}</span>
                <span className="text-gray-500 text-sm">{comment.date}</span>
              </div>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
