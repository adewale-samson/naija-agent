import Smiling from "../assets/smiling-girl.png";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getLocationData, searchLocationData } from "../api/data";
import { useNavigate } from "react-router";
import EmptyUser from "../assets/empty-user.svg";

const Trending = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationData, setLocationData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getLocationData("Lagos")
      .then((res) => {
        setLocationData(res.data.data);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchAgents();
      } else {
        setSearchResults([]); 
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const searchAgents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await searchLocationData(searchQuery);
      setSearchResults(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetails = (agentId) => {
    navigate(`/agent/${agentId}`);
  };
  // console.log(locationData)
  return (
    <section className="font-mont min-h-[700px] px-[16px] sm:px-[49px]">
      <form
        className="flex items-center justify-center w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full max-w-[800px]">
          <input
            type="text"
            placeholder="Search by location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:border-[#337E66] transition-colors"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>
      <h1 className="max-w-[742px] font-medium text-[20px] text-center leading-[150%] tracking-[0] mx-auto my-[42px]">
        Find agents anywhere in Nigeria with ease. RentIt is here to help make
        rentals, home ownerships and more easy. Connect with over 5,000 agents
        all over the country here.
      </h1>
      {isLoading && (
        <p className="text-center text-gray-600">Loading results...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}{" "}
      <h2 className="font-bold text-[20px] text-[#337E66] text-center leading-[150%] tracking-[0]">
        {searchQuery ? "SEARCH RESULTS" : "TRENDING AGENTS"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[50px] my-[30px] px-4 max-w-[1200px] mx-auto">
        {/* {(searchResults.length > 0 ? searchResults : Array(16).fill(0)).map( */}
        {(searchResults.length > 0 ? searchResults : locationData).map(
          (agent, index) => (
            <div
              key={agent._id || index}
              className="relative w-full h-[213px] border border-[#D9D9D9] rounded-[20px] overflow-hidden cursor-pointer"
              onClick={() => handleDetails(agent.id)}
            >
              <img
                src={agent.image || EmptyUser}
                alt={agent.name || "image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[17px] left-1/2 -translate-x-1/2 w-[176px] h-[48px] rounded-[20px] bg-[rgba(51, 126, 102, 0.7)] flex justify-center items-center backdrop-blur-2xl">
                <p className="w-[70%] font-bold text-[13px] text-[#fff] text-center leading-[150%] tracking-[0]">
                  {agent.name || ""}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      {/* <div className="flex flex-wrap justify-around gap-[50px] my-[30px]">
        {(searchResults.length > 0 ? searchResults : Array(16).fill(0)).map(
          (agent, index) => (
            <div
              key={agent._id || index}
              className="relative w-[257px] h-[213px] border border-[#D9D9D9] rounded-[20px] overflow-hidden cursor-pointer"
              onClick={() => agent._id && handleSeeMore(agent._id)}
            >
              <img
                src={agent.image || Smiling}
                alt={agent.name || "Agent photo"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[17px] left-[40px] w-[176px] h-[48px] rounded-[20px] bg-[rgba(51, 126, 102, 0.7)] flex justify-center items-center backdrop-blur-2xl">
                <p className="w-[70%] font-bold text-[13px] text-[#fff] text-center leading-[150%] tracking-[0]">
                  {agent.name || "AP Realtors Lagos"}
                </p>
              </div>
            </div>
          )
        )}
      </div> */}
      {searchResults.length === 0 && searchQuery && !isLoading && (
        <p className="text-center text-gray-600">
          No results found for "{searchQuery}"
        </p>
      )}
    </section>
  );
};

export default Trending;
