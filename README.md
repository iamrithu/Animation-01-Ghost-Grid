# 🎭 Ghost Grid Animation

A stunning, interactive hero section featuring a dynamic "ghost grid" animation system built with Next.js and GSAP. Experience smooth panel transitions, holographic navigation effects, and immersive hover interactions.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=flat-square&logo=greensock)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🎬 Smooth Panel Animations**: Interactive grid panels that expand and reveal content on hover
- **🌈 Holographic Navigation**: Glass-morphism bottom navigation bar with dynamic light beams
- **⚡ GSAP-Powered**: High-performance animations using GreenSock Animation Platform
- **🎨 Color-Coded Sections**: Each section has its own theme color with coordinated animations
- **📱 Responsive Design**: Fully responsive layout that works on all screen sizes
- **🚀 Loading Sequence**: Elegant boot sequence animation on initial page load
- **🎯 Interactive Hover States**: Rich hover interactions with smooth transitions

## 🎯 Sections

The hero section features five distinct sections:

1. **Hydrology** - Clean Water & Purification Systems (Cyan)
2. **Transit** - Hyper Loop & Rapid Network (Amber)
3. **Energy** - Power Grid & High Voltage (Violet)
4. **Industry** - Mega Factory & Production (Emerald)
5. **Urban** - City Scape & Architecture (Pink)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Animation**: [GSAP 3](https://greensock.com/gsap/) with [@gsap/react](https://greensock.com/react/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd animation-01-ghost-grid
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 🎨 How It Works

### Panel System
The hero section uses a sophisticated panel system where:
- Each panel is initially clipped to show as a vertical strip
- On hover, the active panel expands to full screen using `clip-path` animations
- Z-index management ensures smooth layering transitions
- Background images and content fade in/out with coordinated timing

### Navigation Bar
The bottom navigation features:
- Glass-morphism design with backdrop blur
- Dynamic light beams that activate on hover
- Color-coordinated borders and icons
- Smooth CTA button reveals
- Holographic visual effects

### Animation Timeline
1. **Initial Load**: Counter animation (0-100%) with split-screen loader
2. **Content Reveal**: Main content fades in with navigation slide-up
3. **Hover Interaction**: Panel expansion with content reveal
4. **Leave State**: Smooth reset to initial grid layout

## 📁 Project Structure

```
animation-01-ghost-grid/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── HeroSection.tsx     # Main hero component with animations
├── public/                 # Static assets
└── package.json
```

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 🎓 Key Concepts

- **GSAP Timeline**: Orchestrates complex animation sequences
- **Clip Path Animations**: Creates the expanding panel effect
- **Context-Safe Functions**: Ensures animations work correctly with React's lifecycle
- **Z-Index Management**: Controls panel layering during transitions
- **Performance Optimization**: Uses `will-change` and efficient animation properties

## 🔧 Customization

### Adding New Sections
Edit the `SECTIONS` array in `components/HeroSection.tsx`:

```typescript
const SECTIONS: SectionItem[] = [
  {
    id: 1,
    category: "Your Category",
    title: "Your Title",
    heading: "Your Heading",
    desc: "Your description",
    img: "your-image-url",
    icon: YourIcon,
    color: "#your-color",
  },
  // ... more sections
];
```

### Adjusting Animation Timing
Modify duration and easing values in the GSAP animations:

```typescript
gsap.to(panel, { 
  clipPath: 'inset(0% 0% 0% 0%)', 
  duration: 1.25,  // Adjust duration
  ease: "power4.inOut",  // Change easing
});
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/) for the powerful animation library
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Lucide](https://lucide.dev/) for the beautiful icons

---

Made with ❤️ using Next.js and GSAP
