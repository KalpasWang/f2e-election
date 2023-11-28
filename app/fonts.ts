import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
export const mantouSans = localFont({
  src: "../MantouSans-Regular.ttf",
  display: "swap",
});
