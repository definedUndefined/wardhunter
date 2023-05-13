import { initDatabase } from "@/lib/init";

initDatabase().then(console.log).catch(console.error);