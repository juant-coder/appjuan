export default function Alerta({
  tipo,
  children,
}: {
  tipo: "erro" | "sucesso";
  children: React.ReactNode;
}) {
  return (
    <p
      role="status"
      className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold ${
        tipo === "erro"
          ? "border-brand-red bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
          : "border-brand-green bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
      }`}
    >
      {children}
    </p>
  );
}
