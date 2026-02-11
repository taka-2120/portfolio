# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a software engineer. Bilingual (English/Japanese) static site showcasing iOS apps and work experience. Built with Next.js 16 (App Router), Chakra UI 3, and Nextra for content/docs layout.

## Commands

- **Dev server**: `bun run dev`
- **Build**: `bun run build`
- **Format**: `bun run format` (runs Biome check + fix on `./src/**/*`)
- **Format staged files**: `bun run format:staged` (used by pre-commit hook)

Package manager is **Bun** (v1.3.9). Node version is 24.11.1 (managed via mise).

There is no test suite configured.

## Code Style

- **Formatter/Linter**: Biome — tab indentation, double quotes for JS/TS, organize imports on save
- **Lint rule**: `noUnusedImports` is enforced as an error
- **Pre-commit hook** (Husky): automatically runs `bun run format:staged` before every commit

## Architecture

### Routing & i18n

All pages live under `src/app/[lang]/` using Next.js dynamic route segments. The `[lang]` parameter is either `en` or `ja`. Middleware (`src/proxy.ts`) redirects bare paths to `/{locale}/path` and handles legacy privacy policy URL redirects for iOS apps.

Static params are generated for both locales via `generateStaticParams()`. Dictionary files (`public/dictionaries/en.json`, `ja.json`) are loaded server-side by `src/app/[lang]/dictionaries.js`.

### Data Layer

Content is hardcoded in TypeScript constants (`src/constants/`), not fetched from a CMS. Entity classes in `src/entities/` define the shape of services (iOS apps), work experiences, and external links — each with bilingual fields.

### Component Patterns

- Server Components are the default; Client Components are explicitly marked with `"use client"`
- Chakra UI wrapper components live in `src/components/chakra/` (generated/customized Chakra snippets)
- Custom layout components (Header, Footer, Wrapper, TopSection) are in `src/components/custom/`
- Nextra with `nextra-theme-docs` provides the outer docs-style layout shell

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Analytics

Firebase is initialized in `src/firebase.ts` for analytics only. Credentials are in `.env.local`.
