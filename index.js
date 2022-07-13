require('dotenv').config()
const sgMail = require('@sendgrid/mail')
console.log(process.env.SENDGRID_API_KEY);
const setApiKey = () => sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = ({emailTo, data, emailFrom}) => {
  return new Promise(async (resolve, reject) => {
    try {
      setApiKey();
      const msg = {
        to: [emailTo],
        from: emailFrom, // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      const result = await sgMail.send(msg);
      resolve(result);
    } catch (_e) {
      console.log('Error in sendEmail: ', _e.response.body);
      reject(_e.response.body);
    }
  });
};

app.post('/send', (req, res) => {
  try {
    const { email, subject, content } = req.body;
    await sendMail(email, subject, content);
    res.json({ message: 'Message Sent' });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
  console.log(req.body);
});




/*const msg = {
  to: 'sheila.stegman@ttu.edu', // Change to your recipient
  from: 'sheila.stegman@ttu.edu', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })*/
