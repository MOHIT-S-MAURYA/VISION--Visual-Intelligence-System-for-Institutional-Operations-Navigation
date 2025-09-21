# VISION Frontend# React + Vite

**Visual Intelligence System for Institutional Operations Navigation**This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

A modern React-based frontend for the VISION attendance management system, built with cutting-edge AI and computer vision technology.Currently, two official plugins are available:

## 🚀 Features- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **AI-Powered Attendance**: Automated attendance marking using facial recognition

- **Role-Based Access Control**: Different dashboards for Admins, Teachers, and Students ## Expanding the ESLint configuration

- **Real-Time Analytics**: Live attendance tracking and performance metrics

- **Responsive Design**: Mobile-first design with Tailwind CSSIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **Microservices Architecture**: Clean separation of concerns

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Context API** - State management

## 📁 Project Structure

```
src/
├── api/             # API service functions
├── components/      # Reusable UI components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page-level components
│   ├── Auth/        # Authentication pages
│   ├── Dashboard/   # Role-specific dashboards
│   ├── Attendance/  # Attendance management
│   ├── Departments/ # Department management
│   ├── Admin/       # Admin panel
│   ├── Profile/     # User profiles
│   └── Reports/     # Analytics & reports
├── utils/           # Utility functions
├── routes.js        # Application routing
└── index.css        # Global styles & Tailwind
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MOHIT-S-MAURYA/VISION--Visual-Intelligence-System-for-Institutional-Operations-Navigation.git
   cd VISION/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 👥 User Roles

### Principal Admin

- Institution-wide management
- Department and user administration
- Global settings and analytics
- System monitoring and audit logs

### Department Admin

- Department-level management
- Student and teacher administration
- Attendance oversight and corrections
- Department reports and analytics

### Teacher

- AI-powered attendance marking
- Manual attendance adjustments
- Class management and reports
- Student communication

### Student

- Personal attendance tracking
- Leave request submissions
- Notifications and alerts
- Profile management

## 🎨 UI Components

The project includes custom Tailwind CSS components:

- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`
- **Forms**: `.input-field`, `.card`, `.card-header`, `.card-body`
- **Utilities**: `.text-gradient`, `.shadow-soft`, `.animate-fade-in`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_AI_SERVICE_URL=http://localhost:3001
VITE_MEDIA_SERVICE_URL=http://localhost:3002
```

### Tailwind CSS

The project uses Tailwind CSS v4 with custom VISION-specific styling. Configuration is in `tailwind.config.js`.

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for tablets
- **Desktop**: Full-featured desktop experience

## 🔐 Authentication

- JWT-based authentication
- Role-based route protection
- Session management with refresh tokens
- Secure logout and token cleanup

## 📊 State Management

- **Context API**: Global application state
- **Auth Context**: Authentication and user management
- **Global Context**: UI state, notifications, and data caching

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Production

The `dist/` folder contains the production-ready files that can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**VISION Frontend** - Transforming educational attendance management with AI-powered automation. 🎓✨
