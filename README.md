# Concordia Marketplace

## Overview
Concordia Marketplace is a campus-only buy & sell platform for  
Concordia University students and professors.  
Access is restricted to users with a verified @concordia.ca email, creating a trusted, closed community for buying and selling textbooks, electronics, furniture, tutoring services, and more.

---

## Features
- Concordia-only login (requires @concordia.ca email)
- Post new listings with title, description, price, and category
- Browse all listings in a responsive grid layout
- View your own posts through a dedicated My Listings page
- View seller profiles and all items posted by a specific user
- Fully clickable listing cards for smooth navigation
- Dynamic navigation that changes based on login state
- Modern Concordia-themed UI

---

## Project Structure
```plaintext
public/
├── images/

src/
│
├── assets/
│ └── concordiaLogo.png
│
├── components/
│ ├── Badge.jsx 
│ ├── ChatWindow.jsx
│ ├── Filters.jsx
│ └── ListingCard.jsx
│
├── data/
│ ├── listings.json
│ └── user.json
│
├── pages/
│ ├── Browse.jsx
│ ├── Chat.jsx
│ ├── Listing.jsx
│ ├── Login.jsx
│ ├── MyListings.jsx
│ ├── Post.jsx
│ └── SellerProfile.jsx
│
├── App.css
├── App.jsx
└── index.js
```
---

## Getting Started

Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/concordia-marketplace.git
cd concordia-marketplace

Install dependencies: npm install

Run the application: npm start

The app will be available at http://localhost:3000

