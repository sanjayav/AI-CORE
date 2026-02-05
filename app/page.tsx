"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { AskMode } from "@/components/modes/AskMode";

export default function Home() {
  return (
    <MainLayout>
      <AskMode />
    </MainLayout>
  );
}
