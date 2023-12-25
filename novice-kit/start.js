/** @param {NS} ns */
export async function main(ns) {
  let servers = [];
  let totalThreads = 0;
  let myServerPrefix = "barb-";
  let myScripts = [
    "hud.js",
    "claim.js",
    "hacknet.js",
    "cluster.js"
  ]
  
  ns.tprint("Launching claim.js");
  ns.run("claim.js", 1, myServerPrefix);
  
  if (ns.fileExists("servers.txt")) {
    servers = ns.read("servers.txt").split("\n");
  }

  servers.push("home");

  for (let server of ns.getPurchasedServers()) {
    servers.push(server);
  }

  let scriptName = ((ns.args[0]) ? ns.args[0].toLowerCase() : "gwh.js");
  let targetName = ((ns.args[1]) ? ns.args[1].toLowerCase() : "joesguns");
  let forceUpdate = ((ns.args[2]) ? ns.args[2].toLowerCase() : "");

  ns.write("args.txt", scriptName + "\n" + targetName, "w");

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

        if (server === "home") {
          for (let x of myScripts) {
            freeRAM -= ns.getScriptRam(x);
          }
        }

        if (ns.getServerMaxMoney(server) > 0) {
          targetName = server;
        } else {
          targetName = ns.args[1];
        }

        let threadCount = Math.floor(freeRAM / ns.getScriptRam(scriptName));
        totalThreads += threadCount;
        
        start(ns, scriptName, server, threadCount, targetName);
      }
      await ns.sleep(200);
    }
  }
  
  ns.write("threads.txt", totalThreads, "w");
  ns.tprint("Launching hud.js");
  ns.run("hud.js");  
}

function restart(ns, scriptName, servers) {
  for (let server of servers) {
    if (server) {
      ns.scriptKill(scriptName, server);
      ns.toast("Killed " + scriptName + " on " + server, "error");
    }
  }

  for (let server of ns.getPurchasedServers()){
    if (server){
      ns.scriptKill(scriptName, server)
      ns.toast("Killed " + scriptName + " on " + server, "error");
    }
  }

  if (ns.scriptRunning(scriptName, "home")) {
    ns.scriptKill(scriptName, "home");
  }

  if (ns.scriptRunning("hud.js", "home")) {
    ns.scriptKill("hud.js", "home");
  }

  if (ns.scriptRunning("hacknet.js", "home")) {
    ns.scriptKill("hacknet.js", "home");
  }

  if (ns.scriptRunning("cluster.js", "home")) {
    ns.scriptKill("cluster.js", "home");
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
