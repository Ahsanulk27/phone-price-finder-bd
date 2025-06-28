import { scrapeDaraz } from "./daraz.ts";

async function test() {
  try {
    console.log("Testing scrapeDaraz function...");
    const results = await scrapeDaraz("iphone");
    console.log("Results:", results);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();