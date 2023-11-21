import Logo from "@/components/logo";
import { electionYears } from "@/config/electionData";
import { Button, Image } from "@nextui-org/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <main className="h-screen bg-background flex flex-col justify-between items-center">
      {/* logo and title, button */}
      <div className="container pt-96">
        <Logo className="block mx-auto" />
        <h1 className="text-center">台灣歷年總統 都幾?</h1>
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
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-nowrap justify-between w-full">
        <Image
          src="/role1.webp"
          alt="背景人物1"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 hidden lg:w-192 lg:h-192 xl:w-256 xl:h-256 xl:block",
          }}
        />
        <Image
          src="/role2.webp"
          alt="背景人物2"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 hidden lg:w-192 lg:h-192 xl:w-256 xl:h-256 lg:block",
          }}
        />
        <Image
          src="/role3.webp"
          alt="背景人物3"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
          src="/role4.webp"
          alt="背景人物4"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
          src="/role5.webp"
          alt="背景人物5"
          width={256}
          height={256}
          classNames={{
            img: "w-100 h-100 lg:w-192 lg:h-192 xl:w-256 xl:h-256",
          }}
        />
        <Image
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
