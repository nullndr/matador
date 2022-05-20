# Remix Matador stack

![matador](./public/assets/matador.png)

A bold interface that helps you monitor your [BullMQ](https://docs.bullmq.io/) queues.

Learn more about [Remix Stacks](https://remix.run/stacks).

```sh
$ nxp create-remix@latest --template nullndr/matador
```

# What's in the stack

- Matador interface built with [MantineUI](https://mantine.dev/)
- A little [utility](https://github.com/nullndr/Matador/tree/main/app/queues) that helps you build your queues
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Static Types with [TypeScript](https://typescriptlang.org)

# Development

- Start dev server:

  ```sh
  $ npm run dev
  ```

# Connecting to your Redis server

Matador needs a **Redis 6 instance** at least to work.

Set your redis connection string as the `REDIS_URL` env variable in your `.env` file.

# Type Checking

This project uses TypeScript.
It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete.
To run type checking across the whole project, run `npm run typecheck`.

# Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project.
It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save.
There's also a `npm run format` script you can run to format all files in the project.

# What if I already have a project with BullMQ?

We're planning to give you a simple script that will copy only the route and it's library.
