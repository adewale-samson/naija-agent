import { RiInstagramFill } from "react-icons/ri";
import { IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <footer
      className="font-montagu flex flex-row flex-wrap p-4 sm:p-6 md:p-8 lg:p-[48px] 
      gap-6 sm:gap-8 md:gap-12 lg:gap-[150px] bg-[#000] text-[#fff]"
    >
      <div className="self-start sm:self-center">
        <h4 className="font-bold text-[14px] sm:text-[16px] leading-[100%] tracking-[0%] mb-[13px] ">
          Contact us
        </h4>
      </div>
      <ul className="w-auto">
        <li className="font-bold text-[14px] sm:text-[16px] leading-[100%] tracking-[0%] mb-[13px]">
          Telephone
        </li>
        <li className="font-medium text-[11px] sm:text-[12px] leading-[100%] tracking-[0%] mb-[2px]">
          09130062618
        </li>
        <li className="font-medium text-[11px] sm:text-[12px] leading-[100%] tracking-[0%] mb-[2px]">
          09036117226
        </li>
      </ul>
      <ul className="">
        <li className="font-bold text-[14px] sm:text-[16px] leading-[100%] tracking-[0%] mb-[13px]">
          Social Media
        </li>
        <li className="flex items-center gap-[8px] font-medium text-[11px] sm:text-[12px] leading-[100%] tracking-[0%] mb-[2px]">
          <RiInstagramFill className="text-[#fff] text-[20px] sm:text-[24px]" />{" "}
          9jaagents
        </li>
        <li className="flex items-center gap-[8px] font-medium text-[11px] sm:text-[12px] leading-[100%] tracking-[0%] mb-[2px]">
          <IoLogoTwitter className="text-[#fff] text-[20px] sm:text-[24px]" />{" "}
          9jaagents
        </li>
      </ul>
      <ul className="">
        <li className="font-bold text-[14px] sm:text-[16px] leading-[100%] tracking-[0%] mb-[13px]">
          Office Address
        </li>
        <li className="font-medium text-[11px] sm:text-[12px] leading-[100%] tracking-[0%]">
          Lagos, Nigeria
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
