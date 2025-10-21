const byMeACoffeeURL = import.meta.env.VITE_BMAC_URL;

const Footer = () => {
  console.log(byMeACoffeeURL);
  return (
    // stick to bottom of page
    <footer className="fixed h-10 bottom-0 left-0 w-full bg-off-white text-center p-2">
      <p className="text-sm text-gray-600">
        Like it?{" "}
        <a
          className="hover:underline"
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
