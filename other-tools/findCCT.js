/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.read("servers.txt").split("\n");

  for (let server of servers) {
    if (server) {
      let files = ns.ls(server,".cct");

      if (files.length > 0) {
        ns.tprint("Coding contract found on " + server);
      }
    }
  }
}
