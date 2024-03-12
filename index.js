const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");
const cron = require("node-cron");
const { connectDB } = require("./database/confiq");
const fetchemails= require('./utils/usermail')
const fetchselectedplace= require('./utils/selectedplaces')
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');


const API_KEY = process.env.WEATHER_API_KEY;
const password = process.env.USER_PASS;



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sudaisanuneelambra21@gmail.com',
        pass: password
    }
});


connectDB();

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());

const sendEmails = async (emails,weath) => {
    try {
            const weatherString = weath.map(weather => `${weather.place}: ${weather.description}, Temperature: ${weather.temp}°C`).join('\n');
            const mailOptions = {
                from: 'sudaisanuneelambra21@gmail.com',
                to: emails,
                subject: 'weather upadation',
                text: weatherString
            };
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');

    } catch (error) {
        console.error('Error sending email:', error);
    }
};



const task = cron.schedule('00 12 * * 1-6', async () =>  {
    const sin = await fetchemails()
    if(sin.length>0){
      const place =  await fetchselectedplace()
      if(place){
          const weath=[]
        for (let i = 0; i < place.length; i++) {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place[i].placename}&appid=${API_KEY}&units=metric`);
                const data = await response.json();
                weath.push({place:place[i].placename,description:data.weather[0].description,temp:data.main.temp})
            } catch (error) {
                console.error('Error fetching weather data:', error);
                return null;
            }
        }
        for(let i=0 ;i<sin.length;i++){
            sendEmails(sin[i].email,weath)
        }
      }

    }
    console.log('running a task day ecxept sunday at 5:50');
}, {
scheduled: false
});

task.start();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("listening on port", port);
});
