function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse p-4 rounded-2xl border border-gray">
      <div className="h-[250px] bg-gray rounded-xl" />
    </div>
  );
}

function AboutSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-2xl animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="bg-gray h-[230px] rounded-2xl" />
        <div className="bg-gray h-[230px] rounded-2xl" />
      </div>
      <div className="flex flex-col justify-between gap-8 p-4 shadow rounded-2xl bg-background">
        <div className="bg-gray h-[80px] rounded-2xl" />
        <div className="bg-gray h-[80px] rounded-2xl" />
        <div className="bg-gray h-[200px] rounded-2xl" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-gray h-[230px] rounded-2xl" />
        <div className="bg-gray h-[230px] rounded-2xl" />
      </div>
    </div>
  );
}

function StacksSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-medium animate-pulse">
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-4 text-sm   border-t border-b border-gray py-4 lg:px-8">
        {Array.from({ length: 14 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray w-36 h-32 shadow"
          ></div>
        ))}
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div
      className={`flex flex-col gap-2 p-4 
        border-gray animate-pulse
      `}
    >
      <div className="shrink-0 rounded-2xl bg-gray shadow pt-4 w-full h-[354px]" />
    </div>
  );
}

export { ProjectSkeleton, AboutSkeleton, StacksSkeleton, ProjectCardSkeleton };
