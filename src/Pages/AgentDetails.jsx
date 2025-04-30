import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

const AgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
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

  // Mock agent data
  const agent = {
    name: "Sarah Johnson",
    image: "https://placeholder.com/150",
    about:
      "Experienced real estate agent with 10 years in the industry. Specialized in luxury properties and commercial real estate.",
    instagram: "https://instagram.com/sarahjohnson",
    phone: "+234 801 234 5678",
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: "Current User", // This should be replaced with actual user data
      text: comment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, newComment]);
    setComment("");
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
            <p className="text-gray-600 mb-4">{agent.about}</p>
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
            </div>
          </div>
        </div>
      </div>

      {/* Comment Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-[#EAEAEA] rounded-lg mb-4 min-h-[120px] "
            placeholder="Write your comment here..."
          />
          <button
            type="submit"
            className="bg-[#337E66] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Comment
          </button>
        </form>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-[#EAEAEA] last:border-b-0 pb-4">
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
