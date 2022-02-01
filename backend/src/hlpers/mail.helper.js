import nodemailer from 'nodemailer'

const send = async (mailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const info = await transporter.sendMail(mailInfo)

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export const emailProcessor = ({ email, otp }) => {
  const link = `${process.env.CLIENT_ROOT_URL}/email-verification?otp=${otp}&email=${email}`
  const mailObj = {
    from: `"EShop 👻" <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'User email verification ', // Subject line
    text: `HI there, Please follow the link to verify your email. ${link} `, // plain text body
    html: `
    Hello there,
<br />
<p>
Thank you for registering with us. Please follow the link below to verify your email
</p>
<p>
<a href="${link}">${link}</a>
</p>
<br/>

<p>Kind regards, <br/>
-- Some company Info --
</p>

    `, // html body
  }

  send(mailObj)
}

export const emailVerificationWelcome = (email) => {
  const mailObj = {
    from: `"EShop  " <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Welcome, your email has been verified ', // Subject line
    text: `HI there, Your email has been verified, you may sing in now!`, // plain text body
    html: `
    Hello there,
      <br />
      <p>
      Thank you for registering with us. Your email has been verified, you may sing in now
      </p>
      
      <br/>

      <p>Kind regards, <br/>
      -- Some company Info --
      </p>

    `, // html body
  }

  send(mailObj)
}

//update user on profile update
export const userProfileUpdateNotification = (email) => {
  const mailObj = {
    from: `"EShop  " <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'Profile updated', // Subject line
    text: `HI there, Your profile has just been updated, If you did not make this change, please contact us immediately`, // plain text body
    html: `
    Hello there,
      <br />
      <p>
   Your profile has just been updated, If you did not make this change, please contact us immediately,
      </p>
      
      <br/>

      <p>Kind regards, <br/>
      -- Some company Info --
      </p>

    `, // html body
  }

  send(mailObj)
}

//update user on profile update
export const passwordResetOTPNotification = ({ email, otp }) => {
  const mailObj = {
    from: `"EShop  " <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: 'OTP for password reset', // Subject line
    text: `HI there, use the otp ${otp} to reset the password. The token will expires in x amount`, // plain text body
    html: `
    Hello there,
      <br />
      <p>
      HI there, use the following otp  to reset the password. 
      </p>
      
      <p>${otp}</p>
      The token will expires in x amount,
      <br/>

      <p>Kind regards, <br/>
      -- Some company Info --
      </p>

    `, // html body
  }

  send(mailObj)
}
