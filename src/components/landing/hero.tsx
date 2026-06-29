import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden px-5 pb-24 pt-[118px] sm:px-6 sm:pb-28 sm:pt-[142px] lg:pb-40 lg:pt-[166px]">
      <Bloom variant="hero" className="opacity-70" />
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-14 z-[1] mx-auto hidden h-[520px] max-w-[1080px] opacity-28 sm:block" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] bg-[linear-gradient(180deg,transparent_0%,hsl(var(--background)/0.78)_40%,hsl(var(--background))_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-10 z-[1] mx-auto hidden h-16 max-w-[760px] rounded-[100%] border-t border-white/45 bg-[radial-gradient(80%_120%_at_50%_100%,hsl(var(--background)/0.78),transparent_70%)] opacity-50 lg:block"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center text-center">
        <h1
          className="animate-fade-up w-full max-w-[330px] text-balance font-semibold tracking-tight text-foreground sm:max-w-[800px]"
          style={{
            animationDelay: "120ms",
            fontSize: "clamp(43px, 5.35vw, 76px)",
            lineHeight: 1.03,
          }}
        >
          Fikrini yaz.
          <br />
          <span className="sm:hidden">
            Saytın <span className="text-aurora">hazır</span>
            <br />
            olsun.
          </span>
          <span className="hidden sm:inline">
            Saytın <span className="text-aurora">hazır</span> olsun.
          </span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-[310px] text-[16px] font-medium leading-relaxed text-foreground/62 sm:max-w-[560px] sm:text-[18px]"
          style={{ animationDelay: "240ms" }}
        >
          Bir cümlə yaz. Foundrr biznesin üçün məzmunu, dizaynı və canlı saytı
          hazırlasın.
        </p>

        <div
          className="animate-fade-up relative mt-8 w-full sm:mt-9"
          style={{ animationDelay: "360ms" }}
        >
          <PromptBox variant="hero" showChips={false} />
        </div>
      </div>
    </section>
  );
}
