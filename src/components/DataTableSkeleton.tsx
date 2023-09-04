const DataTableSkeleton = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex gap-10 flex-col animate-pulse"
    >
      <div className="flex justify-end">
        <div className="w-28 h-12 bg-zinc-800 rounded-[15px]"></div>
      </div>
      <div className="flex gap-8">
        <div className="w-full h-5 bg-zinc-800 rounded-[15px]"></div>
        <div className="w-full h-5 bg-zinc-800 rounded-[15px]"></div>
        <div className="w-full h-5 bg-zinc-800 rounded-[15px]"></div>
        <div className="w-full h-5 bg-zinc-800 rounded-[15px]"></div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="w-full h-16 bg-zinc-800 rounded-[15px]"></div>
        <div className="w-full h-16 bg-zinc-800 opacity-70 rounded-[15px]"></div>
        <div className="w-full h-16 bg-zinc-800 opacity-50 rounded-[15px]"></div>
        <div className="w-full h-16 bg-zinc-800 opacity-30 rounded-[15px]"></div>
      </div>
    </div>
  );
};

export default DataTableSkeleton;
