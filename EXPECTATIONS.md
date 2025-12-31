# Frontend Technical Interview Exercise

**Role:** Frontend Engineer (React/Next.js)  
**Time Estimate:** 2-3 hours  
**Focus:** Build a production-quality React interface

## Overview

You will build a Next.js frontend that consumes an existing Flask backend API. The backend is complete and fully functional - **you will not write any Python code**.

The backend exposes:
- **GET /clients** - List all clients
- **PATCH /clients** - Create or update a client  
- **DELETE /clients/<id>** - Delete a client (optional stretch goal)

Your frontend should provide a professional user experience for managing client data.

---

## Required Tasks

### 1. Client List Display

- Fetch and render the client list from `GET /clients` on initial load
- Display core fields: `id`, `first_name`, `last_name`, `email`, `cell_phone`, `integration_id`
- Implement either:
  - Polling (every 30-60 seconds), OR
  - A manual refresh button
- Show appropriate loading states

### 2. Client Import/Update Form

Build a form with these fields:
- `first_name` (required)
- `last_name` (required)
- `email` (required)
- `cell_phone` (required)
- `integration_id` (required)
- `birth_date` (optional)

**On submit:**
- Validate inputs client-side
- Send PATCH request to `/clients` with this payload structure:
```json
{
  "firm_id": 1,
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "phone_numbers": ["..."],
  "integration_id": "...",
  "birth_date": "...",
  "integration_type": "CSV_IMPORT"
}
```

**Validation requirements:**
- All required fields must be non-empty
- Email must be valid format
- Phone must contain at least 10 digits
- Character limits (enforced by backend):
  - Names, email, integration_id: 128 chars
  - Phone: 32 chars
  - Birth date: 32 chars

### 3. Optimistic UI & State Management

**Critical requirements:**
- Show pending state while PATCH request is in flight (spinner/indicator)
- **Optimistically update** the local client list immediately on submit
- Reconcile with server response once it returns
- On error: **rollback** the optimistic update and show user-friendly error message
- Avoid full-list reload flashes - update state incrementally

**Suggested approach:**
- Generate temporary negative ID or UUID for new clients
- Replace temp client with server response on success
- Remove temp client and show error on failure

### 4. Error Handling

The backend returns structured errors:
```json
{
  "errors": [
    { "field": "email", "message": "must be at most 128 characters" }
  ]
}
```

**Your frontend should:**
- Display field-specific errors next to the relevant inputs
- Show general errors in a dismissable alert/toast
- Handle network errors gracefully
- Provide clear feedback for all error states

### 5. Code Quality

- Use TypeScript with proper types
- Create reusable components where appropriate
- Follow React best practices (hooks, composition)
- Keep components focused and testable
- Add comments for complex logic
- Handle edge cases (empty states, loading, errors)

---

## Stretch Goals (Optional)

Choose any that interest you if time permits:

- **Delete functionality** - Use the `DELETE /clients/<id>` endpoint
- **Client search/filter** - Add search box with debouncing
- **Better loading UX** - Skeleton loaders instead of spinners
- **Toast notifications** - For success/error feedback
- **Form improvements** - Phone number formatting, date picker
- **Frontend tests** - Unit tests for your components
- **Accessibility** - ARIA labels, keyboard navigation

---

## Non-Goals (Don't Spend Time On)

- ❌ Modifying Python backend code
- ❌ Writing backend tests
- ❌ Full authentication/authorization
- ❌ Complex UI styling (clarity over polish)
- ❌ Comprehensive phone number validation (backend handles this)

---

## Backend API Reference

### GET /clients

**Response:**
```json
{
  "clients": [
    {
      "id": 1,
      "firm_id": 1,
      "first_name": "Ada",
      "last_name": "Lovelace",
      "email": "ada@example.com",
      "cell_phone": "+15551234567",
      "integration_id": "ext-123",
      "birth_date": "1815-12-10",
      "ssn": null
    }
  ]
}
```

### PATCH /clients

**Request:**
```json
{
  "firm_id": 1,
  "field_names": {
    "first_name": "Ada",
    "last_name": "Lovelace",
    "email": "ada@example.com",
    "phone_numbers": ["+15551234567"],
    "integration_id": "ext-123",
    "birth_date": "1815-12-10"
  },
  "integration_type": "CSV_IMPORT"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "result": "Client created.",
  "client": { /* full client object */ }
}
```

**Error Response (400):**
```json
{
  "errors": [
    { "field": "email", "message": "must be at most 128 characters" }
  ]
}
```

### DELETE /clients/<id>

**Success Response (200):**
```json
{
  "status": "success",
  "result": "Client 1 deleted"
}
```

---

## Setup Instructions

### 1. Start the Backend
```zsh
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

Backend runs at `http://localhost:5000`

### 2. Start the Frontend
```zsh
# Navigate to frontend
cd case-status-interview-fe

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## Deliverables

Submit via pull request with:

1. **Your code changes** in the `case-status-interview-fe/` directory
2. **Brief notes** (in PR description or separate `NOTES.md`):
   - Architecture decisions you made
   - Trade-offs and why you chose them
   - What you'd improve with more time
   - Any assumptions you made

---

## Evaluation Criteria

| Area | Focus |
|------|-------|
| **Correctness** | Form submits successfully, clients display correctly, tests would pass |
| **Code Quality** | Clean component structure, TypeScript usage, naming, minimal duplication |
| **UX & State** | Smooth optimistic updates, clear loading states, graceful error handling |
| **Error Handling** | Field-specific errors, network failures, edge cases covered |
| **Modern React** | Proper hooks usage, component composition, state management |
| **Communication** | Clear explanation of decisions and trade-offs |

---

## Tips

- Start with the happy path, then add error handling
- Test optimistic UI by adding artificial delays: `await new Promise(r => setTimeout(r, 2000))`
- Use temporary negative IDs (e.g., `-Date.now()`) for optimistic client creation
- The backend already validates everything - focus on great UX
- Keep commits small and logical
- Document any backend quirks you discover

Good luck! We're excited to see your approach.
