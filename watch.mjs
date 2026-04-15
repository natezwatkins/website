import { watch, copyFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const dir = import.meta.dirname;
const src = resolve(dir, "Nate's Website---Code---Freshman Year.html");
const dest = resolve(dir, "index.html");

let timer = null;

function push() {
  try {
    copyFileSync(src, dest);
    execSync("git add index.html && git commit -m \"update site\" && git push", {
      cwd: dir,
      stdio: "inherit",
    });
    console.log("Pushed.");
  } catch (e) {
    console.error("Push failed:", e.message);
  }
}

watch(src, () => {
  clearTimeout(timer);
  timer = setTimeout(push, 500);
});

console.log("Watching for changes... (Ctrl+C to stop)");
