const TagIcon = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.045 3.007 12.31 3a1.965 1.965 0 0 0-1.4.585l-7.33 7.394a2 2 0 0 0 0 2.805l6.573 6.631a1.957 1.957 0 0 0 1.4.585 1.965 1.965 0 0 0 1.4-.585l7.409-7.477A2 2 0 0 0 21 11.479v-5.5a2.972 2.972 0 0 0-2.955-2.972Zm-2.452 6.438a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
  </svg>
);

export const EmptyState = () => (
  <div class="flex flex-col items-center justify-center space-y-6 rounded-md p-6 py-32">
    <div class="flex size-32 items-center justify-center rounded-full bg-primary/70 text-white">
      <TagIcon />
    </div>
    <p class="text-lg font-medium text-primary">您目前没有標籤</p>
  </div>
);
