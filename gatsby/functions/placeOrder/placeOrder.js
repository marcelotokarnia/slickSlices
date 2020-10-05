const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

const generateOrderEmail = ({ order, total }) => `<div>
    <h2>Your recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          ({ thumbnail, name, size, price }) => `<li>
          <img src="${thumbnail}" alt="${name}" />
          ${size} ${name} - ${price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'ERROR 2342',
      }),
    }
  }
  const requiredFields = ['email', 'name', 'order']
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Ooops! You are missing the ${field} field`,
        }),
      }
    }
  }
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing ?!`,
      }),
    }
  }
  await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  }
}
