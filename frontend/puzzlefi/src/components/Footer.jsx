import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <footer className="bg-indigo-700 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Puzzlrender. All rights reserved.
        </p>
        <a
          href="https://github.com/PuzzleRender/PuzzleRender"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white underline hover:text-gray-300"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
