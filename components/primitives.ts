// components/primitives.tsx
import {tv} from "tailwind-variants";

export const title = tv({
  base: "tracking-tight font-bold text-foreground",
  variants: {
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-4xl lg:text-5xl",
      lg: "text-5xl lg:text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const subtitle = tv({
  base: "text-xl text-default-600 block max-w-full",
});

export const section = tv({
  base: "flex flex-col items-start justify-start gap-4 py-8 md:py-10",
});

export const container = tv({
  base: "container mx-auto px-4",
});
