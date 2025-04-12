import Logo from "@/components/my-logo";
import { electionData, electionYears } from "@/config/electionData";
import { Button, Image, cn } from "@heroui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { mantouSans } from "./fonts";
import HomeRoleImage from "@/components/HomeRoleImage";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between items-center">
      {/* logo and title, button */}
      <div className="container pt-96px">
        <Logo className="block mx-auto w-[137px] h-[86px]" />
        <h1 className={cn(mantouSans.className, "text-center")}>
          台灣歷年總統 都幾?
        </h1>
        <p className="py-24px text-primary text-2xl font-bold text-center">
          選擇查詢年份
        </p>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-stretch gap-16px pb-48px">
          {electionYears.map((year) => (
            <Button
              key={year}
              as={NextLink}
              href={`/${year}`}
              color="default"
              radius="full"
              isDisabled={electionData[year].disable}
              className="py-12px"
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
      <footer className="w-full flex justify-between items-end">
        <HomeRoleImage role="role1" wrapperClass="hidden xl:block" />
        <HomeRoleImage role="role2" wrapperClass="hidden md:block" />
        <HomeRoleImage role="role3" />
        <HomeRoleImage role="role4" />
        <HomeRoleImage role="role5" />
        <HomeRoleImage role="role6" />
      </footer>
    </main>
  );
}
