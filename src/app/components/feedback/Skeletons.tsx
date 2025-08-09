function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-[300px] bg-gray-medium rounded" />
      <div className="flex flex-col gap-4">
        <div className="h-6 bg-gray-medium rounded w-3/4" />
        <div className="h-4 bg-gray-medium rounded w-full" />
        <div className="h-4 bg-gray-medium rounded w-2/3" />
      </div>
    </div>
  );
}

function AboutSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 my-16 animate-pulse">
      <div className="shrink-0 flex justify-center">
        <div className="w-[400px] h-[400px] bg-gray-medium rounded border border-gray-400" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-2 lg:ml-8 lg:w-1/2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-medium rounded-full" />
          <div className="w-32 h-4 bg-gray-medium rounded" />
        </div>
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-medium rounded" />
          <div className="w-full h-4 bg-gray-medium rounded" />
          <div className="w-2/3 h-4 bg-gray-medium rounded" />
        </div>
        <div className="flex justify-center lg:justify-start mt-8">
          <div className="w-40 h-10 bg-gray-medium rounded" />
        </div>
      </div>
    </div>
  );
}

function StacksSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-medium animate-pulse">
      <div className="flex justify-center flex-wrap gap-4 lg:justify-between border border-gray-medium py-4 px-8 w-full">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-gray-medium rounded-full" />
            <div className="w-20 h-4 bg-gray-medium rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="w-full h-[354px] bg-gray-medium rounded" />
      <div className="h-6 w-3/4 bg-gray-medium rounded" />
      <div className="h-4 w-2/3 bg-gray-medium rounded" />
      <div className="flex gap-4 mt-4">
        <div className="w-24 h-10 bg-gray-medium rounded" />
        <div className="w-32 h-10 bg-gray-medium rounded" />
      </div>
    </div>
  );
}

export { ProjectSkeleton, AboutSkeleton, StacksSkeleton, ProjectCardSkeleton };
