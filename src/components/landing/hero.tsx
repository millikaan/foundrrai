import { Bloom } from "./bloom";
import { PromptBox } from "./prompt-box";

export function Hero() {
  return (
    <section className="hero-surface relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-[96px] sm:px-6 sm:pb-20 sm:pt-[104px]">
      <Bloom variant="hero" />

      <div className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
        <h1
          className="animate-fade-up w-full text-balance font-semibold tracking-[-0.035em] text-foreground"
          style={{
            animationDelay: "120ms",
            fontSize: "clamp(46px, 6.8vw, 80px)",
            lineHeight: 1.02,
          }}
        >
          Fikrini yaz.
          <br />
          <span className="text-primary">Saytın hazır olsun.</span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-[540px] text-[17px] leading-[1.55] text-muted-foreground sm:text-[18px]"
          style={{ animationDelay: "240ms" }}
        >
          Azərbaycan üçün AI sayt qurucusu. Bir cümlə yaz — dəqiqələr içində hazır
          sayt.
        </p>

        <div
          className="animate-fade-up mt-9 w-full sm:mt-10"
          style={{ animationDelay: "360ms" }}
        >
          <PromptBox variant="hero" showChips={false} />
        </div>
      </div>
    </section>
  );
}
