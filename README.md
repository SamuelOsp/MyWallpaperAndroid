# 🌌 MyWally – Smart Wallpaper App  

MyWally is a **modern wallpaper application** built with **Ionic + Angular (NgModule architecture)**.  
It integrates **Firebase Authentication**, **Supabase Storage**, **Pixabay API**, and a **custom Android Capacitor plugin** to deliver a seamless wallpaper experience for Android users.  

This project is more than a wallpaper viewer – it demonstrates real-world, production-ready development practices: authentication, cloud storage, internationalization, native Android integration, and elegant UI/UX.  

---

## 🚀 Features  

### 🔐 Authentication  
- **Firebase Authentication** with Email/Password and social logins.  
- Secure session management.  
- Login and registration pages built with **NgModule + ngx-translate** for multilingual users.  

### 🖼️ Wallpaper Management  
- Wallpapers fetched dynamically from **Pixabay API**.  
- User image uploads stored in **Supabase** (`user_images` table with `path` and `created_at`).  
- Efficient caching with **RxJS BehaviorSubject** for performance.  

### 📱 Native Android Integration  
- Custom **Capacitor plugin (WallpaperPlugin)** in Java.  
- Uses Android’s `WallpaperManager` to set wallpapers in:  
  - **HOME** (Home screen)  
  - **LOCK** (Lock screen)  
  - **BOTH** (Home + Lock)  
- Supports remote image download and async wallpaper setting.  

### 🌐 Internationalization (i18n)  
- Integrated with **ngx-translate** for multi-language support.  
- Translation files managed with **BabelEdit**.  
- Language toggle available directly on pages.  

### 🎨 UI/UX Design  
- Transparent “glass” style headers and toolbars (`backdrop-filter`, `blur`, liquid-glass effects).  
- Grid-based wallpaper gallery with lazy-loading.  
- Responsive layout with **Ionic components** (Cards, FABs, ActionSheets).  
- Dark mode support via CSS variables.  

### ⚡ Performance & Architecture  
- Built with **NgModule** (not standalone).  
- OnPush change detection for efficiency.  
- Clean folder structure with `core`, `shared`, and `pages`.  
- Environment variables for API keys (`environment.PIXABAY_BASE_URL`, `environment.PIXABAY_API_KEY`).  
- Async Pipes and Observables for state management.  

---

## 🛠️ Tech Stack  

- **Frontend:** Ionic + Angular (NgModule)  
- **Authentication:** Firebase Auth  
- **Backend/Storage:** Supabase  
- **API Integration:** Pixabay REST API  
- **Native Integration:** Capacitor + Android (Java plugin)  
- **Internationalization:** ngx-translate + BabelEdit  
- **UI:** Ionic Components, SCSS, Glassmorphism  

---
