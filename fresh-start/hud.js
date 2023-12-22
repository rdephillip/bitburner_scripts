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
      values.push(ns.read("threads.txt"));

      hook0.innerText = headers.join(" \n");
      hook1.innerText = values.join(" \n");

    } catch (err) {
      ns.print("Error: Update Skipped: " + String(err));
    }
    await ns.sleep(1000);
  }
}
