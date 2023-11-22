import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

type Props = {};

export default function YearDropdown({}: Props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div className="inline">
      <h6 className="inline-block text-content1 pr-16">選擇年份</h6>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          // onSelectionChange={setSelectedKeys}
        >
          <DropdownItem key="text">Text</DropdownItem>
          <DropdownItem key="number">Number</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
          <DropdownItem key="single_date">Single Date</DropdownItem>
          <DropdownItem key="iteration">Iteration</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
