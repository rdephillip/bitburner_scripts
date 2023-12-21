/** @param {NS} ns */
export async function main(ns) {
  let servers = [];

  if (!ns.fileExists("servers.txt")){
    ns.run("claim.js");
  }
  
  servers = ns.read("servers.txt").split("\n");

  let scriptName = ns.args[0];
  let targetName = ns.args[1];
  let forceUpdate = ((ns.args.length > 2) ? ns.args[2] : "");

  if (ns.args[2] === "restart") {
    restart(ns, scriptName, servers);
  }

  for (let server of servers) {
    if (server){
      if(ns.hasRootAccess(server)) {
        if(!ns.fileExists(scriptName, server) || forceUpdate === "file") {
          ns.toast("Copying to " + server, "success");
          ns.scp(scriptName, server);
        }

        let freeRAM = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
        let threadCount = Math.floor(freeRAM / ns.getScriptRam(scriptName));
        
        start(ns, scriptName, server, threadCount, targetName);
      }
      await ns.sleep(0);
    }
  }
}

function restart(ns, scriptName, servers) {
  for (let server of servers) {
    if (server) {
      ns.scriptKill(scriptName, server);
      ns.toast("Killed " + scriptName + " on " + server, "error");
    }
  }
}

function start(ns, scriptName, server, threadCount, targetName) {
  if (threadCount > 0) {
    ns.exec(scriptName, server, threadCount, targetName);
    ns.toast("Started " + scriptName + " on " + server, "success");
  }
}
