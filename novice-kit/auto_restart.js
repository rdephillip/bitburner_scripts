/** @param {NS} ns */
export async function main(ns) {
  let ownedProgs = [];
  let programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let setArgs = [];

  if (ns.fileExists("args.txt")) {
    setArgs = ns.read("args.txt").split("\n");
  }

  for (let p of programs) {
    if (ns.fileExists(p) && !ownedProgs.includes(p)){
      ownedProgs.push(p);
    }
  }

  while (ownedProgs.length < programs.length) {
    for (let p of programs) {
      if (ns.fileExists(p) && !ownedProgs.includes(p)){
        ns.exec("start.js", setArgs[0], setArgs[1], "restart");
      }
      await ns.sleep(0);
    }

    await ns.sleep(10000);
  }
}
