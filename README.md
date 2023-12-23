# bitburner_scripts
This is a collection of scripts I'm writing for Bitburner. As Discord has character limits I wanted a place that I could send community members to so they could reference.

I hope this will also inspire other community members to do the same and share their products with each other in an effort to grow and learn together.

Note: I know these are not optimized, or necessarily even best practice. This is me poking at the code on occassion. There are other repos you can review if you want to go for the hyper min/max systems, but these are all scripts I've written without looking at anything more than the game and JavaScript documentation.

## Notes
- start.js makes a call to claim.js and also copies gwh.js. These are hardcoded and would need to be changed to match your file names if they differ
- claim.js will find all servers and attempt to capture them. If you do not have the exe's to open ports it will fail. This does not currently run automatically again with the 3 files in the "bootstrap folder"
- I will develop script batch sets as I expand that should allow you to switch things over to various milestones of the game
- I do test these for myself, but I will also be far more lenient. They may not be optimized.
- fresh-start bootstrap scripts target a single server. Early game a good target is joesguns. When your hacker level gets up to around 300 you can switch to phantasy. You likely won't be running these anymore when you will be too strong to focus a single target.

## Running fresh-start bootstrap
- copy start.js, claim.js, and gwh.js to your scripts in game
- run start.js [scriptName] [targetName] [runType]
- arg3 is optional, defaults to "". Options are "restart" or "file"
  - restart will restart all scripts on all servers with new arguments
  - file will trigger restart and copy the script file to servers, overwriting if needed

## The novice-kit
- This is a more advanced script that will do quite a bit of work for you
- You will want to acquire all the exe's as quickly as possible
  - I suggest working for the Tech company long enough to get the $200k for the Tor
- Depending upon your build this can outpace you very quickly
  - I'll be building a better hacking system using a WGWH batching system to wrap up this kit
- I advise setting up aliases

## Other tools
- srvVal.js will help you evaluate the ideal server for you to attack
- delsrv.js cleans up your purchased servers in case something went horribly wrong
