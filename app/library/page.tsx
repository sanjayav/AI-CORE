"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { LibraryMode } from "@/components/modes/LibraryMode";

export default function LibraryPage() {
  return (
    <MainLayout>
      <LibraryMode />
    </MainLayout>
  );
}
