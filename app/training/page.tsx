"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { TrainingMode } from "@/components/modes/TrainingMode";

export default function TrainingPage() {
  return (
    <MainLayout>
      <TrainingMode />
    </MainLayout>
  );
}
