import { AuthForm } from "@/components/auth/auth-form";
import { Bloom } from "@/components/landing/bloom";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function resolveNext(value: string | string[] | undefined): string {
  if (
    typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
  ) {
    return value;
  }
  return "/workspace";
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const next = resolveNext(sp.next);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      <Bloom variant="closing" />
      <div className="relative z-10 flex w-full justify-center">
        <AuthForm mode="signup" next={next} />
      </div>
    </main>
  );
}
