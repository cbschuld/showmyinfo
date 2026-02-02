# ShowMyInfo.net

Display your IP address, browser fingerprint, device information, and network details.

**Live at: [showmyinfo.net](https://showmyinfo.net)**

## Architecture

- **Frontend**: Preact + Signals, Vite 6, Tailwind CSS 4 → Cloudflare Pages
- **Backend**: Cloudflare Workers (TypeScript)
- **Monorepo**: pnpm workspaces + Turborepo

```
showmyinfo/
├── packages/
│   ├── web/      # Frontend (Cloudflare Pages)
│   ├── worker/   # Backend API (Cloudflare Workers)
│   └── shared/   # Shared TypeScript types
├── turbo.json    # Turborepo configuration
└── package.json  # Workspace root
```

## Data Collected

### Server-Side (Cloudflare Worker)
- IP address (v4/v6), ASN, ISP
- Geolocation: country, region, city, postal code, coordinates, timezone
- TLS version, cipher suite, HTTP protocol
- All HTTP headers including Client Hints

### Client-Side (Browser)
- Screen resolution, color depth, pixel ratio
- Hardware: CPU cores, device memory, touch support
- Battery status, network connection type
- Canvas/WebGL/Audio fingerprints
- Detected fonts
- WebRTC local IPs
- Browser features and storage APIs
- Privacy: DNT, ad blocker detection

## Development

```bash
# Install dependencies
pnpm install

# Start all dev servers
pnpm dev

# Or start individually
pnpm --filter @showmyinfo/web dev     # Frontend at http://localhost:3000
pnpm --filter @showmyinfo/worker dev  # Worker at http://localhost:8787
```

## Deployment

```bash
# Deploy everything (builds first via Turborepo)
pnpm deploy

# Or deploy individually
pnpm --filter @showmyinfo/worker deploy   # Deploy worker to Cloudflare Workers
pnpm --filter @showmyinfo/web build       # Build web
pnpm --filter @showmyinfo/web deploy      # Deploy web to Cloudflare Pages
```

## Setup Cloudflare

1. Create Cloudflare account at https://dash.cloudflare.com/sign-up
2. Add `showmyinfo.net` domain to Cloudflare
3. Update nameservers at registrar
4. Login with wrangler: `npx wrangler login`

## Cost

**$0/month** - Cloudflare free tier includes:
- 100,000 Worker requests/day
- Unlimited Pages deployments
- Free DNS and SSL
