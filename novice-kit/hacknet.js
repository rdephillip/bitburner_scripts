/** @param {NS} ns */
export async function main(ns) {
  let isDone = false;
  let myMax = 25;
  let myServerPrefix = ns.args[0];

  while (!isDone) {
    if (ns.hacknet.numNodes() < myMax) {
      if (ns.getPlayer().money > ns.hacknet.getPurchaseNodeCost()) {
        ns.hacknet.purchaseNode();
      }
    } else {
      for(let i = 0; i < ns.hacknet.numNodes(); i++){
        let node = ns.hacknet.getNodeStats(i);
        if (node.ram === 64 && node.cores === 16 && node.level === 200){
          isDone = true;
        } else {
          isDone = false;
          break;
        }
      }
    }

    for(let i = 0; i < ns.hacknet.numNodes(); i++) {
      let node = ns.hacknet.getNodeStats(i);

      if (node.ram < 64) {
        if (ns.getPlayer().money > ns.hacknet.getRamUpgradeCost(i)) {
          ns.hacknet.upgradeRam(i);
        }
      }
      
      if (node.cores < 16) {
        if (ns.getPlayer().money > ns.hacknet.getCoreUpgradeCost(i)) {
          ns.hacknet.upgradeCore(i);
        }
      }

      if (node.level < 200) {
        if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 199) && node.level === 1) {
          ns.hacknet.upgradeLevel(i, 199);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 100) && node.level >= 100) {
          ns.hacknet.upgradeLevel(i, 100);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 50) && node.level >= 50) {
          ns.hacknet.upgradeLevel(i, 50);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 25) && node.level >= 25) {
          ns.hacknet.upgradeLevel(i, 25);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 10) && node.level >= 10) {
          ns.hacknet.upgradeLevel(i, 10);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 5) && node.level >= 5) {
          ns.hacknet.upgradeLevel(i, 5);
        } else if (ns.getPlayer().money > ns.hacknet.getLevelUpgradeCost(i, 1) && node.level > 1) {
          ns.hacknet.upgradeLevel(i, 1);
        }
      }
    }

    await ns.sleep(0);
  }

  ns.tprint("Launching cluster.js");
  ns.run("cluster.js", 1, myServerPrefix);
}
