import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSearchDispatch } from "../context/SearchContext";

import { cn } from "../utils/helpers";

import { Icon, IconSizes, Icons } from "../components/Icon";
import Input from "../components/ui/Input";
import { ROUTES } from "../constants/app.constants";

const Header = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useSearchDispatch();

  const isHomePage = pathname === ROUTES.HOME;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isHomePage) navigate(ROUTES.HOME);
    dispatch(event.target.value);
  };
  return (
    <header className={cn(["flex gap-[15px]", className])}>
      {!isHomePage && (
        <Link
          to={ROUTES.HOME}
          className="flex p-[13px] items-center align-center hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-0 bg-eerie-black rounded-[15px]"
        >
          <Icon
            icon={Icons.BACK}
            size={IconSizes.MEDIUM}
            viewBox="-6 -2 24 24"
          />
        </Link>
      )}
      <Input
        className="w-full"
        startAdornment={
          <Icon
            icon={Icons.SEARCH}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          />
        }
        slotProps={{
          input: {
            className: "w-full",
          },
        }}
        type="text"
        placeholder="podcast"
        onChange={handleSearch}
      />
    </header>
  );
};

export default Header;
