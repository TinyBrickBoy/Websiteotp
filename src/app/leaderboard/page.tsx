"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import TopPage from "@/components/page/top";

export default function Leaderboards() {
  return (
    <>
      <TopPage />
      <section className="bg-gray-950 pt-36">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-5">LEADERBOARDS</h1>
          {/*  */}
          <div className="flex py-4">
            <div className="flex flex-col justify-center">
              <Image
                src={"/placeholder.png"}
                alt={"Pixels"}
                width={500}
                height={250}
              />
            </div>
            <div className="ml-4">
              <Link
                href="/leaderboard/pixels"
                className="text-xl font-bold mt-4 text-green-200 underline">
                Pixels
              </Link>
              <p>
                This is the leaderboard for the Pixels, so the currency of
                OnThePixel.net
              </p>
            </div>
          </div>
          {/*  */}
          <div className="flex py-4">
            <div className="flex flex-col justify-center">
              <Image
                src={"/placeholder.png"}
                alt={"BedWars"}
                width={500}
                height={250}
              />
            </div>
            <div className="ml-4">
              <Link
                href="/leaderboard/bedwars"
                className="text-xl font-bold mt-4 text-green-200 underline">
                BedWars
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
                id praesentium impedit veritatis aut, odit debitis cupiditate
                enim harum fuga aspernatur? Accusantium, animi quisquam iste
                nemo odit architecto perferendis in.
              </p>
            </div>
          </div>
          {/*  */}
          <div className="flex py-4">
            <div className="flex flex-col justify-center">
              <Image
                src={"/placeholder.png"}
                alt={"BedWars"}
                width={500}
                height={250}
              />
            </div>
            <div className="ml-4">
              <Link
                href="/leaderboard/parkour"
                className="text-xl font-bold mt-4 text-green-200 underline">
                Parkour
              </Link>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
                id praesentium impedit veritatis aut, odit debitis cupiditate
                enim harum fuga aspernatur? Accusantium, animi quisquam iste
                nemo odit architecto perferendis in.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
