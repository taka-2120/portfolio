# Portfolio

Personal portfolio website. Bilingual (English/Japanese) static site showcasing iOS apps and work experience.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Chakra UI 3
- **Content/Docs layout**: Nextra
- **Package manager**: Bun
- **Formatter/Linter**: Biome
- **Analytics**: Firebase

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

| Command | Description |
|---|---|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run format` | Format and lint `./src/**/*` |

## Structure

```
src/
├── app/[lang]/          # Pages (en / ja)
├── components/
│   ├── chakra/          # Chakra UI wrapper components
│   └── custom/          # Layout components (Header, Footer, etc.)
├── constants/           # Hardcoded content (services, experiences, links)
├── entities/            # TypeScript entity classes
└── types/               # Shared type definitions
public/
└── dictionaries/        # en.json / ja.json translation files
```

## i18n

All pages are served under `/{lang}/` where `lang` is `en` or `ja`. The middleware in `src/proxy.ts` handles locale redirects.

## Agent Instructions

See [AGENTS.md](./AGENTS.md) for AI coding agent guidance (`CLAUDE.md` is a symlink to it).
