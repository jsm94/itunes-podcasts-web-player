import { forwardRef } from "react";
import { cn } from "../utils/helpers";

type TableProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

type TableSectionProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableSectionElement>;

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableRowElement>;

type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLTableCellElement>;

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <table className={cn("table-auto", className)} ref={ref} {...props}>
        {children}
      </table>
    );
  }
);

const TableHead = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead className={cn(className)} ref={ref} {...props}>
        {children}
      </thead>
    );
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tbody className={cn(className)} ref={ref} {...props}>
        {children}
      </tbody>
    );
  }
);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tr className={cn(className)} ref={ref} {...props}>
        {children}
      </tr>
    );
  }
);

const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <th className={cn(className)} ref={ref} {...props}>
        {children}
      </th>
    );
  }
);

const TableData = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <td className={cn(className)} ref={ref} {...props}>
        {children}
      </td>
    );
  }
);

export { Table, TableBody, TableData, TableHead, TableHeader, TableRow };
