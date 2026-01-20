# ChaosForCurio Portfolio

A production-ready, award-winning portfolio website built with modern web technologies.

## Features

- ✨ **Premium Design**: Awwwards-inspired aesthetics with smooth animations
- 🎹 **3D Interactive Piano**: Powered by Three.js and React Three Fiber
- 🎨 **Advanced Animations**: GSAP and Framer Motion for fluid interactions
- 📱 **Fully Responsive**: Optimized for all devices
- ⚡ **Performance Optimized**: Built with Next.js 16 and Turbopack
- 🔍 **SEO Ready**: Complete meta tags, sitemap, and robots.txt
- 🎯 **Production Grade**: Linted, typed, and ready to deploy

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animation**: Framer Motion, GSAP, Anime.js, Lenis Smooth Scroll
- **Language**: TypeScript
- **Icons**: React Icons
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ChaosForCurio/From-Heaven-To-Horizon.git
cd From-Heaven-To-Horizon

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Homepage
│   ├── error.tsx          # Error boundary
│   ├── global-error.tsx   # Global error handler
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # SEO robots config
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section with split text
│   ├── Scene.tsx         # 3D piano scene
│   ├── Projects.tsx      # Projects showcase
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact form
│   └── SmoothScroll.tsx  # Lenis smooth scroll wrapper
├── public/               # Static assets
└── .npmrc                # npm configuration for dependencies
```

## Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
NEXT_PUBLIC_SITE_URL=your_production_url
```

## Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The `.npmrc` file ensures correct dependency resolution during deployment.

## Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized with dynamic imports
- **Smooth Scrolling**: 60fps with Lenis
- **3D Performance**: Efficient rendering with React Three Fiber

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is © 2026 ChaosForCurio. All rights reserved.

## Author

**ChaosForCurio**
- GitHub: [@ChaosForCurio](https://github.com/ChaosForCurio)
- Portfolio: [chaosforcurio.com](https://chaosforcurio.com)

---

Built with ❤️ and lots of coffee ☕