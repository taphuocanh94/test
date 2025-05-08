'use client'
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href={"/posts"} className="text-blue-700 underline"> Posts </Link>
    </>
  );
}
