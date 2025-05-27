import ListIcon from "../assets/item-icon.png";
import ListStat from "../assets/list-stat.png";

const RentInfo = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 overflow-x-hidden h-fit">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start pt-[40px] md:pt-[60px] pb-[25px] gap-8 md:gap-6">
        <div className="flex flex-col justify-between h-auto md:h-[400px] w-full md:w-[45%]">
          <h3 className="w-full md:w-[352px] lg:w-[452px] font-kaisei font-normal text-[28px] lg:text-[36px] text-[#000] leading-[120%] md:leading-[100%] tracking-[0%] text-center md:text-left mb-8 md:mb-0">
            We are trusted by over{" "}
            <span className="text-[#AAAAAA]">100 Million</span> clients looking
            to <span className="text-[#337E66]">Rent</span> or <span className="text-[#337E66]">Buy</span>.
          </h3>
          <div className="w-full">
            <img
              src={ListStat}
              alt="list stat"
              className="w-[198px]  object-cover mx-auto md:mx-[0]"
            />
            <div className="flex justify-center md:justify-start gap-[13px] mt-[24px] text-center">
              <div>
                <div className="font-semibold text-[18px] md:text-[20px] text-[#000] leading-[100%] tracking-[0%] mb-[5px]">
                  20M
                </div>
                <p className="font-[300] text-[10px] leading-[100%] tracking-[0%]">
                  Rentals
                </p>
              </div>
              <div>
                <div className="font-semibold text-[18px] md:text-[20px] text-[#000] leading-[100%] tracking-[0%] mb-[5px]">
                  20M
                </div>
                <p className="font-[300] text-[10px] leading-[100%] tracking-[0%]">
                  Happy buyers
                </p>
              </div>
              <div>
                <div className="font-semibold text-[18px] md:text-[20px] text-[#000] leading-[100%] tracking-[0%] mb-[5px]">
                  4.8
                </div>
                <p className="font-[300] text-[10px] leading-[100%] tracking-[0%]">
                  Positive rating
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[2px] h-[108px] border-[2px] border-[#000]"></div>

        <div className="w-full md:w-[45%] space-y-6">
          <div className="w-full border border-[#D6D8E7] rounded-tr-[40px] rounded-bl-[40px] px-4 sm:px-6 py-4 flex gap-4 sm:gap-6">
            <img
              src={ListIcon}
              alt="list icon"
              className="object-cover w-[24px] md:w-[28px] h-[24px] md:h-[28px] flex-shrink-0"
            />
            <div>
              <h4 className="font-[600] text-[18px] md:text-[20px] text-[#000] leading-[120%] md:leading-[100%] tracking-[0%] mb-3">
                Explore great neighborhood
              </h4>
              <p className="font-normal text-[14px] text-[#000] leading-[120%] md:leading-[100%]">
                Move into a lovely community without having to search for so
                long
              </p>
            </div>
          </div>

          <div className="w-full border border-[#D6D8E7] rounded-tr-[40px] rounded-bl-[40px] px-4 sm:px-6 py-4 flex gap-4 sm:gap-6">
            <img
              src={ListIcon}
              alt="list icon"
              className="object-cover w-[24px] md:w-[28px] h-[24px] md:h-[28px] flex-shrink-0"
            />
            <div>
              <h4 className="font-[600] text-[18px] md:text-[20px] text-[#000] leading-[120%] md:leading-[100%] tracking-[0%] mb-3">
                Know more information before making a move
              </h4>
              <p className="font-normal text-[14px] text-[#000] leading-[120%] md:leading-[100%]">
                Get details about inspection fees and house types before making
                a move.
              </p>
            </div>
          </div>

          <div className="w-full border border-[#D6D8E7] rounded-tr-[40px] rounded-bl-[40px] px-4 sm:px-6 py-4 flex gap-4 sm:gap-6">
            <img
              src={ListIcon}
              alt="list icon"
              className="object-cover w-[24px] md:w-[28px] h-[24px] md:h-[28px] flex-shrink-0"
            />
            <div>
              <h4 className="font-[600] text-[18px] md:text-[20px] text-[#000] leading-[120%] md:leading-[100%] tracking-[0%] mb-3">
                Have options
              </h4>
              <p className="font-normal text-[14px] text-[#000] leading-[120%] md:leading-[100%]">
                Get a chance to speak to more than one agent and have options to
                choose from
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentInfo;
