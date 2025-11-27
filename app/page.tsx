import HomePage from "@/components/home";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";

export default async function Home() {
  const waitlistTotal = await preloadQuery(api.waitlist.waitlistTotal);
  return <HomePage waitlistTotal={waitlistTotal} />;
}
