# FaMaS API — Node 20 Alpine, non-root runtime.
# Build from the repository root so the build context stays reproducible:
#   docker build -f server/Dockerfile -t famas-server .

FROM node:20-alpine

ENV NODE_ENV=production \
    PORT=5000

WORKDIR /app

# bcrypt is a native module: its install script must run, otherwise the
# prebuilt binding is never fetched and login/register throw at runtime.
# devDependencies come along too, so `npm run dev` (nodemon) also works
# inside this image when a compose command overrides the default start.
COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund \
    && npm cache clean --force

COPY . .

# node:20-alpine ships an unprivileged `node` user (uid 1000).
RUN chown -R node:node /app
USER node

EXPOSE 5000

# Compose and platforms probe GET /api/health.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||5000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
