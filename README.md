# Desire Journeys (React + Vite)
    npm install
    npm run dev      # local development
    npm run build    # production build in dist/

- Journeys, destinations and categories: `src/data.js` (swap for a CMS or API later)
- Booking flow: `src/Booking.jsx` submits requests to the Vercel function in `api/bookings.js`, which delivers them through Resend to `mutadisi2@gmail.com`.
- Email setup: set `RESEND_API_KEY` and `BOOKING_FROM_EMAIL` in Vercel project environment variables. `BOOKING_FROM_EMAIL` must be a sender address verified in Resend. Run locally with `vercel dev` after setting these variables.
- Photos and logo: `src/assets/`
- Hash-based routing (`#journey-gorilla`, `#book`) lives in `src/App.jsx`
