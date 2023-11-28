import { CircularProgress } from "@nextui-org/react";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <CircularProgress color="primary" size="lg" aria-label="Loading..." />
    </div>
  );
}
