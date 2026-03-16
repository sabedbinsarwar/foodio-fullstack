# Foodio Frontend 

The elegant client-side interface for the **Foodio** platform. Designed with a premium "Coffee & Cream" aesthetic, this **Next.js** application provides a seamless experience for food discovery and ordering.

---

## Design & Experience
- **Theme:** Refined "Coffee & Cream" UI palette.
- **Animations:** Fluid micro-interactions powered by **Framer Motion**.
- **State Management:** Real-time cart updates and persistent sessions via **Zustand**.
- **Responsive:** Fully optimized for mobile, tablet, and desktop views.

---

##  Installation & Setup

### 1. Install Dependencies
```bash
npm install
2. Environment Configuration
Create a .env.local file in the root of the foodio-frontend directory:

Code snippet
# URL of your running NestJS backend
NEXT_PUBLIC_API_URL=http://localhost:5000
3. Run the Development Server
Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

Tech Stack
Framework: Next.js 14+ (App Router)

Styling: Tailwind CSS

State: Zustand

Icons: Lucide React

Animations: Framer Motion

Key Features
Dynamic Cart: Add, remove, and adjust quantities with instant price calculations.

Role-Based Views: Specialized layouts for Users and Administrators.

Protected Routes: Secure navigation ensures sensitive pages are only accessible to authenticated users.

Quick-Admin Access: Integrated shortcut for reviewers to access the dashboard.

Build for Production
Bash
npm run build
npm run start
License
This project is part of the Foodio Fullstack application.


---

### Final Push to GitHub
Now that both the root, backend, and frontend READMEs are perfect, run this final sync in your terminal:

```powershell
git add .
git commit -m "docs: complete professional documentation for all modules"
git push origin main
