import { NextApiRequest, NextApiResponse } from "next";
import * as nodemailer from "nodemailer";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const info = JSON.parse(req.body);

  info.token ? await sendText(info) : false;
  res.status(200).json(info || "😀");
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
    subject: "from api",
    text: JSON.stringify(params.text),
  });
};
