# Mini E-commerce Platform

## Project Structure
- **Frontend**: React + MUI (in `/frontend`)
- **Backend**: Node.js + Express + MongoDB (in `/backend`)

## Setup Instructions

### Frontend
cd frontend
npm install
npm start


### Backend
cd backend
npm install
npm run dev


## To Simulate Payment Transaction
| Scenario                  | Test Card Number      |
| ------------------------- | --------------------- |
| ✅ Success               | `4242 4242 4242 4242` |
| ❌ Card Declined         | `4000 0000 0000 0002` |
| ⛔ Gateway Error         | `5000 0000 0000 0000` |


## Used Mailtrap.io to simulate confirmation emails
![Screenshot (375)](https://github.com/user-attachments/assets/20161d43-8035-462a-8b38-5673b9eb3474)


