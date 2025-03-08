# Next.js Hotel Management App

This is a full-stack hotel management application built with **Next.js**, **TailwindCSS**, **Prisma**, and **Supabase**. It includes features like user authentication, social login, hotel CRUD operations, server-side rendering, and pagination.

---

## Setup Instructions

### 1. Clone the Project
Clone the repository to your local machine:
```bash
git clone https://github.com/manirul41/next-hotel-app.git
```

### 2. Navigate to the Project Folder
```bash
cd next-hotel-app
```

### 3. Install Dependencies
Install the required dependencies using npm:
```bash
npm install
```
**Note:** Ensure you have Node.js version **v18.8 or higher** installed.

### 4. Set Up Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
DATABASE_URL="your_supabase_database_url"
DIRECT_URL="your_supabase_direct_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 5. Initialize Prisma
Initialize Prisma and update the `schema.prisma` file with the following configuration:
```bash
npx prisma init
```
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 6. Push Prisma Schema to Database
Push the Prisma schema to your Supabase database:
```bash
npx prisma db push
```

### 7. Run the Project
Start the development server:
```bash
npm run dev
```
The app will be running at `http://localhost:3000`.

---

## Deployment

### Deploy to Netlify
1. Connect your GitHub repository to Netlify.
2. Enable **CI/CD** for automatic deployments.
3. Add the environment variables in the Netlify dashboard under **Site Settings > Environment Variables**.
4. Deploy the app.

---

## Features

- **User Authentication**: JWT-based authentication with access and refresh tokens.
- **Social Login**: "Continue with Google" functionality.
- **Routing**: Parallel and intercepting routing for login/registration modals.
- **Server-Side Rendering**: Fetch and render hotel data on the server.
- **Pagination**: Display 8 hotel cards per page.
- **Hotel Management**: Create, edit, and delete hotels.
- **Social Media Sharing**: Share hotel details on social media platforms.
- **Error Handling**: Custom 404 and error pages.

---

## Technologies Used

- **Frontend**: Next.js, TailwindCSS, React Hook Form, Zod
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: NextAuth.js
- **Deployment**: Netlify

---

## Challenges and Solutions

1. **JWT Refresh Token Implementation**:
   - Used NextAuth.js and custom token rotation logic.
   - Referred to documentation and AI tools for guidance.

2. **Database Deployment**:
   - Initially faced issues with SQLite in production.
   - Switched to Supabase with PostgreSQL for a stable solution.

---

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.

---

## License

This project is open-source and available under the MIT License.

---

For any questions or support, please contact the repository owner.
