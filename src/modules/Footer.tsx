const byMeACoffeeURL = import.meta.env.VITE_BMAC_URL;

const Footer = () => {
  return (
    <footer className="fixed h-10 bottom-0 left-0 w-full bg-dark-blue p-2 text-off-white flex flex-col justify-center align-between items-center text-center space-y-1">
      <p className="text-xs">
        Like it?{".. "}
        <a
          className="hover:underline text-blue-400"
          href={byMeACoffeeURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Me a Beer
        </a>
      </p>
    </footer>
  );
};
export default Footer;
