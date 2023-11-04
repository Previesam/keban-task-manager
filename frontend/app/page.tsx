"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigate = useRouter().push;
  useEffect(() => {
    navigate("/overview");
  }, []);
  return (
    <main>
    </main>
  );
}
