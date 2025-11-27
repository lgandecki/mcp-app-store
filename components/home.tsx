"use client";

import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function HomePage({
  waitlistTotal,
}: {
  waitlistTotal: Preloaded<typeof api.waitlist.waitlistTotal>;
}) {
  const [email, setEmail] = useState<string>("");

  const waitlistLength = usePreloadedQuery(waitlistTotal);
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex flex-col gap-3 items-center text-center max-w-md">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">
            MCP App Store 🤖
          </h1>
          <p className="text-lg text-gray-600">
            Deploy an MCP Server in just 3 clicks
          </p>
        </div>

        <div className="flex flex-col items-center w-full gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // ✅ prevent full page reload
              try {
                if (!email.trim()) {
                  // 📫 checks for empty string or spaces
                  return;
                }
                addToWaitlist({ email });
                setEmail(""); // clear field if you want
              } catch (err) {
                console.error(err);
              }
            }}
            className="flex gap-2 justify-center items-start"
          >
            <div className="space-y-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                type="email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 min-w-[280px]"
              />
              <p className="text-xs text-gray-400">
                {waitlistLength !== undefined
                  ? `${waitlistLength} people have joined the waitlist`
                  : "Loading..."}
              </p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Join Waitlist
            </button>
          </form>
        </div>

        <div className="mt-8">
          <p className="text-gray-600">
            Follow{" "}
            <a
              href="https://x.com/rasmickyy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @rasmickyy
            </a>{" "}
            on X for updates
          </p>
        </div>
      </div>
    </div>
  );
}
