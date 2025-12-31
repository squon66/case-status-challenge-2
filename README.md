# Case Status Technical Interview

**Target Role:** Frontend Engineer (React/Next.js)

This repository contains a complete Flask backend API and a Next.js frontend starter. Your task is to build out the frontend interface - **no Python coding required**.

## Project Structure

- `app.py` - Complete Flask backend (DO NOT MODIFY)
- `helper.py` - Import logic and helper classes (DO NOT MODIFY)  
- `case-status-interview-fe/` - Next.js frontend (YOUR WORK HERE)
- `test_import_client_handler.py` - Backend unit tests (for reference)

## Backend API

The Flask backend is fully implemented with these endpoints:

- **GET /clients** - List all clients
- **PATCH /clients** - Create or update a client
- **DELETE /clients/<id>** - Delete a client by ID

All validation, error handling, and business logic is complete.

## Backend Setup
1. ** Create your virtualenv **
    ```zsh 
    python -m venv .venv
   ```
2. **Activate the virtual environment:**
    ```zsh
    source .venv/bin/activate
    ```
3. **Install Packages:**
    ```zsh
    pip install -r requirements.txt
    ```
4. **Create DB and start app:**
    ```zsh
    python app.py
    ```
    The API will be available at `http://localhost:5000`
5. **Verify backend is working:**
    ```zsh
    curl http://localhost:5000/clients
    ```

## Frontend Setup

1. **Navigate to the frontend directory:**

```zsh
   cd case-status-interview-fe
```

2. **Install dependencies:**

```zsh
   npm install
   # or
   yarn install
```

3. **Start the dev server:**
```zsh
   npm run dev
```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Files
- `app.py`: Main Flask application and models
- `helper.py`: Import logic and helper classes
- `test_import_client_handler.py`: Unit tests for client import logic
- `.venv/`: Virtual environment

## Your Task
1. **Fetch and display** the client list from the API
2. **Build a form** to create/update clients
3. **Implement optimistic UI** with loading states and error handling
4. **Handle API errors** gracefully with user feedback

## Requirements

**Backend (provided - no changes needed):**
- Python 3.12+ ([Download here](https://www.python.org/downloads/) - includes pip)
- Flask and Flask-SQLAlchemy (installed via requirements.txt)

**Frontend (your work):**
- Node.js 18+ ([Download here](https://nodejs.org/))
- npm or yarn (comes with Node.js)

**Note for frontend developers:** If you encounter any Python environment issues, please reach out. We want you focused on building the React interface, not debugging Python setup.
## Backend Testing (Optional)
If you want to verify the backend works correctly:
```zsh
python -m unittest discover
```

All tests should pass. You do not need to write or modify tests.

## Questions?
If you encounter any backend issues, please document them in your submission notes rather than attempting to fix Python code.
