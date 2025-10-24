# 🔥 CanadianEcom - Heated Clothing E-Commerce Store

A modern, full-stack e-commerce platform specializing in premium heated clothing for the Canadian winter. Built with React, Supabase, and Stripe for a seamless shopping experience.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://canadianecom.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

### Customer Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Product Catalog** - Browse heated jackets, vests, gloves, and accessories
- **Advanced Filtering** - Search and filter products by category
- **Shopping Cart** - Add, remove, and manage quantities with real-time updates
- **Secure Checkout** - Integrated Stripe payment processing
- **User Accounts** - Order history and profile management

### Technical Highlights
- **React 18** with modern hooks and context API
- **Client-side routing** with hash-based navigation
- **State management** using React Context
- **Tailwind CSS** for responsive, utility-first styling
- **Supabase** for authentication and database management
- **Stripe integration** for secure payment processing (in progress)
- **Real-time cart updates** with optimistic UI patterns

## 🛠️ Tech Stack

**Frontend:**
- React 18.3
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)

**Backend & Database:**
- Supabase (PostgreSQL)
- Supabase Auth

**Payment Processing:**
- Stripe API

**Deployment:**
- Vercel (planned)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (for payment processing)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DGFellow/canadian-heated-clothing.git
   cd canadian-heated-clothing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

## 🗂️ Project Structure

```
canadian-heated-clothing/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component with routing
│   ├── index.css       # Tailwind directives and global styles
│   └── main.jsx        # Application entry point
├── .env.local          # Environment variables (not in repo)
├── .gitignore
├── package.json
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── vite.config.js      # Vite configuration
```

## 🎨 Key Components

- **Navigation** - Responsive header with cart count and mobile menu
- **HomePage** - Hero section with featured products
- **ShopPage** - Product grid with category filtering and search
- **ProductPage** - Detailed product view with size selection
- **CartPage** - Shopping cart management
- **CheckoutPage** - Order form and payment integration
- **AccountPage** - User authentication and profile management

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public API key |

## 📊 Database Schema (In Development)

### Tables
- **products** - Product catalog (id, name, description, price, category, image_url, sizes, stock)
- **users** - Customer accounts (managed by Supabase Auth)
- **orders** - Order history (id, user_id, total, status, created_at)
- **order_items** - Individual items in orders (id, order_id, product_id, quantity, price, size)

## 🚧 Roadmap

- [x] Basic project setup and routing
- [x] Shopping cart functionality
- [x] Product catalog UI
- [ ] Supabase database integration
- [ ] User authentication with Supabase
- [ ] Stripe payment processing
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Product image uploads
- [ ] Email notifications
- [ ] Deploy to production

## 🎯 Learning Objectives

This project demonstrates proficiency in:

- Modern React development patterns (Hooks, Context API)
- State management in e-commerce applications
- Responsive UI design with Tailwind CSS
- RESTful API integration
- Authentication and authorization
- Payment gateway integration
- Database design for e-commerce
- Full-stack JavaScript development

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- Website: [canadianecom.com](https://canadianecom.com)
- Email: dominicgoodfellow98@gmail.com
- GitHub: [@DGFellow](https://github.com/DGFellow)

## 🙏 Acknowledgments

- Heated clothing product concepts inspired by Canadian winter needs
- Icons by [Lucide](https://lucide.dev/)
- Built with guidance from modern React best practices

---

**Note:** This project is currently in active development. The database schema and payment integration are being implemented. Check back for updates!

⭐ If you found this project interesting, please consider giving it a star on GitHub!