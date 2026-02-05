"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { AdminMode } from "@/components/modes/AdminMode";

export default function AdminPage() {
  return (
    <MainLayout>
      <AdminMode />
    </MainLayout>
  );
}
