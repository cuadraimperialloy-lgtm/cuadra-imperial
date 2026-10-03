"use client";
import HorseDetailPage from "@/app/ejemplares/[id]/page";
export default function CaballosSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  return <HorseDetailPage params={params.then(p => ({ id: p.slug }))} />;
}
