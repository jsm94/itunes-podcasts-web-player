import { ReactNode, useMemo } from "react";
import { cn } from "../utils/helpers";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

type DataRender = {
  className?: string;
  render: (data: any) => ReactNode;
};

type DataHeadings = {
  data: string[];
  sizes: string[];
  className?: string;
};

type DataTableOptions = {
  headings: DataHeadings;
  dataRenders: DataRender[];
};

type DataTableProps = {
  className?: string;
  dataset: any[];
  options: DataTableOptions;
};

const DataTable = ({ className, dataset, options }: DataTableProps) => {
  const { headings, dataRenders } = options;
  const { data, sizes, className: headingClassName } = headings;

  const dataTableRender = useMemo(() => dataRenders, [dataRenders]);
  const headingsMem = useMemo(() => data, [data]);

  return (
    <Table className={cn(className)}>
      <TableHead>
        <TableRow>
          {headingsMem.map((heading, i) => (
            <TableHeader
              className={cn([
                sizes[i],
                "text-white pb-6 border-b border-white border-opacity-5 text-opacity-30 text-sm font-semibold text-left",
                headingClassName,
              ])}
              key={heading}
            >
              {heading}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataset?.map((data) => (
          <TableRow
            className="border-b border-white border-opacity-5"
            key={data.id}
          >
            {dataTableRender.map((dataRender, i) => (
              <TableData
                className={cn([
                  "py-3.5 pr-8 text-white text-opacity-30 text-base font-medium",
                  dataRender.className,
                ])}
                key={`table-data-${i}`}
              >
                {dataRender.render(data)}
              </TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
