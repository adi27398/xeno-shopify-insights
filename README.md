# Shopify Data Ingestion & Insights Dashboard

This is a full-stack application designed to ingest real-time data from a Shopify store via webhooks and display key business metrics on a dynamic, live-updating dashboard.

### ✨ Live Demo

*   **Frontend URL:** [https://xeno-frontend-916k.onrender.com/](https://xeno-frontend-916k.onrender.com/)
*   **Demo Credentials:**
    *   **Email:** `demo@company.com`
    *   **Password:** `password123`

### 🚀 Key Features

*   **Real-Time Data Ingestion:** Listens for Shopify webhooks for new orders, products, and customers.
*   **Dynamic Dashboard:** Displays key metrics like Total Revenue, Total Orders, and Total Customers.
*   **Live Updates:** Utilizes WebSockets (Socket.IO) to update dashboard statistics in real-time without needing a page refresh.
*   **Data Visualization:** Includes time-series charts to visualize order trends and lists of top-performing customers.
*   **Secure Authentication:** User login is protected by a JWT-based authentication system.
*   **Decoupled Architecture:** Built with a separate React frontend and Node.js/Express backend for scalability and maintainability.

---

### 🏛️ Architecture Diagram

The application uses a modern, decoupled full-stack architecture. The frontend is a React SPA, the backend is a Node.js/Express API, and the database is a cloud-hosted, MySQL-compatible TiDB cluster. Shopify acts as an external data source.

[![Architecture Diagram]



<img width="940" height="547" alt="image" src="https://github.com/user-attachments/assets/7c9337dd-a2e5-465b-8983-11e9f29a1bd2" />





### 🔧 Setup and Installation (Local Development)

#### Prerequisites
*   Node.js (v18 or later)
*   npm or yarn
*   Git
*   A TiDB Cloud account or a local MySQL database instance.

#### Backend Setup (`server` directory)

1.  **Navigate to the backend directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:** Create a file named `.env` in the `server` directory and populate it with your credentials. Use `.env.example` as a template:
    ```
    # .env
    DB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
    DB_USER=your_tidb_user
    DB_PASSWORD=your_tidb_password
    DB_NAME=xeno_shopify_db
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Create the initial user:** The application is designed for a single admin user. Create this user by running the database seeder script.
    > **Note:** The seeder script creates a user with `email: 'adityagoja9@gmail.com'` and `password: 'happyhome'`, and also creates the corresponding Tenant. Edit `scripts/seed.js` to change these values if needed.
    ```bash
    npm run db:seed
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```
    The backend API will be running at `http://localhost:5000`.

#### Frontend Setup (`client` directory)

1.  **Navigate to the frontend directory in a new terminal:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:** Create a file named `.env` in the `client` directory.
    ```
    # .env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4.  **Start the React development server:**
    ```bash
    npm start
    ```
    The frontend will be available at `http://localhost:3000`.

---

### 📡 API Endpoints & Database Schema

#### API Endpoints

*   `POST /api/auth/signup`: (Public) Creates a new user.
*   `POST /api/auth/signin`: (Public) Authenticates a user and returns a JWT.
*   `POST /api/webhooks/shopify`: (Public) Ingests webhook data from Shopify.
*   `GET /api/insights/summary`: (Protected) Gets dashboard summary statistics.
*   `GET /api/insights/orders-by-date`: (Protected) Gets data for order trend charts.
*   `GET /api/insights/top-customers`: (Protected) Gets a list of top customers.

#### Database Schema (Data Models)

*   **Tenant:**
    *   `id`: INTEGER (PK)
    *   `shopifyShopDomain`: STRING
    *   `shopifyAccessToken`: STRING

*   **User:**
    *   `id`: INTEGER (PK)
    *   `email`: STRING
    *   `password`: STRING (Hashed)
    *   `tenantId`: INTEGER (FK -> Tenant)

*   **Customer, Product, Order:**
    *   These models store the relevant fields ingested from Shopify webhooks and are linked via a `tenantId` (FK -> Tenant).

---

### ⚠️ Known Limitations & Assumptions

*   **Single-Tenant Focus:** The application is built and configured for a single user and tenant. A full multi-tenant user management system is a future step.
*   **Webhook-First Data:** The dashboard only reflects data received via webhooks. A historical data import feature is not included.
*   **Manual User Creation:** The primary user must be created via a database seed script or Postman; there is no public-facing signup flow.
*   **No Shopify OAuth:** The app installation flow (OAuth2) is not implemented. The `Tenant` and `shopifyAccessToken` must be seeded manually.
*   **Deployment on Free Tiers:** The application is deployed on Render's free tier, which may cause the backend to "spin down" after a period of inactivity, leading to a longer initial load time.
