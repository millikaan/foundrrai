---
name: git-push-guard
enabled: true
event: bash
action: warn
pattern: "git\\s+push"
---
About to run `git push`. In this repo a push auto-triggers a Vercel production deploy to foundrr.online. Only push when the user explicitly asked for it in the current turn — a single earlier "push" is not standing authorization. If unsure, stop and confirm before proceeding.
