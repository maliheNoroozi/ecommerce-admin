import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { number } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormatter() {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}
