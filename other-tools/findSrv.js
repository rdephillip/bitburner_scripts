/** @param {NS} ns */
export async function main(ns) {
  ns.tprint(await findSrvRecurse(ns, ns.args[0]));
}

async function findSrvRecurse(ns, target) {
  let servers = ns.scan();
  let purSrv = ns.getPurchasedServers();
  let connection = "";

  for (let server of servers) {
    if (server && !purSrv.includes(server)) {
      for (let s of ns.scan(server)){
        if (s && !purSrv.includes(s)) {
          if (s == target && target != "home") {
            connection = target + " > " + await findSrvRecurse(ns, server);
            return (connection);
          } else if (!servers.includes(s)) {
            servers.push(s);
          }
        }
      }
    }
    
    await ns.sleep(0);
  }

  return("home");
}
