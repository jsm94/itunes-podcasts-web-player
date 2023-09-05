import { cn } from "../utils/helpers";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const ErrorLayout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn(["flex flex-col gap-[34px] pt-[30px]", className])}>
      <main className="container px-10 mx-auto min-h-[calc(100vh-32px)]">
        {children}
      </main>
    </div>
  );
};

export default ErrorLayout;
