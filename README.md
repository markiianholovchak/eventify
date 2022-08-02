# Eventify

## Project description

Eventify is a web application that allows the user to search through thousands of events, venues and attractions all over the world and save them.

![Main page](https://github.com/markiianholovchak/eventify/blob/media/main_page.png)

![Events, venues](https://github.com/markiianholovchak/eventify/blob/media/scroll.png)

### Data filtering

You can filter data by type, country, segment and genre

![Main page with filters](https://github.com/markiianholovchak/eventify/blob/media/filters.png)

### Learn more

By clicking learn more you can get additional information about event, venue or attraction

![Event information](https://github.com/markiianholovchak/eventify/blob/media/event.png)

![Attraction information](https://github.com/markiianholovchak/eventify/blob/media/venue.png)

### Saving events, venues, attractions

After creating an account or signing in, you can save the event, venue or attraction

![Saved items](https://github.com/markiianholovchak/eventify/blob/media/saved.png)

## Features

- Searching through real events, venues and attractions
- Filtering data from the API
- Proxy for fetching data from the API
- Authentication
- Saving items to user profile

## Technologies used

- [REACT](https://reactjs.org/)
- [React Router](https://www.npmjs.com/package/react-router-dom)
- [Axios](https://www.npmjs.com/package/axios)
- [TailwindCSS](https://tailwindcss.com/)
- [Node, Express](https://expressjs.com/)
- [MongoDB, Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) + [JWT](https://jwt.io/) for Authentication

## API

App uses Ticketmaster Discovery API: [Learn more](https://developer.ticketmaster.com/)

## Installation

To install and run the app:

1. Clone git repository: `git clone https://github.com/markiianholovchak/eventify.git`
2. Install nodemon and the packages:

```
npm install -g nodemon
cd frontend/
npm install
cd ..
cd backend /
npm install`
```

3. Example .env:

```
PORT=4000
APIKEY=YOUR_APIKEY
DB_URI= CONNECT DB URL
SECRET=eventify-app
```

4. Run the app:

```
cd frontend/
npm start
cd ..
cd backend /
nodemon server
```

## License

Eventify is [MIT-Licensed](https://github.com/markiianholovchak/eventify/blob/main/LICENSE.md)

## App is in development
