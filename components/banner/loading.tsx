"use client"

// Loading Skeleton Components
const EventCardSkeleton = () => (
  <div className="px-1.5 w-36 flex-none first:pl-0">
    <div className="rounded-xl h-24 bg-gray-200 animate-pulse overflow-hidden">
      <div className="w-full h-full bg-gray-300" />
    </div>
    <div className="mt-2">
      <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
      <div className="h-3 w-24 bg-gray-200 animate-pulse rounded mt-1.5" />
    </div>
  </div>
)

const AllEventsCardSkeleton = () => (
  <div className="px-1.5 last:pr-0">
    <div className="bg-gray-200 animate-pulse rounded-xl w-32 h-24" />
  </div>
)

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="banner-card col-span-4 tablet-lg:col-span-6 pb-3 pl-3 tablet-lg:pl-6 tablet-lg:pb-0 order-first tablet-lg:order-last">
      <div className="flex flex-col space-y-3 h-full">
        {/* Title and description skeleton */}
        <div className="w-full">
          <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mt-2" />
        </div>

        {/* Events cards skeleton */}
        <div className="flex space-x-6 h-full pb-3">
          <div className="bg-opacity-60 flex divide-x rail-divide overflow-x-auto overflow-y-hidden no-scrollbar pr-3">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <AllEventsCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
