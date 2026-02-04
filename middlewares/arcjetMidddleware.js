import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    // ✅ Bypass Arcjet in development (Postman / localhost)
    if (
      process.env.NODE_ENV !== "production" ||
      req.headers["user-agent"]?.includes("Postman")
    ) {
      return next();
    }

    const decision = await aj.protect(req);

    // 🚫 Block requests based on Arcjet decision
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Try again later",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access is denied!!",
        });
      }

      return res.status(403).json({
        message: "Access denied due to security policies.",
      });
    }

    // Spoofed bot detection
    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }

    return next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    return next(); // fail-open in case Arcjet fails
  }
};
