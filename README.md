## 🚀 How to Run Locally

Welcome to the project! Follow these steps to get the application running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher is recommended.
- **pnpm**: This project uses `pnpm` as the package manager. If you don't have it, you can install it with `npm install -g pnpm`.

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/ctafsiras/ai-article-summarizer-frontend.git
cd ai-article-summarizer-frontend
```

### 2. Backend Setup

To set up the backend server, please follow the instructions provided in the official backend repository:

[Backend Setup Guide](https://github.com/ctafsiras/ai-article-summarizer-backend/blob/main/README.md)

### 3. Frontend Setup

Now, let's set up the frontend application.

#### Installation

Open a new terminal, navigate to the `ai-article-summarizer-frontend` directory, and install the dependencies:

```bash
cd ai-article-summarizer-frontend
pnpm install
```

#### Environment Variables

Create a `.env` file in the `ai-article-summarizer-frontend` directory. This file will contain the URL of your backend API.

```env
# URL of the backend server
NEXT_PUBLIC_SERVER_URL="http://localhost:5000/api/v1"
```

#### Running the Frontend

With the setup complete, you can now start the frontend development server:

```bash
pnpm dev
```

## Running with Docker

You can run this backend easily using Docker. This is useful for local development, production deployments, or when you want to avoid installing dependencies manually.

### 1. Prepare Your `.env` File

Make sure you have a `.env` file with above mentioned variables.

### 2. Build the Docker Image

From the `ai-article-summarizer-frontend/` directory, build the Docker image:

```bash
docker build -t ai-article-summarizer-frontend .
```

### 3. Run the Docker Container

Run the container and pass your `.env` file:

```bash
docker run --env-file .env -p 3000:3000 ai-article-summarizer-frontend
```

- The app will be available at [http://localhost:3000](http://localhost:3000) (or the port you specify in `.env`).
- Ensure your database and API keys are reachable from inside the container.

---

The frontend application should now be running on `http://localhost:3000`.

### Summary

To have the full stack running, you'll need two separate terminal windows:

1.  One in the `ai-article-summarizer-backend` directory running `pnpm dev` or use `docker run --env-file .env -p 5000:5000 ai-article-summarizer-backend`
2.  Another in the `ai-article-summarizer-frontend` directory running `pnpm dev` or use `docker run --env-file .env -p 3000:3000 ai-article-summarizer-frontend`

You can now access the application by opening `http://localhost:3000` in your web browser. Happy coding! 👨‍💻
