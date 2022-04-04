## IDWTGMEPTMS

Website built with react.js to send code snippets to your email as a file

Built for my School Computer Lab.

### Demo

<img src="https://i.imgur.com/z4MXtPJ.png">
<img src="https://i.imgur.com/Kc72qYU.gif">

## Get Started

- Create a new gmail account and enable less secure app access
- Create a new webhook on discord for logs
- Edit the `.env.sample` file
    - `SENDER` - the email ID of the account you created
    - `PASS` - password of the email ID you created
- Rename `.env.sample` to `.env`

Note: When deploying to a service such as railway/fly/heroku , you can set the variables in their respective dashboards (don't set the `PORT` variable as they are autmatically set by the service). Also comment out `Line 1` of `index.js`

- Install Dependencies and Build Static Files for Frontend
```sh
cd frontend
npm install
npm run build
```
- Copy the `build` folder from `frontend` to the `backend` folder
```sh
cd ..
cd backend
npm install
```
- You are now ready to run the server
```sh
npm start
```

