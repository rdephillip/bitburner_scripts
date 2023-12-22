/** @param {NS} ns */
export async function main(ns) {
  let server = ns.args[0];
  let threadCount = ns.args[1];
  let estGrowthAmt = 0;

  while(true) {
    estGrowthAmt = (ns.getServerMoneyAvailable(server) * (1 + (ns.getServerGrowth(server) / 100)));
    
    if (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server) && Math.floor(ns.weakenAnalyze(threadCount)) > 1){
      ns.toast('Weakening security on ' + server + '.', "warning")
      let secWeakened = await ns.weaken(server);
      ns.toast('Weakened by ' + secWeakened + '.', "success");
    } else if (ns.getServerMoneyAvailable(server) < ns.getServerMaxMoney(server) && (ns.getServerMaxMoney(server) - estGrowthAmt > estGrowthAmt )) {
      ns.toast('Growing funds on ' + server + '.', "warning")
      let moneyInc = await ns.grow(server);
      ns.printf('Funds grew ' + moneyInc + '.', "success")
    } else if (ns.hackAnalyze(server) * threadCount < ns.getServerMoneyAvailable(server)) {
      ns.toast('Hacking funds on ' + server + '.', "warning")
      let earnedMoney = await ns.hack(server);
      ns.toast('Funds earned ' + earnedMoney + '.', "success");
    }
  }
}
