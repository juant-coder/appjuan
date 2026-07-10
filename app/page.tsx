import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ReviewBanner from "@/components/layout/ReviewBanner";
import TrailMap from "@/components/trail/TrailMap";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ReviewBanner />
        <div className="mx-auto max-w-md px-4 pt-4">
          <h1 className="font-heading text-xl font-extrabold">Sua trilha de investidor 🚀</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Complete missões, acumule XP e suba de nível no mercado.
          </p>
        </div>
        <TrailMap />
      </main>
      <BottomNav />
    </>
  );
}
