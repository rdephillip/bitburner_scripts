/** @param {NS} ns */
export async function main(ns) {
  for (let server of ns.getPurchasedServers()) {
    ns.scriptKill("gwh.js", server);
    ns.deleteServer(server);
  }
}
