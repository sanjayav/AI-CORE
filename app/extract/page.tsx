"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { ExtractMode } from "@/components/modes/ExtractMode";

export default function ExtractPage() {
  return (
    <MainLayout>
      <ExtractMode />
    </MainLayout>
  );
}
