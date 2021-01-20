import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const info = req.query.mail ? await sendText(req.query) : false;
  res.status(200).json(info || { text: req.query || "mail & subject & text" });
};

const sendText = async (params: {
  [key: string]: string | string[];
}): Promise<nodemailer.SentMessageInfo> => {
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
    subject: JSON.stringify(params.subject),
    text: JSON.stringify(params.text),
  });
};
