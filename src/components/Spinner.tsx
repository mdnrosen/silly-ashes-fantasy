import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => (
  <div className="z-50 bg-white absolute h-full w-full flex justify-center items-center opacity-70">
    <div className="text-dark-blue text-center">
      <AiOutlineLoading3Quarters size={50} className="animate-spin text-4xl" />
    </div>
  </div>
);

export default Spinner;
