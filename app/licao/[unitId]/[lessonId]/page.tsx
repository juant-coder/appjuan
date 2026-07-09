import { ALL_UNITS } from "@/lib/units";
import LessonPageClient from "@/components/lesson/LessonPageClient";

export function generateStaticParams() {
  return ALL_UNITS.flatMap((unit) =>
    unit.licoes.map((lesson) => ({ unitId: unit.id, lessonId: lesson.id }))
  );
}

export default function LessonPage({
  params,
}: {
  params: { unitId: string; lessonId: string };
}) {
  return <LessonPageClient unitId={params.unitId} lessonId={params.lessonId} />;
}
