import { ENV } from "./env.js";
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

// Determine mode based on environment
const isProd = process.env.NODE_ENV === "production";

// Initialize Arcjet
const aj = arcjet({
  key: ENV.ARCJET_KEY, // your Arcjet site key from env
  rules: [
    // 1️⃣ Shield: protects against common attacks like SQLi
    shield({ mode: isProd ? "LIVE" : "DRY_RUN" }),

    // 2️⃣ Bot detection
    detectBot({
      mode: isProd ? "LIVE" : "DRY_RUN",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Add other allowed bot categories if needed
        // "CATEGORY:MONITOR",
        // "CATEGORY:PREVIEW",
      ],
    }),

    // 3️⃣ Rate limiting with sliding window
    slidingWindow({
      mode: isProd ? "LIVE" : "DRY_RUN",
      max: 100,      // max requests
      interval: 60,  // per 60 seconds
    }),
  ],
});

export default aj;
