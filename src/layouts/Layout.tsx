import { Link, useLocation } from "react-router-dom";

import { useSearchDispatch } from "../context/SearchContext";

import { cn } from "../utils/helpers";

import { Icon, IconSizes, Icons } from "../components/Icon";
import WebPlayer from "../components/WebPlayer/WebPlayer";
import Input from "../components/ui/Input";
import { ROUTES } from "../constants/app.constants";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  const { pathname } = useLocation();
  const dispatch = useSearchDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(event.target.value);
  };

  return (
    <div className={cn(["flex flex-col gap-[34px] pt-[30px]", className])}>
      <header className="container px-10 flex gap-[15px] mx-auto">
        {pathname !== ROUTES.HOME && (
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
      <main className="container px-10 mx-auto min-h-[calc(100vh-32px)]">
        {children}
      </main>
      <footer className="sticky bottom-0">
        <WebPlayer />
      </footer>
    </div>
  );
};

export default Layout;
