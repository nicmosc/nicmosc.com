# NextJS-powered personal website

This is a small project to try out the following technologies:
- NextJS as a metaframework to try out SSR capabilities
- Turborepo for monorepo management

The project includes the following apps/packages:
- `apps/web`: contains the SSR website that will render static content
- `apps/admin`: contains the non-SSR web client to manage the content (like a CMS)
- `packages/database`: contains the wrapper around Prisma and a mongodb for the two apps to read/write
- `packages/ui`: contains the shared UI components for all apps
- `packages/config`: contains the shared config used by all packages/apps

### Develompent
Simply run `npm run dev` to launch all dev processes across the packages. Ensure all necessary env vars are set in the individual packages beforehand.