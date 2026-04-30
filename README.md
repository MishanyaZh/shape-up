# ShapeUp

ShapeUp is an MVP web app for flexible nutrition planning.

## Product Goal

- Calculate BMR and TDEE from user profile.
- Generate a practical daily nutrition structure.
- Track eaten food during the day.
- Show compliance indicators: consumed, remaining, and adherence.

## Stack

- Next.js (App Router)
- TypeScript (strict)
- MUI (UI and theming)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run eslint
- `npm run format` - run prettier

## Current Architecture Direction

- Feature-first modules in `src/features`.
- Thin route pages in `src/app`.
- Domain logic moved from pages into feature domain/hooks.

Planned feature layout:

```text
src/features/
	calculator/
	nutrition/
	tracking/
```

## Notes

- Local planning docs are intentionally gitignored (`docs/`).
- Product context exists locally and drives MVP scope.
