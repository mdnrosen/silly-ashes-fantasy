import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-15 md:h-20 w-full mx-auto p-4 bg-off-white border-b-4 border-off-white text-dark-blue">
      LOGO
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
    </div>
  );
};

export default Navbar;
