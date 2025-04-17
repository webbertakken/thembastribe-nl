# Themba's Tribe

Website about Rhodesian Ridgeback Themba and her puppies.

## 📝 Project Description

This website tells the story of Themba, a beautiful Rhodesian Ridgeback, and her upcoming litter of puppies. The site contains information about Themba, her partner Motsi van de Palsenborghœve, the Rhodesian Ridgeback breed, and updates about the puppies.

## 🚀 Technology

- [Astro](https://astro.build/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [React](https://reactjs.org/) - For interactive components
- [Framer Motion](https://www.framer.com/motion/) - For animations

## 🧞 Commands

| Command                  | Action                                             |
| :----------------------- | :------------------------------------------------- |
| `pnpm install`           | Install dependencies                               |
| `pnpm dev`               | Start local dev server at `localhost:4321`         |
| `pnpm build`             | Build your production site to `./dist/`            |
| `pnpm preview`           | Preview your build locally, before deploying       |
| `pnpm astro ...`         | Run CLI commands like `astro add`, `astro check`   |
| `pnpm astro -- --help`   | Get help using the Astro CLI                       |

## 📂 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   └── photos/
│   │       └── *.json
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── verhaal.astro
│   │   ├── pups.astro
│   │   └── fotos.astro
│   └── styles/
│       └── global.css
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or join their [Discord server](https://astro.build/chat).
