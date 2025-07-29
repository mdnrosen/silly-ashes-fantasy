const Footer = () => {
  return (
    // stick to bottom of page
    <footer className="fixed bottom-0 left-0 w-full bg-off-white text-center p-4">
      <p className="text-sm text-gray-600">
        Like it? Buy me a coffee at{" "}
        <a
          href="https://www.buymeacoffee.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Me a Coffee
        </a>
      </p>
    </footer>
  );
};
export default Footer;
