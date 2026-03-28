# Event Management API

## Project Overview

This API is used to manage events. You can create events, get all events, get a single event, update events, and delete events.

It is useful for applications that need event management like booking systems or scheduling apps. The API also includes validation, security, and proper documentation.

## Installation Instructions

### Prerequisites

- Node.js installed
- npm installed

### Step 1: Clone the project

```bash
git clone https://github.com/rrc-w2025-tsingh18/Assignment3_Backend.git
cd Assignment3_Backend

Step 2: Install dependencies
npm install

Step 3: Setup environment variables

Create a .env file and add:

PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"

Step 4: Run the server
npm run dev

-- API Request Examples
1. Get All Events

Request:

curl -X GET http://localhost:3000/api/v1/events

Response (200 OK):

{
  "message": "Events retrieved",
  "count": 1,
  "data": []
}
2. Create Event

Request:

curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Conference",
    "date": "2027-12-25T09:00:00.000Z",
    "capacity": 100
  }'

Response (201 Created):

{
  "message": "Event created",
  "data": {
    "id": "evt_00001",
    "name": "Tech Conference"
  }
}
3. Get Event By ID

Request:

curl -X GET http://localhost:3000/api/v1/events/evt_00001

Response (200 OK):

{
  "message": "Event retrieved",
  "data": {
    "id": "evt_00001"
  }
}

4. API Documentation

Full API documentation is available at:

https://rrc-w2025-tsingh18.github.io/Assignment3_Backend/
Local Documentation Access

When running locally, access Swagger UI at:

http://localhost:3000/api-docs