import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width - accepts Tailwind width classes like "w-24", "w-full", "w-[200px]" */
  width?: string;
  /** Height - accepts Tailwind height classes like "h-4", "h-10", "h-[200px]" */
  height?: string;
  /** Makes the skeleton a circle (sets rounded-full) */
  circle?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  circle,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-linear-to-r before:from-transparent before:via-foreground/6 before:to-transparent",
        "before:animate-[shimmer_2s_infinite]",
        circle && "rounded-full",
        width,
        height,
        className
      )}
      {...props}
    />
  );
}
