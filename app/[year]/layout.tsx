import React from "react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen w-full flex flex-col items-stretch">
      <div>
        <Header />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
