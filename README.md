# UNTOLDsuri – Documenting Barak Valley's Forgotten History

UNTOLDsuri is an independent documentary project dedicated to recovering and recording the histories of Barak Valley — stories that never made it into textbooks, archives, or mainstream discourse.

## 🌟 Key Features

- **Cinematic Archive Aesthetic**: A modern glassmorphism design with an archival, museum-like feel.
- **Dynamic Content System**: Built with a clean separation of data and logic. All website content is easily editable in a single configuration file.
- **Custom Interactive Elements**:
  - Precision cursor tracer with a trailing glass bubble ring.
  - Floating ambient orbs and cinematic background grain.
- **Optimized Video Showcase**: High-performance "Featured Works" section using cinematic thumbnails and direct links to Instagram Reels/YouTube.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **HTML5**: Semantic structure.
- **Vanilla CSS**: Custom design system with glassmorphism, blur effects, and animations.
- **Vanilla JavaScript**: Lightweight rendering engine and custom cursor logic.

## 📁 Project Structure

```text
/
├── index.html          # Minimal HTML shell (content is injected here)
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet (design system & animations)
│   ├── js/
│   │   ├── config.js   # BACKEND: Edit this file to change site content
│   │   └── main.js     # RENDERER: Core logic and site engine
│   └── img/            # Site images and thumbnails
└── Logo/               # Brand assets
```

## 📝 How to Update Content

You don't need to know how to code to update the website. Simply open `assets/js/config.js` and modify the text or links inside the `window.SITE` object.

1.  **Change Links**: Update URLs for YouTube, Instagram, or Facebook in the `links` section.
2.  **Add Videos**: Add new video titles, descriptions, and YouTube/Instagram links in the `works` array.
3.  **Update Team**: Modify names, roles, and bios in the `team` section.
4.  **Edit Research**: Simply add or remove items from the `research` lists.

## 📄 License

This project is for documenting and preserving history. All rights reserved by UNTOLDsuri.