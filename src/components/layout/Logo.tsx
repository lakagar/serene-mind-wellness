
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative w-10 h-10 bg-gradient-to-br from-wellness-primary to-wellness-secondary rounded-full flex items-center justify-center shadow-lg">
        <span className="text-xl font-bold text-white">HM</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-wellness-primary dark:text-white">Healing</span>
        <span className="text-xl font-bold text-wellness-secondary dark:text-white -mt-1">Minds</span>
      </div>
    </Link>
  );
};

export default Logo;
