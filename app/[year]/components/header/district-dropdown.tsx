"use client";
import React, { useCallback, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";
import useElectionStore from "@/hooks/useElectionStore";
import ArrowDown from "../icons/arrow-down";
import Search from "../icons/search";
import { countyNames } from "@/config/electionData";
import { County } from "@/types";
import { towns } from "@/data";
import Divider from "../icons/divider";

type Props = {};

export default function DistrictDropdown({}: Props) {
  const store = useElectionStore((state) => ({
    isLoaded: state.isLoaded,
    selectedCounty: state.selectedCounty,
    selectedTown: state.selectedTown,
    setSelectedCounty: state.setSelectedCounty,
    setSelectedTown: state.setSelectedTown,
  }));
  const townOptions = useMemo<string[]>(() => {
    const options = towns.features
      .filter((f) => f.properties.countyName === store.selectedCounty)
      .map((f) => f.properties.townName);
    options.unshift("全部");
    return options;
  }, [store.selectedCounty]);

  const onCountyChange = useCallback(
    (keys: Selection) => {
      const v = Array.from(keys)[0] as County;
      store.setSelectedCounty(v);
    },
    [store]
  );

  const onTownChange = useCallback(
    (keys: Selection) => {
      const value = Array.from(keys)[0] as string;
      store.setSelectedTown(value);
    },
    [store]
  );

  return (
    <div className="inline">
      {/* 選擇縣市 */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            isDisabled={!store.isLoaded}
            color="default"
            radius="full"
            className="rounded-tr-none rounded-br-none"
            startContent={<Search />}
            endContent={<ArrowDown />}
          >
            {store.selectedCounty}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="選擇縣市"
          variant="flat"
          classNames={{
            list: "bg-background text-foreground rounded h-[15rem] overflow-auto",
          }}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={store.selectedCounty}
          onSelectionChange={onCountyChange}
        >
          {countyNames.map((name) => (
            <DropdownItem key={name}>{name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* 選擇鄉鎮市區 */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            isDisabled={!store.isLoaded || store.selectedCounty === "全部"}
            color="default"
            radius="full"
            className="rounded-tl-none rounded-bl-none relative top-[1px]"
            startContent={<Divider />}
            endContent={<ArrowDown />}
          >
            {store.selectedTown}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="選擇鄉鎮市區"
          variant="flat"
          classNames={{
            list: "bg-background text-foreground rounded max-h-[15rem] overflow-auto",
          }}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={store.selectedTown}
          onSelectionChange={onTownChange}
        >
          {townOptions.map((name) => (
            <DropdownItem key={name}>{name}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
