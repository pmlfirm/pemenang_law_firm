# Pemenang Mandiri Law Firm Website

A responsive Next.js website for insurance product information, product-specific WhatsApp consultation, and an optional Gemini-powered AI assistant.

## Main features

- Centralized product and contact data in `lib/site-data.ts`
- Product-specific WhatsApp contacts for Marine Cargo, Marine Hull, Property, Motor Vehicle, Travel, Liability, and Claim Assistance
- Separate Marine Cargo and Marine Hull sections on one Marine product page
- English and Indonesian language switching from the right side of the navigation bar
- Responsive AI and WhatsApp launcher
- Local AI answers for common product and contact questions, with optional Gemini fallback
- Optimized local WebP images and static page generation

## Requirements

- Node.js 22.x
- pnpm 10.14.0

## Local development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm typecheck
pnpm build
```

## Environment variables

Copy `.env.example` to `.env.local`. The project contains safe built-in WhatsApp fallbacks, while environment variables can override them without editing UI components.

`GEMINI_API_KEY` is optional. When it is not configured, common product and contact questions continue to use local answers and the WhatsApp handoff.

## Vercel deployment

The repository includes:

- `.npmrc` using the public npm registry
- `pnpm-lock.yaml` synchronized with `package.json`
- `vercel.json` using `pnpm install --frozen-lockfile`
- Node.js 22.x and pnpm 10.14.0 pins

Upload the complete project, including `package.json`, `pnpm-lock.yaml`, `.npmrc`, and `vercel.json`. Add environment variables in Vercel only when overrides are required.
