# Remix Matador stack

![matador](./public/assets/matador.png)

A bold interface that helps you monitor your [BullMQ](https://docs.bullmq.io/) queues.

Learn more about [Remix Stacks](https://remix.run/stacks).

```bash
$ npx create-remix@latest --template nullndr/matador
```

# What's in the stack

- Matador interface built with [MantineUI](https://mantine.dev/) at `/matador` route
- A little [utility](https://github.com/nullndr/Matador/tree/main/app/queues) that helps you build your queues
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Start the Redis Database with [Docker](https://www.docker.com/get-started):

  > ℹ️ we use the latest version of Docker that already includes compose, not docker-compose

  ```bash
  $ npm run dev:docker
  ```

- Start dev server:

  ```bash
  $ npm run dev
  ```

If you want to stop the development Redis Database, run `npm run dev:docker:stop`

# Connecting to your Redis server

Matador needs a **Redis 6 instance** at least to work.

Set your redis connection string as the `REDIS_URL` env variable in your `.env` file.

## Type Checking

This project uses TypeScript.
It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete.
To run type checking across the whole project, run `npm run typecheck`.

## Linting

This project uses ESLint for linting that is configured in `.eslintrc.js`.

## Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project.
It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save.
There's also a `npm run format` script you can run to format all files in the project.

# What if I already have a project with BullMQ?

No worries, we've already thought about it!

An easy bash script can be found [here](https://github.com/nullndr/Matador/blob/main/remix.init/installer.sh).

in order to simply install Matador in your [Remix](https://remix.run) project, run:

```bash
$ curl https://raw.githubusercontent.com/nullndr/Matador/main/remix.init/installer.sh | \
    sh -s -- "/my/remix/project"
```

Matador will be copied in `/my/remix/project/app/routes/matador`, `/my/remix/project/app/routes/matador.tsx` and
`/my/remix/project/app/lib/matador`.

### But wait a sec, I do not use the app folder!!

Not a problem, you can provide the folder as the second argument of the script:

```bash
$ curl https://raw.githubusercontent.com/nullndr/Matador/main/remix.init/installer.sh | \
    sh -s -- "/my/remix/project" "root"
```

Matador will be copied in `/my/remix/project/root/routes/matador`, `/my/remix/project/root/routes/matador.tsx` and
`/my/remix/project/root/lib/matador`.
