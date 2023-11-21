import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  cn,
} from "@nextui-org/react";
import Logo from "@/components/logo";
import { mantouSans } from "../layout";
import Facebook from "./components/icons/facebook";
import Instagram from "./components/icons/instagram";
import Youtube from "./components/icons/youtube";

type Props = {};

export default function Header({}: Props) {
  return (
    <Navbar position="static" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-24">
          <Logo className="w-[53px] h-[33px] pr-8" />
          <Link
            href="/"
            className={cn(
              mantouSans.className,
              "text-content1 text-[1.75rem] font-blod leading-normal"
            )}
          >
            台灣歷年總統 都幾?
          </Link>
        </NavbarBrand>
        <NavbarItem>{/* 選擇年分 */}</NavbarItem>
        <NavbarItem>{/* 選擇地區 */}</NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-16">
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
