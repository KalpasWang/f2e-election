import React from "react";
import { cn, Image } from "@heroui/react";
import NextImage from "next/image";

type Role = "role1" | "role2" | "role3" | "role4" | "role5" | "role6";

const roleImgs: Record<Role, string> = {
  role1: "/role1.webp",
  role2: "/role2.webp",
  role3: "/role3.webp",
  role4: "/role4.webp",
  role5: "/role5.webp",
  role6: "/role6.webp",
};

type Props = {
  role: Role;
  wrapperClass?: string;
  imgClass?: string;
};

const HomeRoleImage = ({ role, wrapperClass, imgClass }: Props) => {
  return (
    <Image
      as={NextImage}
      priority
      src={roleImgs[role]}
      alt="背景人物"
      width={256}
      height={256}
      classNames={{
        wrapper: cn("overflow-hidden", wrapperClass),
        img: cn("translate-y-1/10 !h-auto", imgClass),
      }}
    />
  );
};

HomeRoleImage.displayName = "HomeRoleImage";
export default HomeRoleImage;
