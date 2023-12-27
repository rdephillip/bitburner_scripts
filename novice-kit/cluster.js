/** @param {NS} ns */
export async function main(ns) {
  let maxServers = ns.getPurchasedServerLimit();
  let ramMulti = 4;
  let myServerPrefix = ns.args[0];
  let maxxed = false;
  let holdThreadCount = parseInt(ns.read("threads.txt"), 10);
  let file = ns.read("args.txt").split("\n");
  let scriptName = file[0];
  let targetName = file[1];

  while (!maxxed) {
    ns.write("purSrv.txt", ns.getPurchasedServerCost(2 ** ramMulti) * maxServers + "\n", "w");
    if (ns.getPurchasedServers().length === 0) {
      while (ns.getPlayer().money > ns.getPurchasedServerCost(2 ** ramMulti) * maxServers && 2 ** ramMulti < ns.getPurchasedServerMaxRam()) {
        ramMulti++;
        await ns.sleep(0);
      }

      if (2 ** ramMulti < ns.getPurchasedServerMaxRam()) {
        ramMulti--;
      }

      ns.toast("Purchasing servers: " + ns.formatRam(2**ramMulti), "info");
      ns.tprint("Purchasing servers: " + ns.formatRam(2**ramMulti));

      for (let i = 0; i < maxServers; i++) {
        let server = myServerPrefix + i.toLocaleString('en-US', {minimumIntegerDigits: 2});
        ns.purchaseServer(server, 2 ** ramMulti);
        ns.scp(scriptName, server);
        start(ns, holdThreadCount, scriptName, targetName);
      }
    } else if (2 ** ramMulti < ns.getPurchasedServerMaxRam()) {
      while (ns.getPlayer().money > ns.getPurchasedServerUpgradeCost(ns.getPurchasedServers()[0] , 2 ** ramMulti) * maxServers && 2 ** ramMulti < ns.getPurchasedServerMaxRam()) {
        ramMulti++;
        await ns.sleep(0);
      }

      if (2 ** ramMulti < ns.getPurchasedServerMaxRam()) {
        ramMulti--;
      }

      if (ns.getServerMaxRam(ns.getPurchasedServers()[0]) < 2 ** ramMulti ) {
        ns.toast("Purchasing server upgrades: " + ns.formatRam(2**ramMulti), "info");
        ns.tprint("Purchasing server upgrades: " + ns.formatRam(2**ramMulti));
        
        for (let server of ns.getPurchasedServers()){
          ns.upgradePurchasedServer(server, 2 ** ramMulti);
          ns.scp(scriptName, server);
          restart(ns, holdThreadCount, scriptName, targetName);
        }
      }
    } else if (ns.getServerMaxRam(ns.getPurchasedServers()[0]) === ns.getPurchasedServerMaxRam()){
      ns.toast("Servers maxxed", "success");
      ns.tprint("Servers maxxed");
      maxxed = true;
    }
    await ns.sleep(0);
  }
}

function start(ns, holdThreadCount, scriptName, targetName) {
  let totalThreads = 0;

  for (let server of ns.getPurchasedServers()) {
    let freeRAM = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
    let threadCount = Math.floor(freeRAM / ns.getScriptRam(scriptName));
    totalThreads += threadCount;

    if (threadCount > 0) {
      ns.exec(scriptName, server, threadCount, targetName, threadCount);
    }
  }

  ns.write("threads.txt", totalThreads + holdThreadCount, "w");
}

function restart(ns, holdThreadCount, scriptName, targetName) {
  ns.write("threads.txt", holdThreadCount, "w");

  for (let server of ns.getPurchasedServers()) {
    ns.scriptKill(scriptName, server);
  }

  start(ns, holdThreadCount, scriptName, targetName);
}
