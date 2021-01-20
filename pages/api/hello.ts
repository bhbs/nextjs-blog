import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const info = req.query?.text ? await sendText(req.query.text) : false;
  res.status(200).json(info || { text: req.query || "Hello" });
};

const sendText = async (text): Promise<nodemailer.SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dancingbumpkin@gmail.com",
      pass: "whuemesyvgabhrrt",
    },
  });

  return await transporter.sendMail({
    from: '"mailmaster"<dancingbumpkin@gmail.com>',
    to: "dancingbumpkin@gmail.com",
    subject: "Hello ✔",
    text,
  });
};
