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

## Image Optimization

This project uses several methods to optimize images:

### 1. Astro's Built-in Image Optimization

The website uses Astro's Image component for optimized image delivery:

- Automatic WebP format conversion
- Responsive sizing
- Lazy loading
- Width and height attributes to prevent layout shifts

### 2. Image Processing Scripts

There are two utility scripts for bulk image processing:

#### Optimize Images

Converts all images to optimized WebP format with appropriate compression:

```bash
npm run optimize-images
```

- Resizes very large images (>1920px wide)
- Applies different compression levels based on file size
- Converts all images to WebP format
- Reports size reduction statistics

#### Generate Thumbnails

Creates smaller thumbnail versions for gallery previews:

```bash
npm run generate-thumbnails
```

- Creates 300x200px thumbnails
- Uses WebP format with 70% quality
- Names files with "thumb-" prefix

### Image Asset Organization

Images are stored in three directories:

- `src/assets/images/` - Original imported images
- `src/assets/optimized/` - Optimized WebP versions
- `src/assets/thumbnails/` - Small preview thumbnails

### Best Practices

When adding new images:

1. Place the original images in `src/assets/images/`
2. Run optimization scripts: `npm run optimize-images && npm run generate-thumbnails`
3. Import and use the optimized images in your components
4. Specify width, height, and format in Astro Image components
5. Use the `loading="lazy"` attribute for below-the-fold images
