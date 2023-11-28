import Logo from "@/components/my-logo";
import { electionData, electionYears } from "@/config/electionData";
import { Button, Image, cn } from "@nextui-org/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { mantouSans } from "./fonts";

export default function Home() {
  return (
    <main className="h-screen bg-background flex flex-col justify-between items-center">
      {/* logo and title, button */}
      <div className="container pt-96">
        <Logo className="block mx-auto w-[137px] h-[86px]" />
        <h1 className={cn(mantouSans.className, "text-center")}>
          台灣歷年總統 都幾?
        </h1>
        <p className="py-24 text-primary text-2xl font-bold text-center">
          選擇查詢年份
        </p>
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-stretch gap-16 pb-48">
          {electionYears.map((year) => (
            <Button
              key={year}
              as={NextLink}
              href={`/${year}`}
              color="default"
              radius="full"
              isDisabled={electionData[year].disable}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-nowrap justify-between w-full">
        <Image
          as={NextImage}
          priority
          src="/role1.webp"
          alt="背景人物1"
          width={256}
          height={256}
          classNames={{
            wrapper: "hidden xl:block",
            img: "w-256 h-256 hidden xl:block",
          }}
        />
        <Image
          as={NextImage}
          priority
          src="/role2.webp"
          alt="背景人物2"
          width={256}
          height={256}
          classNames={{
            wrapper: "hidden md:block",
            img: "w-100 h-100 hidden lg:w-192 lg:h-192 xl:w-256 xl:h-256 md:block",
          }}
        />
        <Image
          as={NextImage}
          priority
          src="/role3.webp"
          alt="背景人物3"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
          as={NextImage}
          priority
          src="/role4.webp"
          alt="背景人物4"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
          as={NextImage}
          priority
          src="/role5.webp"
          alt="背景人物5"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
          as={NextImage}
          priority
          src="/role6.webp"
          alt="背景人物6"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
      </div>
    </main>
  );
}
