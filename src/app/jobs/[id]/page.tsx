import { jobPosts } from "@/lib/data";
import { JobDetailClient } from "./job-detail-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return jobPosts.map((job) => ({ id: job.id }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JobDetailClient id={id} />;
}
