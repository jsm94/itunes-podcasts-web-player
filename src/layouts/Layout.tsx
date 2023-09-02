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
      <header className="container flex gap-4 mx-auto">
        {pathname !== ROUTES.HOME && (
          <Link to={ROUTES.HOME}>
            <div className="flex p-[15px] items-center align-center bg-eerie-black rounded-[15px]">
              <Icon icon={Icons.BACK} size={IconSizes.MEDIUM} />
            </div>
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
      <main className="container mx-auto min-h-[calc(100vh-32px)]">
        {children}
      </main>
      <footer className="sticky bottom-0">
        <WebPlayer />
      </footer>
    </div>
  );
};

export default Layout;
