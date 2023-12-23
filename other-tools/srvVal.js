/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    if (server){
      if (ns.getServerMaxMoney(server) > 0 && ns.hackAnalyzeChance(server) > 0) {
        ns.tprint(server.padEnd(25," ") + " is worth " + ns.formatNumber(ns.getServerMaxMoney(server), 2).toString().padStart(7," ") + "$ and requires hlvl: " + ns.getServerRequiredHackingLevel(server).toString().padStart(5," ") + " with a " + ns.formatPercent(ns.hackAnalyzeChance(server)).toString().padStart(6," ") + "% chance to hack.");
      }
    }
  }
}
