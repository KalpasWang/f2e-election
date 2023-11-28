import React from "react";
import Header from "./components/header/header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="lg:h-screen w-full flex flex-col items-stretch">
      <header>
        <Header />
      </header>
      <main className="flex-grow lg:max-h-[calc(100vh-64.8px)]">
        {children}
      </main>
    </div>
  );
}
