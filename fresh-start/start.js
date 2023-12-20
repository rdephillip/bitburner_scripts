/** @param {NS} ns */
export async function main(ns) {
  let servers = [];

  if (!ns.fileExists("servers.txt")){
    ns.run("claim.js");
  }
  
  servers = ns.read("servers.txt").split("\n");

  let scriptName = ns.args[0];
  let targetName = ns.args[1];
  let forceUpdate = ((ns.args.length > 2) ? ns.args[2] : false);

  for (let server of servers) {
    if (server){
      if(ns.hasRootAccess(server)) {
        if(!ns.fileExists(scriptName, server) || forceUpdate) {
          ns.toast("Copying to " + server);
          ns.scp(scriptName, server);
        }

        if(!ns.scriptRunning(scriptName, server) || forceUpdate) {
          let freeRAM = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
          let threadCount = Math.floor(freeRAM / ns.getScriptRam(scriptName));

          if(forceUpdate) {
            ns.scriptKill(scriptName, server);
          }

          if (threadCount > 0){
            ns.exec(scriptName, server, threadCount, targetName);
          }
        }
      }
      await ns.sleep(0);
    }
  }
}
