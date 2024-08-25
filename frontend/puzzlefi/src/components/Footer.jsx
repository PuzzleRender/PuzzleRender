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
      </div>
    </footer>
  );
}

export default Footer;
