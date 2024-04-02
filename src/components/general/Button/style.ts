import { tv } from "tailwind-variants";

export const styles = tv({
  base: "rounded-lg px-5 py-2.5 text-center text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
  defaultVariants: { type: "primary" },
  variants: {
    type: {
      primary: "from-primary-500 via-primary-600 to-primary-700 text-white focus-visible:ring-primary-300 dark:focus-visible:ring-primary-800",
      danger:
        "from-danger-400 via-danger-500 to-danger-600 text-white focus-visible:ring-danger-300 dark:from-danger-500 dark:via-danger-600 dark:to-danger-700 dark:focus-visible:ring-danger-800",
      gray: "border border-solid border-neutral-border bg-neutral-bg-container text-neutral-text hover:border-neutral-text-tertiary focus-visible:ring-neutral-border-secondary disabled:hover:border-neutral-border",
      text: "text-neutral-text hover:bg-neutral-fill-secondary disabled:hover:bg-transparent",
    },
  },
  compoundVariants: [
    {
      type: ["primary", "danger"],
      class: "bg-gradient-to-r hover:bg-gradient-to-br disabled:hover:bg-gradient-to-r",
    },
  ],
});
