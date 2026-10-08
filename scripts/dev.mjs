import { readFileSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const lockPath = ".next/dev/lock";

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function isNextProcess(pid) {
  try {
    const command = readFileSync(`/proc/${pid}/cmdline`, "utf8");
    return command.includes("next");
  } catch {
    return false;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function releaseExistingDevServer() {
  let lock;
  try {
    lock = JSON.parse(readFileSync(lockPath, "utf8"));
  } catch {
    return;
  }

  const pid = Number(lock.pid);
  if (pid && isAlive(pid) && isNextProcess(pid)) {
    process.kill(pid, "SIGTERM");
    for (let i = 0; i < 25 && isAlive(pid); i += 1) {
      await sleep(100);
    }
    if (isAlive(pid)) process.kill(pid, "SIGKILL");
  }

  rmSync(lockPath, { force: true });
}

await releaseExistingDevServer();

const child = spawn(process.execPath, [nextBin, "dev"], { stdio: "inherit" });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
