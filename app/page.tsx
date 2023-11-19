import Logo from "@/components/Logo";

export default function Home() {
  return (
    <main className="bg-background text-foreground pt-96">
      <Logo className="block mx-auto" />
      <h1>台灣歷年總統 都幾?</h1>
      <p className="py-24 text-primary text-2xl font-bold">選擇查詢年份</p>
      <div className="w-full max-w-5xl flex flex-wrap justify-between items-center gap-16"></div>
    </main>
  );
}
