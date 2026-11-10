# Desire Journeys (React + Vite)
    npm install
    npm run dev      # local development
    npm run build    # production build in dist/

- Journeys, destinations and categories: `src/data.js` (swap for a CMS or API later)
- Booking flow: `src/Booking.jsx` (requests are emailed via a mailto link to `BOOKINGS_EMAIL`; replace the submit step with a form service or backend for automatic delivery)
- Photos and logo: `src/assets/`
- Hash-based routing (`#journey-gorilla`, `#book`) lives in `src/App.jsx`
