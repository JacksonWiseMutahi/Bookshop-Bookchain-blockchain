# 📚 Bookshop Management System with Blockchain  

A full-stack **bookshop management system** integrating a modern **frontend stack (Vite + TypeScript + React + shadcn-ui + Tailwind CSS)** with a **Python FastAPI backend, MySQL database, and Ethereum blockchain**.  

This system allows **customers** to browse and purchase books, and **admins** to manage inventory, users, and sales. All purchase transactions are recorded on the **Ethereum blockchain** for transparency and immutability.  

---

## 🚀 Features  

### 👤 User  
- User registration and login with **JWT authentication**  
- Browse books (search, filter, categories)  
- Add to cart and checkout in **Kenyan Shillings (KES)**  
- View order history with **blockchain transaction hash**  

### 🛠️ Admin  
- Role-Based Access Control (**RBAC**) for secure admin functions  
- Add, edit, or delete books from inventory  
- Manage users and view all sales records  
- Generate inventory and transaction reports  

### 🔗 Blockchain  
- Transactions recorded on **Ethereum blockchain** via **web3.py**  
- Immutable ledger ensures **trust, transparency, and auditability**  
- Each purchase generates a **unique blockchain hash** linked to the order  

---

## 🏗️ Tech Stack  

### 🔹 Frontend  
- **Vite** → Fast build tool for modern web apps  
- **TypeScript** → Adds static typing, making the app more reliable and bug-free  
- **React** → Core library for building the interactive frontend (catalog, dashboards)  
- **shadcn-ui** → Pre-built, customizable UI components for clean and consistent design (buttons, forms, modals)  
- **Tailwind CSS** → Utility-first CSS framework for rapid and responsive styling  

**Usage in System:**  
- **React + TypeScript** handle logic for browsing, ordering, and dashboard interactivity.  
- **shadcn-ui** provides ready-made UI for forms (login, signup), tables (books, users, transactions), and modals (edit book).  
- **Tailwind CSS** ensures the frontend is fully responsive across devices.  
- **Vite** enables fast dev server + optimized builds for production.  

### 🔹 Backend  
- **Python (FastAPI)** → REST APIs for authentication, orders, and blockchain integration  
- **web3.py** → Communicates with Ethereum smart contracts  
- **JWT + bcrypt** → Secure authentication and password management  

### 🔹 Database  
- **MySQL** → Stores users, books, orders, and links to blockchain transaction hashes  
- **SQLAlchemy ORM** + **Alembic migrations** → Structured data modeling and schema updates  

### 🔹 Blockchain  
- **Ethereum (Solidity Smart Contracts)** → Immutable transaction recording  
- **Consensus Algorithm:** Proof of Stake (PoS)  
- **Hashing Algorithm:** Keccak-256 (SHA-3 variant)  
- **Transaction Signing:** ECDSA with private keys  

---

## ⚙️ Architecture  

