"use client";

import { useEffect, useState } from "react";
import { Analytics, track } from "@vercel/analytics/react";

const OPT_OUT_KEY = "bs_analytics_opt_out";
const AUDIENCE_KEY = "bs_analytics_audience";
const AUDIENCE_TRACKED_KEY = "bs_analytics_audience_tracked";
const AUDIENCE_VALUES = new Set(["internal", "friends", "public"]);

export default function ClientAnalytics() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toggle = params.get("analytics");
      const audienceParam = params.get("audience");
      let shouldUpdateUrl = false;

      if (toggle === "off") {
        localStorage.setItem(OPT_OUT_KEY, "1");
        shouldUpdateUrl = true;
      }

      if (toggle === "on") {
        localStorage.removeItem(OPT_OUT_KEY);
        shouldUpdateUrl = true;
      }

      if (audienceParam && AUDIENCE_VALUES.has(audienceParam.toLowerCase())) {
        localStorage.setItem(AUDIENCE_KEY, audienceParam.toLowerCase());
        shouldUpdateUrl = true;
      }

      if (toggle === "off" || toggle === "on") {
        params.delete("analytics");
      }

      if (audienceParam) {
        params.delete("audience");
      }

      if (shouldUpdateUrl) {
        const newUrl = `${window.location.pathname}${
          params.toString() ? `?${params.toString()}` : ""
        }${window.location.hash || ""}`;
        window.history.replaceState({}, "", newUrl);
      }

      const optOut = localStorage.getItem(OPT_OUT_KEY) === "1";
      if (!optOut && sessionStorage.getItem(AUDIENCE_TRACKED_KEY) !== "1") {
        const audience = localStorage.getItem(AUDIENCE_KEY) || "public";
        track("audience", { group: audience });
        sessionStorage.setItem(AUDIENCE_TRACKED_KEY, "1");
      }
      setEnabled(!optOut);
    } catch {
      setEnabled(true);
    }
  }, []);

  return enabled ? <Analytics /> : null;
}
