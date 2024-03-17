"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";

export default function Component() {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  return (
    <div
      key="1"
      className="relative min-h-screen flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 z-[-1]">
        <Image
          alt="Background Image"
          className="object-cover w-full h-full filter brightness-75"
          height="1080"
          src="/bg.png"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width="1920"
        />
        <div className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />
      </div>
      <main className="flex flex-col items-center">
        <div className="relative mb-4">
          <Image
            alt="Small Round Image"
            height="100"
            src="/logo.png"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="250"
          />
        </div>
        <h1
          className="text-6xl font-bold mb-4"
          style={{
            color: "#fff",
            textShadow: "0 0 15px #fff",
          }}>
          OnThePixel.net
        </h1>
        <p className="mb-8 text-center">Join now - Don&#39;t play alone!</p>
        <div className="flex space-x-4">
          <Button className="bg-green-700 px-6 py-2 rounded flex w-36 items-center hover:scale-105 transition-transform duration-500">
            LEADERBOARD
          </Button>
          <Button
            className="bg-green-700 px-6 py-2 rounded flex items-center"
            onClick={() => copyToClipboard("OnThePixel.net")}>
            <FaRegCopy />
          </Button>
          <Button className="bg-green-700 px-6 py-2 rounded flex items-center w-36 hover:scale-105 transition-transform duration-500">
            TEAM
          </Button>
        </div>
      </main>
    </div>
  );
}
