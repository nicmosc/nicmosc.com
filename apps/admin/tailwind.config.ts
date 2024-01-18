// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@nicmosc/config/tailwind.config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
