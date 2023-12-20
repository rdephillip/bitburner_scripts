/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.scan(self.name);
  let numPortsPossible = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"].reduce((count, tool) => count + (ns.fileExists(tool) ? 1: 0),0);

  if (ns.fileExists("servers.txt")){
    ns.rm("servers.txt");
  }

  for (let server of servers) {
    for (let s of ns.scan(server)){
      if (!servers.includes(s)){
        servers.push(s);
        await ns.sleep(0);
      }
    }
    
    let serverObj = ns.getServer(server);
    let portsRequired = ns.getServerNumPortsRequired(server);
    let canNuke = true;

    while (serverObj.openPortCount < portsRequired && !ns.hasRootAccess(server)) {
      if (numPortsPossible < portsRequired) {
        canNuke = false;
        ns.toast("Cannot open sufficient ports on " + server, "error");
        break;
      }
      if(!serverObj.sshPortOpen && ns.fileExists("BruteSSH.exe")){
        ns.brutessh(server);
        await ns.sleep(0);
      }
      if(!serverObj.ftpPortOpen && ns.fileExists("FTPCrack.exe")){
        ns.ftpcrack(server);
        await ns.sleep(0);
      }
      if(!serverObj.smtpPortOpen && ns.fileExists("relaySMTP.exe")){
        ns.relaysmtp(server);
        await ns.sleep(0);
      }
      if(!serverObj.httpPortOpen && ns.fileExists("HTTPWorm.exe")){
        ns.httpworm(server);
        await ns.sleep(0);
      }
      if(!serverObj.sqlPortOpen && ns.fileExists("SQLInject.exe")){
        ns.sqlinject(server);
        await ns.sleep(0);
      }
    }

    if (!ns.hasRootAccess(server) && canNuke) {
      ns.nuke(server);
      await ns.sleep(0);
      ns.toast("Granted root access to " + server, "success");
    } else if (ns.hasRootAccess) {
      ns.toast("Root access already granted on " + server, "warning");
      await ns.sleep(0);
    } else {
      ns.toast("Cannot gain root access to " + server, "error");
    }

    ns.write("servers.txt", server + "\n", "a");
    await ns.sleep(0);
  }
}
