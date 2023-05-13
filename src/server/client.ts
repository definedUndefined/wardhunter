import { WardHunterClient } from "@/lib/client";

import { env } from "@/env.mjs";

const globalForWardHunter = globalThis as unknown as {
    wardhunter: WardHunterClient | undefined;
};

export const client =
    globalForWardHunter.wardhunter ??
    new WardHunterClient();

if (env.NODE_ENV !== "production") globalForWardHunter.wardhunter = client;
