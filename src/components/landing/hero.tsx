import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";

export function Hero() {
  return (
    <section className="hero-surface relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-[108px] sm:px-6 sm:pb-20 sm:pt-[128px]">
      <Bloom variant="hero" />

      <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
        <h1
          className="animate-fade-up w-full text-balance font-semibold tracking-tight text-foreground"
          style={{
            animationDelay: "120ms",
            fontSize: "clamp(42px, 5.8vw, 72px)",
            lineHeight: 1.05,
          }}
        >
          Fikrini yaz.
          <br />
          <span className="text-aurora">Saytın hazır olsun.</span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-[580px] text-[16px] font-medium leading-relaxed text-foreground/58 sm:text-[17px]"
          style={{ animationDelay: "240ms" }}
        >
          Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində
          hazır sayt. Öz hesabına yayımla, tam sənin olsun.
        </p>

        <div
          className="animate-fade-up mt-9 w-full sm:mt-10"
          style={{ animationDelay: "360ms" }}
        >
          <PromptBox variant="hero" />
        </div>

        <p
          className="animate-fade-up mt-8 text-[14px] font-medium text-muted-foreground sm:mt-9"
          style={{ animationDelay: "480ms" }}
        >
          Azərbaycan biznesləri artıq Foundrr ilə sayt qurur.
        </p>
      </div>
    </section>
  );
}
