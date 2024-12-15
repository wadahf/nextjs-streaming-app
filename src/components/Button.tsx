import { cn } from "@/utils/helpers";

export const buttonClassName =
  "flex items-center justify-center gap-2 rounded-md bg-blue-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-600 disabled:bg-blue-200";

export default function Button({
  className,

  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonClassName, className)} {...props} />;
}
