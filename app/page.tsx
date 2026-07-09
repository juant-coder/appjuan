import Header from "@/components/layout/Header";
import TrailMap from "@/components/trail/TrailMap";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-10">
        <TrailMap />
      </main>
    </>
  );
}
