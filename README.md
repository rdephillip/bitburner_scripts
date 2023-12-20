# bitburner_scripts
This is a collection of scripts I'm writing for Bitburner. As Discord has character limits I wanted a place that I could send community members to so they could reference.

I hope this will also inspire other community members to do the same and share their products with each other in an effort to grow and learn together.

## Notes
- start.js makes a call to claim.js and also copies gwh.js. These are hardcoded and would need to be changed to match your file names if they differ
- claim.js will find all servers and attempt to capture them. If you do not have the exe's to open ports it will fail. This does not currently run automatically again with the 3 files in the "bootstrap folder"
- I will develop script batch sets as I expand that should allow you to switch things over to various milestones of the game
- I do test these for myself, but I will also be far more lenient. They may not be optimized.
- fresh-start bootstrap scripts target a single server. Early game a good target is joesguns. When your hacker level gets up to around 300 you can switch to phantasy. You likely won't be running these anymore when you will be too strong to focus a single target.

## Running fresh-start bootstrap
- copy start.js, claim.js, and gwh.js to your scripts in game
- run start.js [scriptName] [targetName] [firstRun(boolean)]
- arg3 is optional, defaults to false
