import { cn } from "../utils/helpers";

import Header from "../components/Header";
import WebPlayer from "../components/WebPlayer/WebPlayer";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn(["flex flex-col gap-[34px] pt-[30px]", className])}>
      <Header className="container px-10 mx-auto" />
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
