# 🏡 StayVistaHub

**StayVistaHub** is a full-featured web application for booking and managing vacation rentals🌍✨.  

Travelers can **browse listings**, **make bookings**, and **leave reviews** 📝⭐. Hosts can **create and manage properties**, upload images 📸, and set pricing 💰. The platform is **secure, responsive, and user-friendly** for both guests and hosts.  

---

## 🚀 Features

- 🔑 **User Authentication:** Register, login, and logout securely  
- 🏠 **Listing Management:** Hosts can create, edit, and delete properties  
- 📅 **Booking System:** Users can reserve their favorite stays  
- ⭐ **Reviews & Ratings:** Share experiences and rate listings  
- 🔍 **Search & Filters:** Find listings by location, price, and amenities  
- ☁️ **Cloud Media Upload:** Upload property images via Cloudinary  
- 📱 **Responsive Design:** Works on both desktop and mobile  

---

## 💻 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, EJS templates  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** Passport.js  
- **Cloud Storage:** Cloudinary for image uploads  
- **Session Management:** connect-mongo  

---

## ⚡ Installation

 **Clone the repository**
```bash
git clone https://github.com/your-username/StayVistaHub.git
cd StayVistaHub
```

npm install

## Create a file .env add embed this details
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

## Project Structure

StayVistaHub/
│
├─ models/           # Mongoose models (Listings, Users, Reviews)
├─ routes/           # Express routes (auth, listings, reviews)
├─ controllers/      # Controller logic for routes
├─ views/            # EJS templates
├─ public/           # CSS, JS, images
├─ index.js          # App entry point
└─ README.md         # Project documentation

## Author 
Mubarak
