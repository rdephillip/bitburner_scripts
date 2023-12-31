/** @param {NS} ns */
export async function main(ns) {
  let server = ns.args[0];
  let threadCount = ns.args[1];
  let estGrowthAmt = 0;

  while(true) {
    estGrowthAmt = (ns.getServerMoneyAvailable(server) * (1 + (ns.getServerGrowth(server) / 100)));
    
    if (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server)){
      ns.toast('Weakening security on ' + server + '.', "warning")
      let secWeakened = await ns.weaken(server);
      ns.toast('Weakened by ' + ns.formatNumber(secWeakened, 2) + '.', "success");
    } else if (ns.getServerMoneyAvailable(server) < ns.getServerMaxMoney(server) && ns.getServerMaxMoney(server) - ns.getServerMoneyAvailable(server) > estGrowthAmt ) {
      ns.toast('Growing funds on ' + server + '.', "warning")
      let moneyInc = await ns.grow(server);
      ns.printf('Funds grew $' + ns.formatNumber(moneyInc, 2) + '.', "success")
    } else if (ns.hackAnalyze(server) * threadCount < ns.getServerMoneyAvailable(server)) {
      ns.toast('Hacking funds on ' + server + '.', "warning")
      let earnedMoney = await ns.hack(server);
      ns.toast('Funds earned $' + ns.formatNumber(earnedMoney, 2) + '.', "success");
    }
  }
}
