import React from "react";
import { User } from "@nextui-org/react";

type Props = {
  name: React.ReactNode;
  description: number;
  img: string;
};

export default function Avatar({ name, description, img }: Props) {
  return (
    <User
      name={name}
      description={Intl.NumberFormat("en-US").format(description) + "票"}
      classNames={{
        description: "font-bold",
      }}
      avatarProps={{
        src: img,
        className: "rounded-none",
      }}
    />
  );
}
