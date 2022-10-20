# WorkOutLoud

Creating simple and efficient software for working out at home. This monorepo requires node >=16.0.0. You can download it from here https://nodejs.org/en/. Or what I recommend is installing nvm (node version manager) from here https://github.com/nvm-sh/nvm.

## Project

> Apps

- `api`
- `dashboard` - User dashboard

> Packages

- `eslint-presets` - ESLint presets of rules, plugins, etc.
- `tailwind-presets (in progress)` - TailwindCSS presets for colors, sizes, etc.
- `tsconfig` - TypeScript base configs.
- `types (in progress)` - Collection of types that are accessed by multiple apps.
- `ui (in progress)` - Components Library.
- `utils (in progress)` - Collection of utilities that are accessed by multiple apps.

### Stack and Technologies

- [JavaScript](https://www.javascript.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### Utilities

- [Turborepo](https://turborepo.org/) for managing this monorepo.

### Initial Setup

There are a couple things you'll need to do before you get started.

### Install Dependencies

To install all dependencies, use the following command **at root level**:

```
yarn install
```

### Build

To build all apps and packages, use the following command **at root level**:

```
yarn build
```

### Run

To run all apps, use the following command **at root level**:

```
yarn dev
```

To run or build a specific app, use the following command without `< >` **at root level**:

```
yarn dev --filter=<app_name>...
yarn build --filter=<app_name>...
```

Use the following commands to `add` or `remove` packages. If you want to add a
development dependency make sure to specify by adding `-D` or as shown below.

```
yarn workspace <app_name> add react
yarn workspace <app_name> add -D @types/react
yarn workspace <app_name> remove react
```
