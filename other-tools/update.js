/** @param {NS} ns */
export async function main(ns) {
  let scripts = [
    "start.js",
    "claim.js",
    "hud.js",
    "auto_restart.js",
    "hacknet.js",
    "cluster.js",
    "gwh.js"
  ];

  let url = "https://github.com/rdephillip/bitburner_scripts/blob/main/novice-kit/";

  for (let script of scripts) {
    ns.wget(url+script, script, "home");
  }
}
