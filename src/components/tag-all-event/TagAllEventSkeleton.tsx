export const SkeletonCard = () => (
  <div class="h-[120px] animate-pulse rounded-xl border border-gray-200 p-4 shadow dark:border-gray-700">
    <div class="mb-5 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
    <div class="mb-5 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
    <div class="h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
  </div>
);

export const TagAllEventSkeleton = () => {
  return (
    <div class="space-y-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
