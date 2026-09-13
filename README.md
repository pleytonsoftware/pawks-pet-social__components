# Pawks Components

Monorepo for `@pawks/components` — the Tailwind + Radix component library for Pawks apps. See [DESIGN.md](./DESIGN.md) for the design system philosophy and visual direction.

## Workspace layout

- `packages/components` — published as **`@pawks/components`**. The component library itself.
- `packages/eslint-config` — published as **`@config/eslint-config`**. Shared ESLint flat configs.
- `packages/typescript-config` — published as **`@config/typescript-config`**. Shared `tsconfig.json` bases.
- `apps/docs` — **Storybook** (React + Vite), for developing and visually reviewing components from `@pawks/components`.
- `apps/e2e` — **Playwright**, for visual regression testing against the Storybook build produced by `apps/docs`.

Only `@pawks/components` is ever published; every other package/app is private.

## Common commands

```sh
pnpm install                # install everything
pnpm build                  # build all packages (turbo run build)
pnpm lint                   # lint all packages
pnpm check-types            # type-check all packages
pnpm format                 # format the whole repo with prettier

pnpm --filter docs dev      # start the Storybook dev server (http://localhost:6006)
turbo run build-storybook   # build the static Storybook site (apps/docs/storybook-static)

pnpm test:e2e               # turbo run test:e2e — builds @pawks/components, builds
                             # Storybook, then runs Playwright against it
```

Always run `pnpm test:e2e` (or `turbo run test:e2e`) rather than `pnpm --filter e2e test:e2e` directly — Playwright only _serves_ the already-built `apps/docs/storybook-static`, it doesn't build it. Going through turbo guarantees a fresh Storybook build runs first.

## Adding a new component

1. Create `packages/components/src/components/<name>/<name>.tsx` and a small barrel `packages/components/src/components/<name>/index.ts` that re-exports it (see `button/` for the pattern).
2. That's it. The build automatically:
    - discovers the new folder and adds it as its own `tsup` entry (`dist/<name>.js`),
    - regenerates the root barrel (`packages/components/src/index.ts` — **auto-generated, never hand-edit it**) to re-export it,
    - exposes it at both `@pawks/components` (the barrel) and `@pawks/components/<name>` (the subpath), via the package's wildcard `exports` map — no `package.json` edits needed.
3. Add a story under `apps/docs/stories/<name>.stories.tsx` and, if you want visual regression coverage, a spec in `apps/e2e/e2e/<name>.spec.ts` (navigate to `/iframe.html?id=<story-id>&viewMode=story` and screenshot the rendered element — see `button.spec.ts`). Run `pnpm --filter e2e test:e2e:update-snapshots` once to record the baseline and commit it.

## Publishing to Verdaccio

Versioning and publishing are automated with [Changesets](https://github.com/changesets/changesets), targeting only `@pawks/components` (see `.changeset/config.json`'s `ignore` list).

1. After making a change to `@pawks/components`, run `pnpm changeset`, describe the change, and pick a bump (patch/minor/major). Commit the generated `.changeset/*.md` file with your PR.
2. Merging to `main` triggers `.github/workflows/release.yml`, which opens/updates a "Version Packages" PR (via `changesets/action`).
3. Merging that PR runs `pnpm changeset publish`, which publishes `@pawks/components` to the registry configured in its `publishConfig.registry`.

**One-time setup still pending:** `packages/components/package.json`'s `publishConfig.registry` has a `REPLACE_WITH_VERDACCIO_URL` placeholder — swap in your real Verdaccio URL. The release workflow also needs a `VERDACCIO_REGISTRY_HOST` repository variable and a `VERDACCIO_TOKEN` repository secret configured in GitHub before it can actually authenticate and publish.

### Consuming the published package

```sh
pnpm add @pawks/components
```

```ts
import '@pawks/components/styles.css'

// once, e.g. in your app's root layout
import { Button } from '@pawks/components'

// or: from "@pawks/components/button"
```

The package ships a precompiled `styles.css` that works with zero Tailwind configuration on the consumer's side. For deeper theming, `@pawks/components/theme.css` exports just the `@theme` token block to `@import` and override in your own Tailwind entry, and `dist/*.js` keeps Tailwind class strings intact so `@source` can re-scan them against your overridden theme.

## A note on the toolchain

This repo intentionally runs on very new tooling (TypeScript 7, ESLint 10, Tailwind v4), which means a couple of things are wired up non-obviously:

- `typescript` resolves to a `@typescript/typescript6` compatibility shim (see any `package.json`) because `typescript-eslint` doesn't yet support TypeScript 7. `@typescript/native` gives explicit access to the real TS7 compiler if you need it directly.
- `@pawks/components` generates its `.d.ts` files via plain `tsc --emitDeclarationOnly` rather than `tsup`'s built-in bundler, which currently crashes under TypeScript 7 — see the comments in `packages/components/tsup.config.ts` and `scripts/flatten-dts.mjs`.
- ESLint's import rules run on `eslint-plugin-import-x` (registered under the `import` key), not `eslint-plugin-import`, which doesn't support ESLint 10's flat-config internals yet.
