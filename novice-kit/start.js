/** @param {NS} ns */
export async function main(ns) {
  let servers = srvList(ns);
  let totalThreads = 0;
  let myServerPrefix = "barb-";
  let myScripts = [
    "hud.js",
    "auto_restart.js",
    "claim.js",
    "hacknet.js",
    "cluster.js"
  ]

  // Initialize argument variables
  let scriptName = ((ns.args[0]) ? ns.args[0].toLowerCase() : "gwh.js");
  let targetName = ((ns.args[1]) ? ns.args[1].toLowerCase() : "joesguns");
  let forceUpdate = ((ns.args[2]) ? ns.args[2].toLowerCase() : "");

  // save vars to file for other scripts
  ns.write("args.txt", scriptName + "\n" + targetName, "w");

  // check if restart or file is requested
  if (ns.args[2] === "restart" || ns.args[2] === "file") {
    restart(ns, scriptName, servers, myScripts);
  }
  
  // launch claim > hacknet > cluster chain
  ns.tprint("Launching " + myScripts[2]);
  ns.run(myScripts[2], 1, myServerPrefix);

  servers = srvList(ns);

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

        if (ns.getServerMaxMoney(server) > 0 && ns.hasRootAccess(server) && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server)) {
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
  ns.tprint("Launching " + myScripts[0]);
  ns.run(myScripts[0]);
  ns.tprint("Launching " + myScripts[1]);
  ns.run(myScripts[1])
}

function restart(ns, scriptName, servers, myScripts) {
  for (let server of servers) {
    if (server) {
      if (ns.scriptRunning(scriptName, server)) {
        ns.scriptKill(scriptName, server);
        ns.toast("Killed " + scriptName + " on " + server, "success");
      } else {
        ns.toast("No script " + scriptName + " on " + server, "error");
      }
    }
  }

  for(let script of myScripts) {
    if (ns.scriptRunning(script, "home")) {
      ns.scriptKill(script, "home");
      ns.toast("Killed " + script + " on home", "success");
    } else {
      ns.toast("No script " + script + " on home", "error");
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

function srvList(ns) {
  let servers = [];

  // check for our servers.txt from previous claim and load to array
  if (ns.fileExists("servers.txt")) {
    servers = ns.read("servers.txt").split("\n");
  }

  // add home to the servers array
  servers.push("home");

  // add purchased servers to server array
  for (let server of ns.getPurchasedServers()) {
    servers.push(server);
  }

  return servers;
}
