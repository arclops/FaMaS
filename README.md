<div align="center">

# FaMaS — Farmers Management System

**One place for a farmer association to keep member records and sell produce directly — no middlemen.**

[![client](https://img.shields.io/badge/client-React%2018%20%2B%20Vite-61DAFB)](#monorepo-layout)
[![api](https://img.shields.io/badge/API-Express%20%2B%20PostgreSQL-336791)](#architecture)
[![deploy](https://img.shields.io/badge/client-Vercel-black)](#deployment)
[![license](https://img.shields.io/badge/license-MIT-blue)](#license)

</div>

---

## What this is

FaMaS is a management system for **farmer associations** — the co-operatives and
collectives that pool produce from dozens of smallholder farmers. Today these
groups mostly run on paper registers and phone calls, which means member records
go stale, produce is sold through intermediaries at a discount, and nobody can
answer basic questions like "how much did we sell last month?".

FaMaS puts three things in one web app:

| Capability | What a farmer association gets |
| --- | --- |
| **Farmer database** | A searchable register of members — contact details, farm size, per-farm land records, ban/unban status — that replaces the paper ledger. |
| **Product listings** | Farmers list what they have to sell (crop, quantity, price, photo) against their own account. |
| **Public marketplace** | A storefront where buyers browse pooled produce directly, so the association captures the margin instead of an intermediary. |
| **Association admin** | Role-separated views (`admin` vs `farmer`), per-account dashboards, and an activity log. |

The project started as a hackathon build and has since been cleaned up into
something that can be deployed and demonstrated. See
[Known limitations](#known-limitations) for an honest account of what is and
is not production-ready.

## Architecture

```
                         BROWSER
                            │
              ┌─────────────┴──────────────┐
              │                            │
              ▼                            ▼
   ┌────────────────────┐        ┌────────────────────┐
   │  client/           │        │  client/ in        │
   │  React 18 + Vite   │        │  VITE_DEMO_MODE    │
   │  MUI 5, ApexCharts │        │  (no backend)      │
   └─────────┬──────────┘        └────────────────────┘
             │  fetch `${VITE_API_URL}/api/...`
             │  (credentials: include → httpOnly JWT cookie)
             ▼
   ┌──────────────────────────────────────────────┐
   │  server/   Express 4 REST API                │
   │  ├── /api/auth    register, login, getrole   │
   │  ├── /api/admin   farmers, products, account │
   │  ├── /api/market  public product catalogue   │
   │  ├── /api/user    farmer-scoped products     │
   │  ├── /api/homepage  landing content, contact │
   │  ├── /api/forgot    password reset           │
   │  └── /api/health    liveness probe           │
   │  middleware: helmet, cors (ALLOWED_ORIGINS), │
   │              JWT verify, bcrypt hashing      │
   └─────────────────────┬────────────────────────┘
                         │  pg connection pool
                         ▼
              ┌────────────────────────┐
              │  PostgreSQL 16         │
              │  users, farmers,       │
              │  products, serverlogs  │
              └────────────────────────┘
```

In the Docker stack the browser talks to the Vite dev server, which proxies
`/api` to the API container — so no CORS configuration is needed for local work.

## Monorepo layout

```
famas/
├── client/                     React 18 + Vite + MUI (JavaScript, no TypeScript)
│   ├── public/                 static assets served as-is
│   ├── src/
│   │   ├── sections/           feature views (login, register, farmersdb, market, products…)
│   │   ├── layouts/            dashboard + farmer shell (header, nav, popovers)
│   │   ├── routes/             route table and guards
│   │   ├── components/         shared building blocks (chart, logo, scrollbar…)
│   │   ├── theme/              MUI theme (palette, typography, overrides)
│   │   ├── utils/, hooks/      helpers
│   │   └── _mock/              faker-based fixtures
│   ├── index.html
│   ├── vite.config.js          dev port 3030, /api proxy, `src` alias
│   └── vercel.json             SPA rewrite
├── server/                     Express + PostgreSQL REST API
│   ├── server.js               entry point (node server.js)
│   ├── logics/serverLogic.js   app wiring, CORS, port, graceful shutdown
│   ├── db.js                   pg Pool built from env vars
│   ├── routes/                 auth, admin, market, farmerdb, homepage
│   ├── middleware/             JWT authorization
│   ├── utils/                  jwtGen, serverlogger, shutdown, allowedOrigins
│   ├── Dockerfile              Node 20 Alpine, non-root
│   └── .env.example            every server variable, documented
├── docker-compose.yml          postgres + API + client dev server
├── package.json                root command delegation (no workspaces — see below)
├── .gitignore
└── docs/RELEASE-NOTES.md
```

## Screenshots

> **TODO: add screenshot** — no screenshots are committed yet. Add real captures
> below before publishing; do not replace these with stock imagery.
>
> Suggested set: the landing page, the admin dashboard, the farmer database
> table with search, the marketplace grid, and the login screen (with the demo
> credentials redacted).

| Landing page | Admin dashboard |
| --- | --- |
| _TODO: add screenshot_ — `docs/screenshots/landing.png` | _TODO: add screenshot_ — `docs/screenshots/dashboard.png` |

| Farmer database | Marketplace |
| --- | --- |
| _TODO: add screenshot_ — `docs/screenshots/farmers.png` | _TODO: add screenshot_ — `docs/screenshots/market.png` |

## Quick start

### Option 1 — Docker Compose (recommended)

Requires Docker Desktop (or Docker Engine + Compose v2).

```bash
git clone <your-fork-url> famas
cd famas

# 1. Create the server environment file and set JWT_SECRET
cp server/.env.example server/.env
#    generate a key:  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# 2. Start PostgreSQL + API + client dev server
docker compose --env-file server/.env up --build
```

| Service | URL |
| --- | --- |
| Client (Vite dev server) | http://localhost:3030 |
| API liveness probe | http://localhost:5000/api/health |
| PostgreSQL | `localhost:5432` (user/password/db from `server/.env`) |

The database is empty on first boot; there is no migration or seeding tooling in
the repository yet (see [Known limitations](#known-limitations)).

Ports are overridable: `API_PORT`, `CLIENT_PORT`, `PGPORT`.

### Option 2 — manual (bare metal)

Requires Node.js >= 18 and a reachable PostgreSQL 16 instance.

```bash
# --- API -------------------------------------------------------------------
cd server
cp .env.example .env          # then edit JWT_SECRET / PG* values
npm install
npm run dev                   # node --watch-free: nodemon
# or: npm start               # plain `node server.js`

# --- client (second terminal) ---------------------------------------------
cd client
npm install
npm run dev                   # http://localhost:3030
```

From the repository root you can also delegate without `cd`-ing:

```bash
npm run install:all     # installs client + server dependencies
npm run dev:server      # API on :5000
npm run dev:client      # client on :3030
npm run build           # production client build into client/dist
```

Or skip the backend entirely: with no `VITE_API_URL` set the client serves
seeded demo data on its own — see [Demo credentials](#demo-credentials).

## Environment variables

### Client — `client/.env`

Vite only exposes variables prefixed with `VITE_`, and they are **inlined into
the bundle at build time** — never put secrets here.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | — | Base URL of the API, e.g. `http://localhost:5000` (no trailing slash). Every request is built as `${VITE_API_URL}/api/...`. **Leave unset to run in demo mode.** |
| `VITE_DEMO_MODE` | No | — | `true` forces the seeded in-memory mock backend; `false` disables it. Only honoured when `VITE_API_URL` is set — with neither variable set the client still falls back to demo mode rather than requesting `undefined/api/...`. |
| `VITE_CNARY_CLOUD_NAME` | No | — | Cloudinary cloud name, used only by the "add product" image upload. |
| `VITE_CNARY_UP_PRESET` | No | — | Cloudinary **unsigned** upload preset for that form. |
| `VITE_CNARY_API_KEY` | No | — | Cloudinary API key, referenced only in commented-out code. |
| `VITE_CNARY_SECRET` | No | — | Cloudinary secret. Never put a real one here — Vite inlines it into the bundle, making it readable in devtools. Prefer a signed upload endpoint on the server. |
| `VITE_API_PROXY_TARGET` | No | `http://localhost:5000` | Read by `vite.config.js`, not by app code: where the dev server proxies `/api`. Set to `http://server:5000` inside Docker. |

Without the Cloudinary variables the product uploader stores the placeholder
image; the product itself is still created.

### Server — `server/.env`

`server/.env.example` lists all of these with comments.

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `PORT` | No | `5000` | Port the Express API binds to. Hosting platforms inject their own. |
| `NODE_ENV` | No | `development` | Standard Node environment flag. |
| `POSTGRES_URL` | Recommended | — | Full connection string (`postgres://user:pass@host:5432/db`). Takes precedence over the `PG*` group. Render/Railway/Fly/Heroku provide this. |
| `PGHOST` | If no `POSTGRES_URL` | `localhost` | Database host. |
| `PGPORT` | No | `5432` | Database port. |
| `PGUSER` | If no `POSTGRES_URL` | `postgres` | Database user. |
| `PGPASSWORD` | If no `POSTGRES_URL` | `postgres` | Database password. **Set a real one outside local dev.** |
| `PGDATABASE` | If no `POSTGRES_URL` | `famas` | Database name. |
| `PGSSL` | No | `false` | `true` enables TLS (needed by most managed providers; uses `rejectUnauthorized: false`). |
| `ALLOWED_ORIGINS` | Yes in production | `http://localhost:3030` | Comma-separated browser origins allowed by CORS. Wildcards are supported for Vercel previews, e.g. `https://famas-*.vercel.app`. |
| `JWT_SECRET` | **Yes** | — | Signing key for the 2-hour login JWTs. Rotating it logs everyone out. |
| `DB_CONNECT_RETRIES` | No | `1` | Startup attempts before the API gives up on the database (compose sets `10`). |
| `DB_CONNECT_RETRY_DELAY_MS` | No | `2000` | Delay between those attempts. |

## Demo credentials

FaMaS ships a **demo mode** so the interface can be shown without any backend:
with `VITE_API_URL` unset (or `VITE_DEMO_MODE=true`) the client serves seeded
in-memory data from `client/src/api/mock/` instead of making HTTP calls. All of
it is fictional data invented for the demo — no real person's details.

Log in at `/login` with **either** an e-mail or a phone number (the form's toggle
decides which is sent):

| Account | E-mail | Phone | Password | Lands on |
| --- | --- | --- | --- | --- |
| Association admin | `admin@famas.demo` | `9800000001` | `admin123` | `/admin`, `/admin/farmers` |
| Farmer | `karthik.rao@example.com` | `9845012345` | `farmer123` | `/dashboard`, `/dashboard/products` |
| Banned farmer (shows the ban modal) | `lakshmi.gowda@example.com` | — | `farmer123` | login rejected purposely |

These mirror `client/src/api/mock/seed.js`, which is the source of truth — if the
seed changes, update this table. The demo session is driven by the
`role` and `uid` keys in `localStorage`, not by a real JWT.

Registering a new account through the demo UI creates it in the in-memory store
only; nothing is written to PostgreSQL. Against a live API, register through
`POST /api/auth/register` and set the `role` column to `admin` in the `users`
table to see the association admin views.

## Deployment

### Client → Vercel

The client deploys on its own; the repository root is **not** a Vercel project.

| Setting | Value |
| --- | --- |
| Root directory | `client` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` (default) |
| Environment variables | `VITE_API_URL` = your deployed API URL (+ `VITE_DEMO_MODE=true` for a backend-free demo deployment) |

`client/vercel.json` rewrites every path to `/` so the client-side router works
on deep links.

**Do not add npm workspaces to the root `package.json`.** Vercel resolves the
project from `client/` and hoisting dependencies to a root `node_modules` would
change what its install step produces. Root scripts therefore delegate with
`npm --prefix client …`, which keeps the Vercel build byte-for-byte identical to
a build run inside `client/`.

### API → Render / Railway / Fly

Any container host works — `server/Dockerfile` is production-oriented (Node 20
Alpine, `npm ci`, runs as the non-root `node` user, `GET /api/health` for
healthchecks).

1. Create a managed PostgreSQL instance.
2. Deploy with the repository root as context and `server/Dockerfile` as the
   Dockerfile (`docker build -f server/Dockerfile -t famas-server .`).
3. Set the environment variables: `POSTGRES_URL` (or the `PG*` group), `PGSSL=true`
   when the provider requires TLS, `JWT_SECRET` (long random value), and
   `ALLOWED_ORIGINS` = your Vercel production origin plus any preview pattern.
4. Point the client's `VITE_API_URL` at the deployed API URL, and add that
   origin to `ALLOWED_ORIGINS`.
5. Healthcheck path: `/api/health`.

Leaving `VITE_API_URL` unset (or setting `VITE_DEMO_MODE=true`) lets the
frontend run with **no backend at all**, which is the cheapest way to keep a
portfolio deployment alive — the seeded demo is what the live URL shows.

## Known limitations

Stated plainly, so nobody discovers them the hard way:

- **Hackathon-origin code.** The codebase was written quickly; several modules
  are duplicated (`sections/market` vs `sections/products`, `layouts/dashboard`
  vs `layouts/farmerdb`), and bundled dependencies are unused.
- **No test suite.** `npm test` in `server/` is a stub and there are no tests in
  `client/`. Nothing here is covered by CI.
- **No schema migrations or seeds.** Tables (`users`, `farmers`, `products`,
  `serverlogs`) must exist before the API is useful; the repository does not
  ship the SQL or a migration tool.
- **Single-tenant.** The data model has one association per deployment — there
  is no organisation/tenant column, so multi-association hosting is not
  supported.
- **Authentication is basic.** httpOnly cookies with a 2-hour JWT, bcrypt
  password hashing, and a role string (`admin` / `farmer`). No refresh tokens,
  no password strength policy, no rate limiting, no email verification.
- **Broken asset references.** The seeded demo data points product images at
  `/assets/placeholder.svg` because no `assets/images/products/` folder exists
  in this repository, and `client/public/manifest.json` lists a 512×512 icon
  that was never committed. `client/README.md` is still upstream template text
  and links a removed `public/assets/preview.jpg`.
- **A dead route import.** `server/logics/serverLogic.js` mounts
  `/api/forgot` from `routes/passwordreset/resetlogics`, a file that is not in
  the repository. The mount is wrapped in `optionalRouter()`, so the API still
  boots and that route returns `501 Not implemented` until the module is added —
  password reset does not currently work.
- **Secrets in the browser.** The Cloudinary `VITE_CNARY_*` variables are
  compiled into the client bundle; any real value there is public.

## License

MIT — see `client/LICENSE.md`. Third-party attributions and template notices are
listed there as well.
