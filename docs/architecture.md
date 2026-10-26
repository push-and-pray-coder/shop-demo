
# Shop Demo — Architecture

Shop Demo uses a React frontend connected to a Django REST API,
with SQLite for persistent data storage.

## 1. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React | User interface |
| Build Tool | Vite | Frontend development and builds |
| Routing | React Router | Client-side navigation |
| HTTP Client | Axios | Frontend-to-backend communication |
| Backend | Django | Data models, database operations, and business logic |
| REST API | Django REST Framework | API endpoints and data serialization |
| Database | SQLite | Persistent data storage |
| Styling | CSS | Layout and responsive design |
| Version Control | Git | Source code management |

## 2. Frontend Architecture

**Framework:** React

### Pages
- Home
- Shop
- Categories
- Cart

### Planned Components
- Navbar
- Footer
- Hero
- ProductCard
- CategoryCard
- SearchBar
- CartItem

### Directory Structure
- `src/pages/` — Page components
- `src/components/` — Reusable UI components
- `src/services/` — API requests
- `src/assets/` — Images and static assets
- `src/App.jsx` — Application layout and routing
- `src/main.jsx` — Application entry point

## 3. Backend Architecture

**Framework:** Django + Django REST Framework

### Project Configuration
- `config/` — Project settings and URL routing

### Planned Applications
- `products/` — Product and category management
- `orders/` — Cart and order management

### Responsibilities
- Database models and migrations
- Database operations using Django ORM
- REST API endpoints
- Data serialization and validation
- Server-side business logic
- Administration through Django Admin

### Database
- SQLite
