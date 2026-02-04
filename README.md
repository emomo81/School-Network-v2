<div align="center">

# 🎓 UniConnect - School Network

### *A modern social platform connecting students, mentors, and educators*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

<br/>

<img src="https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=flat-square" alt="Status"/>
<img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
<img src="https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square" alt="PRs Welcome"/>

---

**Build meaningful connections • Share knowledge • Grow together**

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📁 Project Structure](#-project-structure) • [🛠️ Tech Stack](#️-tech-stack) • [📖 Documentation](#-documentation)

</div>

---

## 📸 Preview

<div align="center">
  <table>
    <tr>
      <td align="center"><strong>🏠 Feed</strong></td>
      <td align="center"><strong>👥 Discover</strong></td>
      <td align="center"><strong>💼 Projects</strong></td>
    </tr>
    <tr>
      <td>Share posts & updates</td>
      <td>Find new connections</td>
      <td>Collaborate on projects</td>
    </tr>
  </table>
</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👤 **User Experience**
- 🔐 Secure authentication (Login/Signup)
- 📝 Guided onboarding flow
- 🎨 Beautiful, responsive UI
- 🌙 Clean modern design

### 📱 **Social Features**
- 📰 Dynamic news feed
- 💬 Real-time messaging
- 🤝 Connection management
- 🔔 Toast notifications

</td>
<td width="50%">

### 🎓 **Academic Features**
- 📚 Study groups management
- 👨‍🏫 Mentor discovery
- 🎪 Campus events
- 💼 Project collaboration

### 🔧 **Technical Features**
- ⚡ Lightning-fast with Vite
- 🎯 Type-safe with TypeScript
- 📊 Data visualization (Recharts)
- 🎭 Smooth animations (Framer Motion)

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/school-network-v2.git

# Navigate to the project
cd school-network-v2/repo_4

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### 🌐 Open in Browser

Visit **http://localhost:5173** to see the magic! ✨

---

## 📁 Project Structure

```
repo_4/
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 dialogs/       # Modal dialogs (Edit Post, Project, Event)
│   │   ├── 📂 layout/        # Navigation & layout components
│   │   ├── 📂 onboarding/    # User onboarding flow
│   │   ├── 📂 pages/         # Main application pages
│   │   │   ├── 📂 auth/      # Authentication pages
│   │   │   └── ...           # Feature pages
│   │   ├── 📂 profile/       # Profile components
│   │   └── 📂 ui/            # Reusable UI components (50+ components)
│   ├── 📂 hooks/             # Custom React hooks
│   ├── 📂 lib/               # Utilities & helpers
│   ├── 📂 types/             # TypeScript type definitions
│   ├── 📄 App.tsx            # Main app component & routing
│   ├── 📄 main.tsx           # Application entry point
│   └── 📄 index.css          # Global styles
├── 📄 package.json
├── 📄 vite.config.ts
└── 📄 README.md
```

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **UI Components** | Radix UI, Lucide Icons, Remixicon |
| **Forms** | React Hook Form, Zod validation |
| **Routing** | React Router DOM v7 |
| **Auth** | Supabase Auth |
| **Charts** | Recharts |
| **Notifications** | Sonner |

</div>

---

## 📖 Documentation

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm tsc` | Run TypeScript compiler |

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗺️ Roadmap

- [x] User authentication
- [x] Onboarding flow
- [x] Feed & posts
- [x] Messaging system
- [x] Study groups
- [x] Events management
- [x] Mentor discovery
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Video calling integration

---

## 🤝 Contributing

Contributions are always welcome! 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 💖 Made with love for students, by students

**[⬆ Back to top](#-uniconnect---school-network)**

---

<sub>Built with React + TypeScript + Vite 🚀</sub>

</div>
