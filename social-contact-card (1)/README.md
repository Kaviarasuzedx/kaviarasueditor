# SocialContactCard

Dependency-free Web Component with an optional React TypeScript wrapper. Run `python -m http.server 8000` in this directory and open `http://localhost:8000`. The demo intentionally has no personal destination URLs. Set each `url` attribute to your own HTTPS profile/invite or `mailto:` address.

React: copy all component files together into your project, import `SocialContactCard` from `./SocialContactCard`, and render `<SocialContactCard platform="Discord" url={discordUrl} />`. The wrapper is client-side. Make sure your bundler copies `card.css` referenced by `new URL`. Custom logos accept a single SVG path and viewBox. Built-in brand paths are from Font Awesome Free Brands (CC BY 4.0), except Gmail, which is a simplified custom monochrome mark. Replace with your approved official SVG assets if strict brand fidelity is required. Brand names/logos belong to their respective owners.

No Framer Motion is required. Pointer updates are frame-coalesced and do not trigger React renders. Reduced-motion and touch preferences are supported. No user profile links are fabricated. The original portfolio project was not supplied, so integration and project-specific build/lint remain unverified.
