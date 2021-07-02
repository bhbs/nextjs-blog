import { NextApiRequest, NextApiResponse } from "next";
import { createTransport, SentMessageInfo } from "nodemailer";

type Verification = {
  success?: true | false;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

type UserData = {
  name: string;
  mail: string;
  word?: string;
};

type Info = {
  token: string;
  userData: {
    [id: string]: UserData;
  };
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const info: Info = JSON.parse(req.body);
  const token = info.token;

  if (!token) return res.status(403).json("不正なアクセス");

  const verification = await siteVerify(token);

  if (!verification.success) return res.status(403).json("トークンが不正です");

  const userData = info.userData;
  const wordPool = ["banana", "apple", "orange", "peach"];

  const userDataWithWords = giveWords(userData, wordPool);

  await sendMails(userDataWithWords);

  return res
    .status(200)
    .json("メールの送信が完了しました。ゲームを開始してください。");
};

const siteVerify = async (token: string): Promise<Verification> =>
  await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPCHA_SITEKEY_SECRET,
      response: token,
    }).toString(),
  }).then((response) => response.json());

const giveWords = (
  userData: { [id: string]: UserData },
  wordPool: string[]
) => {
  for (const [key, value] of Object.entries(userData)) {
    userData[key] = {
      ...value,
      word: getRandomWords(wordPool),
    };
  }
  return userData;
};

const getRandomWords = (wordPool: string[]) => {
  const wordNumber = wordPool.length;
  return wordPool[getRandomInt(wordNumber)];
};

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const sendMails = async (userData: {
  [id: string]: UserData;
}): Promise<SentMessageInfo> => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dancingbumpkin@gmail.com",
      pass: process.env.GMAIL_APPLICATION_PW,
    },
  });

  for (const [key, user] of Object.entries(userData)) {
    const othersData = { ...userData };
    delete othersData[key];

    await transporter.sendMail({
      from: '"GAME MASTER"<dancingbumpkin@gmail.com>',
      to: user.mail,
      subject: user.name,
      text: Object.values(othersData)
        .map((_user) => `${_user.name} - ${_user.word}`)
        .join("\n"),
    });
  }
};
