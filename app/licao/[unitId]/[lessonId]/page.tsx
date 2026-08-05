import LessonPageClient from "@/components/lesson/LessonPageClient";

export default function LicaoPage({
  params,
}: {
  params: { unitId: string; lessonId: string };
}) {
  return <LessonPageClient unitId={params.unitId} lessonId={params.lessonId} />;
}
