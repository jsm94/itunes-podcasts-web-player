type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <span>podcast</span>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
