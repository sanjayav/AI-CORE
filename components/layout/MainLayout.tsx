"use client";

import { TopNav } from "./TopNav";
import { GlobalBar } from "./GlobalBar";
import { UploadDrawer } from "../upload/UploadDrawer";
import { EvidenceViewer } from "../evidence/EvidenceViewer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-dark">
      <TopNav />
      <GlobalBar />
      <main className="pt-32">
        {children}
      </main>
      <UploadDrawer />
      <EvidenceViewer />
    </div>
  );
}
