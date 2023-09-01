import { useSearchDispatch } from "../context/SearchContext";

import { cn } from "../utils/helpers";

import WebPlayer from "../components/WebPlayer";

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
    <div className={cn(["bg-neutral-950", className])}>
      <header className="container mx-auto">
        <input type="text" placeholder="podcast" onChange={handleSearch} />
      </header>
      <main className="container mx-auto">{children}</main>
      <footer className="sticky bottom-0 bg-black">
        <WebPlayer />
      </footer>
    </div>
  );
};

export default Layout;
