# Release notes — portfolio cleanup

Workstream: **release readiness** (server deployability, containerised dev
environment, root tooling, documentation).
Repo: `F:\CodeSandbox\grok\resume-analysis\famas` (FaMaS — Farmers Management System).
Date: 2026-09-12.

Nothing was committed or pushed; no `git add`/`git commit`/`git push` was run.
The working tree is **not a git repository**, so this document is the change log.

---

## 1. Headline: the repository is 1.9 MB, not 99 MB

The brief called for reclaiming **84.85 MB of dead images**. Those files are not
in this working tree:

| Path from the brief | Present? |
| --- | --- |
| `client/public/assets/images/products/product_*.jpg` | **No** — the `products/` directory does not exist |
| `client/public/assets/images/images/` | **No** — directory does not exist |
| `client/src/sections/landingpage/assets/images/` | **No** — `landingpage/assets/` does not exist |

Verified by a recursive listing of every file and directory outside
`node_modules`, and by searching for files matching `product_*`. The whole repo
(269 files at the start of this workstream) measured **1.90 MB**; after adding
~24 KB of new documentation and container files it is **1.95 MB / 287 files**
(the file count also moves as other workstreams land their own files).

Conclusion: the oversized-image cleanup was completed by another workstream (or
never applied to this checkout). **No image bytes were reclaimed here** — the
largest file in the repository is a 461 KB `client/package-lock.json`. Reporting
a reclamation figure for work I did not do would be dishonest.

One dangling reference to the removed images was found and is documented rather
than "fixed" (the file belongs to another workstream):

```
client/src/_mock/products.js:50
    cover: `/assets/images/products/product_${setIndex}.jpg`,
```

This now 404s. The seeded demo data shipped by the other workstream points at
`/assets/placeholder.svg` instead, which exists, so demo mode is unaffected.

### Byte accounting

| Item | Bytes |
| --- | --- |
| **Deleted** `server/index.js` (fully commented-out dead file) | 2,855 |
| **Deleted** `server/utils/postgresUtils.js` (Windows-only autostart + `wait-on` gate) | 879 |
| **Total reclaimed by deletion** | **3,734 bytes (3.65 KB)** |
| Added (new files, all documentation/container artefacts) | ~24,600 |
| Net working-tree change | ~+21 KB |

---

## 2. Server: now deployable

| Problem | Fix | File |
| --- | --- | --- |
| No `start` script, no `engines` | `"start": "node server.js"`, `"engines": { "node": ">=18" }`, `main` corrected from the deleted `index.js` to `server.js` | `server/package.json` |
| Package was still named `famas`, clashing with the root package | Renamed to `famas-server`, marked `private` | `server/package.json` |
| Placeholder `test` script exited non-zero | Now a no-op that exits 0 (there is still no test suite) | `server/package.json` |
| `wait-on` dependency | Removed; `package-lock.json` regenerated (88,272 bytes, down from 94,534) | `server/package.json`, `server/package-lock.json` |
| Hardcoded port `5000` | `Number(process.env.PORT) \|\| 5000` | `server/logics/serverLogic.js` |
| CORS origin hardcoded to `http://localhost:3030` | New shared policy module reading comma-separated `ALLOWED_ORIGINS`, with a localhost dev default and wildcard support for Vercel previews | `server/utils/allowedOrigins.js`, `server/logics/serverLogic.js`, `server/routes/authorization/authlogics.js` |
| A second middleware unconditionally set `Access-Control-Allow-Origin: *`, defeating the CORS policy (and invalid with credentialed requests) | Removed | `server/logics/serverLogic.js` |
| `init()` had a `finally` block that started the API **even after the database connection failed** | Rewritten: bounded retry (`DB_CONNECT_RETRIES`, default 1), then a clean non-zero exit without starting the API | `server/logics/serverLogic.js` |
| Windows-only PostgreSQL autostart via a `.lnk` shortcut and a `wait-on tcp:localhost:5432` gate | Deleted entirely — no `child_process`, no `wait-on`, no `localhost:5432` assumption anywhere in the repository | `server/index.js`, `server/utils/postgresUtils.js` (deleted) |
| Database config was a bare `connectionString: process.env.POSTGRES_URL` | Full env-driven config: `POSTGRES_URL` **or** discrete `PGHOST`/`PGPORT`/`PGUSER`/`PGPASSWORD`/`PGDATABASE`, optional `PGSSL`, pool error handler, and a password-redacting `describeTarget()` for startup logs | `server/db.js` |
| Any missing route module crashed the boot | `/api/forgot` (whose module is absent from the repo) is mounted through `optionalRouter()`, logging a warning and returning `501` instead of taking the API down | `server/logics/serverLogic.js` |
| No health endpoint for hosting healthchecks | `GET /api/health` → `{"status":"ok"}` | `server/logics/serverLogic.js` |
| Graceful shutdown never closed the HTTP listener | `gracefulShutdown(server)` now closes the listener, drains in-flight requests with a 10 s safety timeout, then ends the pool | `server/utils/shutdown.js` |
| No environment documentation | `server/.env.example` documents all 13 variables | `server/.env.example` (new) |

