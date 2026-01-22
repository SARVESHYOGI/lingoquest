import type { NextConfig } from "next";
import { withLingo } from "@lingo.dev/compiler/next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default async function (): Promise<NextConfig> {
  return await withLingo(nextConfig, {
    sourceRoot: "./app",
    sourceLocale: "en",
    targetLocales: ["hi", "fr", "de"],
    models: "lingo.dev",
    dev: {
      usePseudotranslator: true,
    },
  });
}
