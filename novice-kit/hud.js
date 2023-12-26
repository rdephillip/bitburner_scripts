/** @param {NS} ns */
export async function main(ns) {
  const hook0 = eval("document.getElementById('overview-extra-hook-0')");
  const hook1 = eval("document.getElementById('overview-extra-hook-1')");

  while (true) {
    try {
      const headers = [];
      const values = [];
      
      headers.push("Income");
      values.push('$' + ns.formatNumber(ns.getTotalScriptIncome()[0], 2, 1000) + '/sec');

      headers.push("Exp");
      values.push(ns.formatNumber(ns.getTotalScriptExpGain(), 2, 1000) + '/sec');
      
      headers.push("Threads");
      values.push(ns.formatNumber(ns.read("threads.txt")));

      headers.push("Servers");
      values.push(ns.getPurchasedServers().length);

      headers.push("Srv Ram");
      values.push(ns.formatRam(ns.getPurchasedServers()[0] ? ns.getServerMaxRam(ns.getPurchasedServers()[0]) : "0"));

      let target = ns.read("args.txt").split("\n")[1];
      headers.push("Target");
      values.push(target);

      headers.push("T Mx Val");
      values.push("$" + ns.formatNumber(ns.getServerMaxMoney(target), 2));

      headers.push("T Funds");
      values.push("$" + ns.formatNumber(ns.getServerMoneyAvailable(target), 2));

      headers.push("T Sec");
      values.push(ns.formatNumber(ns.getServerSecurityLevel(target), 2));

      headers.push("T Min Sec");
      values.push(ns.formatNumber(ns.getServerMinSecurityLevel(target), 2));

      headers.push("Hack Chance");
      values.push(ns.formatPercent(ns.hackAnalyzeChance(target), 1));

      hook0.innerText = headers.join(" \n");
      hook1.innerText = values.join(" \n");

    } catch (err) {
      ns.print("Error: Update Skipped: " + String(err));
    }
    await ns.sleep(1000);
  }
}
