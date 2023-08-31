import WebPlayer from "../components/WebPlayer";
import { useSearchDispatch } from "../context/SearchContext";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useSearchDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(event.target.value);
  };

  return (
    <div>
      <header className="container mx-auto">
        <input type="text" placeholder="podcast" onChange={handleSearch} />
      </header>
      <main className="container mx-auto">{children}</main>
      <footer>
        <WebPlayer />
      </footer>
    </div>
  );
};

export default Layout;
