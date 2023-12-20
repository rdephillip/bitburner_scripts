/** @param {NS} ns */
export async function main(ns) {
  while(true) {
    if (ns.getServerSecurityLevel(ns.args[0]) > ns.getServerMinSecurityLevel(ns.args[0])){
      ns.toast('Weakening security on' + ns.args[0] + '.', "warning")
      let secWeakened = await ns.weaken(ns.args[0]);
      ns.toast('Weakened by ' + secWeakened + '.', "success");
    } else if (ns.getServerMoneyAvailable(ns.args[0]) < ns.getServerMaxMoney(ns.args[0])){
      ns.toast('Growing funds on ' + ns.args[0] + '.', "warning")
      let moneyInc = await ns.grow(ns.args[0]);
      ns.printf('Funds grew ' + moneyInc + '.', "success")
    } else {
      ns.toast('Hacking funds on ' + ns.args[0] + '.', "warning")
      let earnedMoney = await ns.hack(ns.args[0]);
      ns.toast('Funds earned ' + earnedMoney + '.', "success");
    }
  }
}
