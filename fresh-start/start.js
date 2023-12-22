/** @param {NS} ns */
export async function main(ns) {
  let servers = [];
  
  ns.run("claim.js");
  
  if (ns.fileExists("servers.txt")) {
    servers = ns.read("servers.txt").split("\n");
  }

  let scriptName = ((ns.args[0]) ? ns.args[0].toLowerCase() : "gwh.js");
  let targetName = ((ns.args[1]) ? ns.args[1].toLowerCase() : "joesguns");
  let forceUpdate = ((ns.args[2]) ? ns.args[2].toLowerCase() : "");

  if (ns.args[2] === "restart" || ns.args[2] === "file") {
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
    ns.exec(scriptName, server, threadCount, targetName, threadCount);
    ns.toast("Started " + scriptName + " on " + server, "success");
  } else {
    ns.toast("Insufficient RAM for " + scriptName + " on " + server, "error");
  }
}
