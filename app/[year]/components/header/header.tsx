import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  cn,
} from "@nextui-org/react";
import Logo from "@/components/my-logo";
import { mantouSans } from "../../../fonts";
import Facebook from "../icons/facebook";
import Instagram from "../icons/instagram";
import Youtube from "../icons/youtube";
import YearDropdown from "./year-dropdown";
import DistrictDropdown from "./district-dropdown";

type Props = {};

export default function Header({}: Props) {
  return (
    <Navbar
      position="static"
      isBordered
      classNames={{ wrapper: "flex-col h-fit lg:flex-row" }}
    >
      <NavbarContent justify="start" className="pt-12 lg:py-[11px]">
        <NavbarBrand className="mr-24">
          <Logo className="w-[53px] h-[33px] pr-8" />
          <Link
            href="/"
            className={cn(
              mantouSans.className,
              "text-content1 text-xl lg:text-[1.75rem] leading-normal"
            )}
          >
            台灣歷年總統 都幾?
          </Link>
        </NavbarBrand>
        <NavbarItem className="lg:hidden">
          <YearDropdown />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex flex-nowrap items-center gap-16">
          <>
            <YearDropdown />
            <DistrictDropdown />
          </>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="block pb-12 lg:hidden">
        <NavbarItem>
          <DistrictDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden lg:flex gap-16">
        <NavbarItem>分享</NavbarItem>
        <NavbarItem>
          <Facebook />
        </NavbarItem>
        <NavbarItem>
          <Instagram />
        </NavbarItem>
        <NavbarItem>
          <Youtube />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
