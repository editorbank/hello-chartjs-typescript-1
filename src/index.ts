console.log("Hello from index.ts!");

import { on_load } from "./main_module";

if(window) window.onload = on_load;

console.log("Done index.ts.");
