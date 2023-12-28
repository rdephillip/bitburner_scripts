/** @param {NS} ns */
export async function main(ns) {
  let ownedProgs = [];
  let programs = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
  let setArgs = [];
  let lastChecked = ns.fileExists("lastCheckedHLVL.txt") ? parseInt(ns.read("lastCheckedHLVL.txt")) : 0;

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
        ns.run("start.js", 1, setArgs[0], setArgs[1], "restart");
      }
      await ns.sleep(0);
    }

    await ns.sleep(10000);
  }

  while (ns.getHackingLevel() < 2500) {
    if (ns.getHackingLevel() % 100 == 0 && ns.getHackingLevel() > lastChecked) {
      ns.run("start.js", 1, setArgs[0], setArgs[1], "restart");
    }

    lastChecked = ns.getHackingLevel();
    ns.write("lastCheckedHLVL.txt", lastChecked, "w");
    await ns.sleep(10000);
  }
}
