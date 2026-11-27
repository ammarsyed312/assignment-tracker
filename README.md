# Assignment Tracker

An INFR3120 web application for viewing, adding, editing, and deleting
coursework records. Each record has a title, course, due date, and status.

## Run locally

1. Run `npm.cmd ci` in PowerShell.
2. Create a `.env` file beside `app.js` and set `MONGODB_URI` to your
   MongoDB Atlas connection string. Allow your current IP in Atlas.
3. Run `npm.cmd start`.
4. Open [https://assignment-tracker-tetf.onrender.com/assignments]and select **View Assignments**.

## Sources

- The Express Generator structure and EJS partials follow the lecture slides
- The Mongoose model and controller follow the MongoDB lecture
  examples, `save()`, and `find()`.
- [Bootstrap 5.3](https://getbootstrap.com/) is installed through npm
  and credited in `views/partials/header.ejs`.
- Custom styles are in `public/stylesheets/style.css`.
