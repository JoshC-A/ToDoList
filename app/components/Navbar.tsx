import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default async function Navbar() {
  // const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();

  // console.log("USER", data.user?.id);

  // async function signOut() {
  //   const { error } = await supabase.auth.signOut();
  // }

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90"
      style={{ position: "sticky" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            <MountainIcon className="h-6 w-6" />
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/home"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* {data.user?.id ? (
              <Button size="sm" variant="outline" onSubmit={signOut}>
                <Link href="/login">Sign out</Link>
              </Button>
            ) : ( */}
            <Button size="sm" variant="outline">
              <Link href="/login">Sign in</Link>
            </Button>
            {/* )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 15" />
      <circle cx="15" cy="15" r="8" />
    </svg>
  );
}
