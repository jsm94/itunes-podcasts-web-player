import { useSearchDispatch } from "../context/SearchContext";

import { cn } from "../utils/helpers";

import { Icon, Icons } from "../components/Icon";
import WebPlayer from "../components/WebPlayer/WebPlayer";
import Input from "../components/ui/Input";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  const dispatch = useSearchDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(event.target.value);
  };

  return (
    <div className={cn(["flex flex-col gap-[34px] pt-[30px]", className])}>
      <header className="container mx-auto">
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
