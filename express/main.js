import express from "express"
import cors from "cors"
import { sendMail } from "./MailSendler.js"

const app = express()
const port = 3000
app.use(express.json());
app.use(cors());

app.post("/", function (request, response) {
  sendMail("TestLoginD@yandex.ru", "data:text/plain;base64,QmFzZTY0IG1lc3NhZ2U=")
  response.send(request.body)    // echo the result back
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
