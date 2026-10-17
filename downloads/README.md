# Review downloads

These files belong to **codex/exhibition-upgrade**, not the live website. No deployment is performed by downloading them.

- [Editable project ZIP](https://github.com/Harman-Saluja/lets-go-green/raw/refs/heads/codex/exhibition-upgrade/downloads/lets-go-green-updated.zip)
- [Production build ZIP](https://github.com/Harman-Saluja/lets-go-green/raw/refs/heads/codex/exhibition-upgrade/downloads/lets-go-green-netlify-deploy.zip)
- [SHA-256 manifest](SHA256.json)

If a direct link prompts for GitHub access, sign in with access to this repository. You can also open either ZIP in this directory and choose **Download raw file**. GitHub Release API access was unavailable from the build environment, so these are normal review-branch files rather than Release assets.

For source review, extract into a new directory, then run `npm ci`, `npm test`, and `npx serve -s build`. For the production ZIP, extract it and run `npx serve -s .` in that directory. Open the server's displayed address. Keep the included `serve.json`: it prevents the recursive iframe preview bug. Both archives have their contents at ZIP root.

See [the delivery report](../EXHIBITION-DELIVERY.md) for tested features and research-dependent limitations. The source ZIP intentionally excludes this downloads directory and generated output. Recreate both ZIPs using `python3 scripts/package-release.py` after `npm test`.
