"use client"

// Loading Skeleton Components
const EventCardSkeleton = () => (
  <div className="px-1.5 w-36 flex-none first:pl-0">
    <div className="rounded-xl h-24 bg-gray-200 animate-pulse overflow-hidden">
      <div className="w-full h-full bg-gray-300" />
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
    <div className="banner-card col-span-4 tablet-lg:col-span-6 pb-3 tablet-lg:pb-0 order-first tablet-lg:order-last">
      <div className="flex flex-col space-y-3 h-full">
        {/* Events cards skeleton */}
        <div className="flex space-x-6 h-full pb-3">
          <div className="bg-opacity-60 flex divide-x rail-divide overflow-x-auto overflow-y-hidden no-scrollbar pr-3">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
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
