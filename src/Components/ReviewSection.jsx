import Boy from "../assets/smiling-boy.png";
import Girl from "../assets/smiling-girl.png";
import Ladies from "../assets/ladies.png";

const ReviewSection = () => {
  return (
    <section className="px-4 sm:px-6 md:px-[48px] pb-[32px]">
      <h4 className="w-full sm:w-[311px] font-kaisei font-normal text-[24px] sm:text-[30px] md:text-[36px] text-[#000] mx-auto text-center leading-[100%] tracking-[0%] mb-[21px]">
        What people have been saying{" "}
      </h4>
      <div className="flex flex-col md:flex-row gap-6 md:justify-between flex-wrap">
        <div className="w-full md:w-[278px] rounded-[30px] bg-[#337E66]">
          <div className="w-full md:w-[278px] h-[152px]">
            <img
              src={Boy}
              alt="smiling boy"
              className="w-full h-full object-cover rounded-t-[30px]"
            />
          </div>
          <p className="font-[800] text-[12px] md:text-[10px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#fff] px-[14px] py-[12px]">
            Finally, i can find agents on this website and not spend about six
            months before seeing who can take me on inspection
          </p>
        </div>
        <div className="w-full md:w-[278px] rounded-[30px] bg-[#337E66]">
          <div className="w-full md:w-[278px] h-[152px]">
            <img
              src={Girl}
              alt="smiling girl"
              className="w-full h-full object-cover rounded-t-[30px]"
            />
          </div>
          <p className="font-[800] text-[12px] md:text-[10px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#fff] px-[14px] py-[12px]">
            Here, i can see inspection fees and choose the agents that suits my
            idea. No more hearing about that 1 hour to inspection time
          </p>
        </div>
        <div className="w-full md:w-[278px] rounded-[30px] bg-[#337E66]">
          <div className="w-full md:w-[278px] h-[152px]">
            <img
              src={Ladies}
              alt="ladies"
              className="w-full h-full object-cover rounded-t-[30px]"
            />
          </div>
          <p className="font-[800] text-[12px] md:text-[10px] leading-[120%] md:leading-[100%] tracking-[0%] text-center text-[#fff] px-[14px] py-[12px]">
            RentIt is by far the best website in Nigeria. The drama and stress
            it takes to find agents in your city is ridiculous.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