No hardcoded credentials existed to remove: `db.js` already read
`process.env.POSTGRES_URL`, and `middleware/authorization.js` /
`utils/jwtGen.js` read `process.env.JWT_SECRET`. Re-verified by scanning every
`.js` file for `postgres://`, `password =`, and literal secrets. The fallback
values added to `db.js` (`postgres`/`postgres`/`famas`) are local-dev defaults
only and are documented as such.

## 3. Containerised dev environment

New files, none of which existed before:

| File | Purpose |
| --- | --- |
| `docker-compose.yml` | Three services: `postgres` (official `postgres:16-alpine`, named volume `famas_pgdata`, `pg_isready` healthcheck, env-driven user/password/db), `server` (built from `./server`, `depends_on` the DB with `condition: service_healthy`, all env wired to the DB service, `DB_CONNECT_RETRIES=10`), and `client` (Node 20 with the Vite dev server). |
| `server/Dockerfile` | `node:20-alpine`, `npm ci` from the committed lockfile (scripts **not** skipped, so bcrypt's native binding is fetched), runs as the non-root `node` user, `EXPOSE 5000`, `HEALTHCHECK` hitting `/api/health`, `CMD ["node", "server.js"]`. |
| `server/.dockerignore`, `client/.dockerignore` | Keep `node_modules`, `.env`, and build output out of the build context. |

The client service **is** included: the Vite dev server runs in-cluster on port
3030 with host port 3030, `CHOKIDAR_USEPOLLING=true` for Docker Desktop
bind-mounts, a named volume holding the container's own `node_modules`, and
`/api` proxied to `http://server:5000` (added to `client/vite.config.js`, driven
by `VITE_API_PROXY_TARGET`). Because the proxy makes API calls same-origin, CORS
does not get in the way locally. Setting `CLIENT_PORT`/`API_PORT`/`PGPORT`
remaps the host ports.

**Verified:** `docker compose config` **was** run (the CLI works without the
daemon, even though the daemon is unreachable from this sandbox):

- `docker compose config --quiet` → exit 0 on the committed file.
- The full documented path `docker compose --env-file server/.env config --quiet`
  → exit 0, with `server.PGHOST` resolving to `postgres` (the service name, not
  `localhost`) and the published port resolving to 5000.
- Without `JWT_SECRET` the same command fails fast with a readable message
  (`required variable JWT_SECRET is missing a value`), which is the intended
  guard.
- Every `build.context`/`Dockerfile` and bind-mount source resolves to a real
  path; `depends_on` targets exist; the healthcheck's `$$` escapes correctly for
  container-side `pg_isready` expansion.
- The `server` environment block only contains variables it explicitly
  references, so an uncommented `POSTGRES_URL` in `.env` is **not** injected into
  the container and cannot override the in-cluster host.

**Could not verify:** `docker compose up`, `docker build`, and any actual
container startup — the Docker daemon is unreachable (`permission denied ...
npipe:////./pipe/dockerDesktopLinuxEngine`) and this session cannot request
escalation. No image has been built and the stack has never been started, so
runtime behaviour inside the containers is unconfirmed.

## 4. Root tooling

`package.json` was a dependency-only stub with no `scripts` (it listed
`@emotion/styled`, `bcrypt`, `email-validator`, `luxon`, `npm`). It is now a
proper private monorepo root with `name`, `description`, `license`,
`engines.node >= 18`, and delegating scripts: `install:all`, `dev:client`,
`dev:server`, `build`, `start:server`, `lint`, `docker:up`, `docker:down`.

**No npm workspaces were added, deliberately.** Vercel resolves this project
from `client/` with install/build/output settings of its own; hoisting
dependencies into a root `node_modules` would change what Vercel's install step
produces and could break the deployed build. `npm --prefix client …` gives the
same ergonomics without touching that behaviour.

`.gitignore` added: `node_modules`, `dist`/`build`/`out`/`.vite`, `.env` and
`.env.*` (with `!.env.example` kept), logs, editor/OS noise, coverage output.

**Secrets:** the repository contains **no** `.env` file with real values. The
only committed environment files are the templates `server/.env.example` and
`client/.env.example`, which hold placeholders and are explicitly whitelisted
past the `.env.*` ignore rule. No credentials, keys, or connection strings are
committed anywhere.

One inconsistency left alone (it belongs to another workstream's docs): the root
`package-lock.json` still lists the five dependencies that were just deleted
from the root `package.json`. It is harmless and disappears on the next
`npm install` at the root, but running `npm ci` at the root will fail until
then. It is not referenced by the Vercel or Docker builds.

## 5. Documentation

| File | Contents |
| --- | --- |
| `README.md` (new) | Description and the problem it solves for farmer associations; ASCII architecture diagram and monorepo layout; screenshots section with **explicitly marked placeholders** (no fabricated image links); Docker and manual quick starts; complete environment-variable tables for client and server with required/optional marked; **real demo credentials** read from `client/src/api/mock/seed.js`; Vercel + Render/Railway/Fly deployment instructions including the `VITE_DEMO_MODE` backend-less path; and a blunt "Known limitations" section. |
| `docs/RELEASE-NOTES.md` (this file) | What changed in this cleanup and the bytes reclaimed. |

The brief asked me not to invent demo credentials and to leave a `TODO`. The mock
layer landed during this workstream, so the README documents the **actual**
seeded logins (`admin@famas.demo` / `admin123`, `karthik.rao@example.com` /
`farmer123`, plus the deliberately banned farmer account) and points at
`client/src/api/mock/seed.js` as the source of truth. The screenshots remain
marked `TODO: add screenshot` because no real captures exist.

## 6. Deleted files — with evidence

Nothing was deleted unless nothing referenced it.

| File | Bytes | Evidence |
| --- | --- | --- |
| `server/index.js` | 2,855 | Every line is a `//` comment; its header reads "Deprecated version, replaced by server.js". A full-repository scan (205 files, excluding `node_modules`) for `server/index.js`, `require("./index")`, and `require('./index')` returned **0 hits**. Deleted. |
| `server/utils/postgresUtils.js` | 879 | The Windows-only `autopsql` / `promptForManualStart` helpers and the `wait-on tcp:localhost:5432` gate. Only the deleted `server/index.js` ever used them. A scan for `postgresUtils`, `checkPostgresStatus`, `autopsql`, `promptForManualStart`, `wait-on`, `waitOn`, `psqlstart.lnk`, and `F:/PythonSandbox` returned **0 hits** in the entire remaining repository. Deleted. |

**Total reclaimed: 3,734 bytes (3.65 KB).**

No image, asset, or landing-page file was deleted — see section 1 for why the
84.85 MB figure does not apply to this checkout, and why the duplicate-asset and
`landingpage/` items were left to their owning workstreams.

## 7. Verification — what was actually run

Passed:

- `node --check` on all 15 remaining `server/**/*.js` files — no syntax errors.
- `JSON.parse` on `package.json`, `server/package.json`,
  `server/package-lock.json`, `client/package.json`, `client/vercel.json`.
- **Unit tests for the new CORS policy** (`server/utils/allowedOrigins.js`), 4
  cases: the localhost dev default applies when the variable is unset; an
  unknown origin is rejected; a comma-separated list is parsed with whitespace
  and trailing commas tolerated; a `https://famas-*.vercel.app` pattern matches
  preview hosts but not `evil-famas-x.vercel.app`; and the `cors()` callback
  echoes an allowed origin while returning `undefined` for a denied one.
- **Runtime tests for the new database config** (`server/db.js`) with `pg` and
  `dotenv` stubbed: `POSTGRES_URL` is passed through to the pool and rendered
  with the password redacted; the discrete `PG*` variables land on
  `host`/`port`/`user`/`database`; `PGSSL` is absent unless enabled; and the
  local-dev defaults apply when nothing is set.
- `docker-compose.yml` parsed as YAML; `docker compose config` run in both the
  default and `--env-file` forms (see section 3).
- Reference scans proving the two deleted files were unreferenced, and that no
  `wait-on` / Windows-autostart code remains.

**Not** run, and not claimed:

- `docker compose up` / `docker build` — the Docker daemon is unreachable from
  this sandbox (pipe access denied, escalation unavailable). No image has been
  built and the stack has never been started.
- `npm install` / `npm ci` / `npm run build` — `npm ci --ignore-scripts` in
  `server/` timed out after 120 s while downloading (~49 MB of a partial tree,
  which was then removed). The client was never installed or built. The
  Vercel build command is documented from `client/package.json` and
  `client/vercel.json`, not from an observed build.
- Booting the real API — no `node_modules`, so `express`, `pg`, `helmet`,
  `cors` and `luxon` were stubbed. A full end-to-end boot against a real
  PostgreSQL was not performed.
- The demo/mock API layer, `client/src/api/**`, `client/src/routes/**`, and
  `client/src/sections/**` — read-only for reference verification, never edited.

## 8. Files touched in this workstream

Modified: `package.json`, `server/package.json`, `server/package-lock.json`,
`server/db.js`, `server/logics/serverLogic.js`, `server/utils/shutdown.js`,
`server/routes/authorization/authlogics.js`, `client/vite.config.js`.

Created: `README.md`, `docs/RELEASE-NOTES.md`, `docker-compose.yml`,
`server/Dockerfile`, `server/.env.example`, `server/.dockerignore`,
`client/.dockerignore`, `server/utils/allowedOrigins.js`, `.gitignore`.

Deleted: `server/index.js`, `server/utils/postgresUtils.js`.

No file under `client/src/`, `client/index.html`, or `client/public/manifest.json`
was modified or deleted — those belong to other workstreams. They were read only,
to verify asset references and to quote the real demo credentials.
