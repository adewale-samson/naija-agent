import Smiling from "../assets/smiling-girl.png";

const Trending = () => {
  const users = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <section className="font-mont px-[49px]">
      <h1 className="max-w-[742px] font-medium text-[20px] text-center leading-[150%] tracking-[0] mx-auto my-[42px] ">
        Find agents anywhere in Nigeria with ease. RentIt is here to help make
        rentals, home ownerships and more easy. Connect with over 5,000 agents
        all over the country here.
      </h1>
      <h2 className="font-bold text-[20px] text-[#337E66] text-center leading-[150%] tracking-[0]">
        TRENDING AGENTS
      </h2>
      <div className="flex flex-wrap gap-[50px] my-[30px]">
        {users.map((users, index) => (
          <div key={index} className="relative w-[257px] h-[213px] border border-[#D9D9D9] rounded-[20px] overflow-hidden">
            <img
              src={Smiling}
              alt="photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[17px] left-[40px] w-[176px] h-[48px]  rounded-[20px] bg-[rgba(51, 126, 102, 0.7)] flex justify-center items-center backdrop-blur-2xl">
              <p className="w-[70%] font-bold text-[13px] text-[#fff] text-center leading-[150%] tracking-[0]">
                AP Realtors Lagos
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
