"use client"
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function Navbar() {

  return (<>

    <div className=" flex justify-evenly gap-5 items-center m-5">

      {/* LOGO Section */}
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} width={50} height={50} alt={"ShawtY Logo"} loading="eager" />

        {/* TEXT CONTENT */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">ShawtY</h1>
          <p className="text-base">by YASHWANTH M</p>
        </div>
      </div>

      {/* GITHUB LINK Section */}
      <Link href={"https://github.com/yash-2008-yash"}>
        <BsGithub className="text-5xl rounded-full ring-1 ring-gray-900 hover:ring-gray-300 hover:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300" />
      </Link>

    </div>

  </>);
}