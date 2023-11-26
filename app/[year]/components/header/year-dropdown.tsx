"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import useElectionStore from "@/hooks/useElectionStore";
import { electionDataArray } from "@/config/electionData";
import ArrowDown from "../icons/arrow-down";

type Props = {};

export default function YearDropdown({}: Props) {
  const isLoaded = useElectionStore((state) => state.isLoaded);
  const pathname = usePathname();
  const year = pathname.slice(1);

  return (
    <div className="inline">
      <h6 className="inline-block text-content1 pr-16">選擇年份</h6>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isDisabled={!isLoaded}
            color="default"
            radius="full"
            endContent={<ArrowDown />}
          >
            {year}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="選擇年份"
          variant="flat"
          classNames={{
            list: "bg-background text-foreground rounded",
          }}
          disallowEmptySelection
          selectionMode="single"
        >
          {electionDataArray
            .filter((d) => !d.disable)
            .map((data) => (
              <DropdownItem key={data.year} href={`/${data.year}`}>
                {data.year}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
