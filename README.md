# EmotionDo
![pawelzmarlak-2024-11-03T05_12_13 072Z](https://github.com/user-attachments/assets/f6d91c13-ade5-4345-aa6e-77e53f7e8271)

EmotionDo is a task management application that allows users to add tasks and classify them based on sentiment. This project consists of both a frontend and a backend, with the frontend built using Next.js and SCSS, and the backend built using FastAPI.

## Features

- Add tasks with sentiment classification.
- View the list of tasks.
- Responsive and modern UI.
- Built with Next.js, SCSS, and FastAPI.

## Prerequisites

- **Node.js** (for the frontend)
- **Python** and **Conda** (for the backend)
- **FastAPI** for the backend
- **Next.js** for the frontend

## Getting Started

### Backend

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Create and activate a Conda environment:**

    ```bash
    conda create -n myenv python=3.9
    conda activate myenv
    ```

3. **Install the required dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Run the FastAPI backend server:**

    ```bash
    uvicorn backend.main:app --reload
    ```

    The backend server should now be running on `http://127.0.0.1:8000`.

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install the necessary packages:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

    The frontend application should now be running on `http://localhost:3000`.

## Project Structure

```plaintext
EmotionDo/
│
├── backend/
│   ├── main.py
|
├── app/
│   ├── page.tsx
│   ├── ...
└── README.md
