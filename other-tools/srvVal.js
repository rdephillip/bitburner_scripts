/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.read("servers.txt").split("\n");

  ns.tprint("SERVER".padEnd(25," ")
  + " | " +
  "VALUE".padStart(7," ")
  + " | " +
  "HLVL".padStart(5," ")
  + " | " +
  "HACK %".padStart(7," ")
  + " | " +
  "Hack Spd".padStart(15," ")
  + " | " +
  "Grow Spd".padStart(15," ")
  + " | " +
  "Weaken Spd".padStart(15," ")
  + " | ROOTED");
  ns.tprint("".padEnd(110,"="));
  
  for (let server of servers) {
    if (server){
      if (ns.getServerMaxMoney(server) > 0 && ns.hackAnalyzeChance(server) > 0) {
        ns.tprint(server.padEnd(25," ")
        + " | " +
        ns.formatNumber(ns.getServerMaxMoney(server), 2).toString().padStart(7," ")
        + " | " +
        ("$" + ns.getServerRequiredHackingLevel(server)).toString().padStart(5," ")
        + " | " +
        ns.formatPercent(ns.hackAnalyzeChance(server)).toString().padStart(7," ")
        + " | " +
        (ns.fileExists("Formulas.exe", "home") ? msToTime(ns.formulas.hacking.hackTime(ns.getServer(server), ns.getPlayer())).toString().padStart(15, " ") : msToTime(ns.getHackTime(server)).toString().padStart(15, " "))
        + " | " +
        (ns.fileExists("Formulas.exe", "home") ? msToTime(ns.formulas.hacking.growTime(ns.getServer(server), ns.getPlayer())).toString().padStart(15, " ") : msToTime(ns.getGrowTime(server)).toString().padStart(15, " "))
        + " | " +
        (ns.fileExists("Formulas.exe", "home") ? msToTime(ns.formulas.hacking.weakenTime(ns.getServer(server), ns.getPlayer())).toString().padStart(15, " ") : msToTime(ns.getWeakenTime(server)).toString().padStart(15, " "))
        + " | " +
        ns.hasRootAccess(server));
      }
    }
  }
}

function msToTime(duration) {
  var ms = Math.floor((duration % 1000) / 100),
    sec = Math.floor((duration /1000) % 60),
    min = Math.floor((duration / (1000 * 60)) % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    return min + "m " + sec + "s " + ms + "ms";
}
