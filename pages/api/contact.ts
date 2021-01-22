import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";

type Verification = {
  success?: true | false;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type Info = {
  token?: string;
  title?: string;
  message?: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const info = JSON.parse(req.body);
  if (info.token) {
    const verification = await siteVerify(info.token);
    verification.success && (await sendText(info));
    res.status(200).json("YOU'VE SENT AN EMAIL.");
  } else {
    res.status(200).json("BOT?🤖");
  }
};

const siteVerify = async (token): Promise<Verification> =>
  await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPCHA_SITEKEY_SECRET,
      response: token,
    }).toString(),
  }).then((response) => response.json());

const sendText = async (info: Info): Promise<nodemailer.SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dancingbumpkin@gmail.com",
      pass: process.env.GMAIL_APPLICATION_PW,
    },
  });

  return await transporter.sendMail({
    from: '"dancingbumpkin"<dancingbumpkin@gmail.com>',
    to: "dancingbumpkin@gmail.com",
    subject: info.title,
    text: info.message,
  });
};
