# 9 Point Capital Assessment

# Getting Started

1. Clone the Repository

```bash
git clone https://github.com/Man0jkumar3010/admin-panel.git
cd crypto-admin-panel
```

2. Install Dependencies

```bash
npm install
```

3. Run the development Server

```bash
npm run dev
```
navigate to http://localhost:3000


4. Approach :

I built this admin panel using Next.js, TypeScript, TailwindCSS, and Zustand, Shadcn, focusing on clean structure, performance, and scalability.

The application has two main pages — one for displaying the list of users with search, filters, sorting, and pagination, and another for showing detailed information about a particular id user. I used custom hooks to handle logic like pagination, filtering, and user detail fetching. Global state such as selected users, KYC updates, and suspend actions are managed through Zustand, which keeps the app state predictable and easy to maintain.

For the UI, I used Shadcn components combined with Tailwind to achieve a consistent and professional design. All data is loaded from mock JSON files, with simulated API delays to show realistic loading states and toasts for user feedback. Overall, the focus was on clean architecture, smooth interactions, and a scalable structure that can easily integrate with real APIs in the future.
