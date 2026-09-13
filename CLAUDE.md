# CLAUDE.md

Project-wide guidance for Claude Code in this repository.

## Stack

<!-- Fill in per project: framework, language, DB/ORM, styling, key libs -->

Always use `pnpm`, never `npm` for security reasons. Use `pnpm install` or `pnpm add` for installing dependencies.

## Before considering any change done

Run, in order, and fix everything before finishing:

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm format` for formatting application
4. `pnpm test` (or `pnpm test <path>` while iterating)
5. `pnpm build` for anything touching a server/client boundary or route files — `tsc --noEmit` doesn't catch everything a full build does.

## Clean-code rules — apply to every component/hook/util you touch or add

- **Single responsibility, split when large.** If a component's code is hard to scan in one read, or it does more than one job, extract a smaller named unit instead of growing the existing one.
- **Meaningful names.** Name for what a thing represents/does (`isUserLoggedIn`), not vague placeholders (`x`, `data2`).
- **No duplicated logic.** If the same snippet/behavior would appear twice, extract it into a shared function/hook/util first — never copy-paste a tweak.
- **Business logic stays out of the view layer.** Derive data and side effects in hooks/utils; components/views just render.
- **Side-effect hooks are for synchronizing with an external system only** (subscriptions, storage, non-framework widgets, imperative resets after an async value resolves). Never use them to derive a value from other state/props that could just be computed inline.
- **Don't reach for memoization by reflex.** Add it only once there's a concrete, identified reason (a measured expensive computation, or a proven re-render problem) — not preemptively.
- **Group and name props/params intentionally.** Prefer a few well-named, cohesive groups over long flat lists when inputs naturally cluster; reconsider the unit's responsibility if it needs dozens of unrelated inputs.
- **Handle loading/error/empty states explicitly.** Every query-backed or async view should visibly and intentionally handle all three — never let a state fall through implicitly.
- **Keep state as local as possible.** Lift state only as far as the nearest common owner that actually needs it; prefer local state over context/global state by default.
- **Don't optimize prematurely.** First make the code correct and clear; optimize actual, identified bottlenecks.
- **Consistent export/typing style.** Pick one convention (e.g. named exports, `const` + explicit types) and apply it uniformly across the codebase.

If you can't quickly explain what a unit does, it's probably doing too much.

## Feature folders

<!-- Fill in per project: the folder shape (types/constants/hooks/components/etc.), path aliases used, and whether barrel files are allowed. -->

Each feature gets its own folder with a consistent internal shape, e.g. `types.ts`, `constants/`, `hooks/`, `transforms/`, and `components/<sub-feature>/*`. Follow whatever shape is already established by the existing feature folders in this repo — don't invent a new one.

Do not use barrel `index.ts` files for feature folders. Import directly via the feature's path alias (check `tsconfig.json` for the configured aliases).

Only introduce a nested subfolder under `components/` once a sub-feature's file count would otherwise clutter its parent folder.

## Design

Follow @DESIGN.md file for design instructions.

## Server actions / API layer

<!-- Fill in per project: response shape convention (e.g. discriminated result type instead of throwing for expected failures), validation approach, where schemas/translators are resolved. -->

N/A

## i18n

<!-- Fill in per project: locale files, rule that new copy keys must be added to all locales in the same change. -->

N/A

## Database / ORM

<!-- Fill in per project: migration command, rule against direct schema changes without migration. -->

N/A
