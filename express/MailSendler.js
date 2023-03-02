import nodemailer from "nodemailer"

export function sendMail(mail, file) {
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    auth: {
      user: "TestLoginD",
      pass: "q7hXew2!WMHDeZ_",
    },
  })

  transporter.sendMail({
    from: "TestLoginD@yandex.ru",
    to: mail,
    subject: "Message from Node js",
    attachments: [
      {
        filename: 'Договор.pdf',
        content: new Buffer(file, 'base64'),
        contentType: 'application/pdf'
      }]
  })
}
