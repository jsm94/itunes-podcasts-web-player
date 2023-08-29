type TableProps = {
  children: React.ReactNode;
};

const Table = ({ children }: TableProps) => {
  return <table className="table-auto">{children}</table>;
};

const TableHead = ({ children }: TableProps) => {
  return <thead>{children}</thead>;
};

const TableBody = ({ children }: TableProps) => {
  return <tbody>{children}</tbody>;
};

const TableRow = ({ children }: TableProps) => {
  return <tr>{children}</tr>;
};

const TableHeader = ({ children }: TableProps) => {
  return <th>{children}</th>;
};

const TableData = ({ children }: TableProps) => {
  return <td>{children}</td>;
};

export { Table, TableBody, TableData, TableHead, TableHeader, TableRow };
