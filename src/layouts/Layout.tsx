type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header className="container mx-auto">
        <input type="text" placeholder="podcast" />
      </header>
      <main className="container mx-auto">{children}</main>
      <footer>webplayer</footer>
    </div>
  );
};

export default Layout;
