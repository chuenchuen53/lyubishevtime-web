const Card = () => (
  <div class="h-20 animate-pulse rounded-xl border border-gray-200 p-4 shadow dark:border-gray-700">
    <div class="mb-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
    <div class="h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
  </div>
);

export const TagPageSkeleton = () => {
  return (
    <div class="space-y-6">
      <Card />
      <Card />
      <Card />
    </div>
  );
};
