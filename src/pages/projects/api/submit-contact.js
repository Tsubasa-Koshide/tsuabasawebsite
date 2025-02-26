import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // フォームデータを受け取る
  const data = JSON.parse(req.body);
  const { name, email, budget, deadline, yourChoice, message } = data;

  // nodemailer 設定
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "koshidetsubasa@gmail.com",
      pass: "Usagi0141",
    },
  });

  // サイトオーナーに送るメール
  const ownerMailOptions = {
    from: '"Website Contact" <yourgmail@gmail.com>',
    to: "koshidetsubasa@gmail.com",
    subject: `新規お問い合わせ: ${name}`,
    text: `
お名前: ${name}
メール: ${email}
ご予算: ${budget}
希望納期: ${deadline}
選択肢: ${yourChoice}
メッセージ:
${message}
    `,
  };

  // 送信者への自動返信メール
  const replyMailOptions = {
    from: '"Tsubasa Koshide" <yourgmail@gmail.com>',
    to: email,
    subject: "お問い合わせありがとうございます",
    text: `
${name} 様、

お問い合わせいただきありがとうございます。
追ってご連絡いたしますので、しばらくお待ちください。

--
Tsubasa Koshide
    `,
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(replyMailOptions);
    res.status(200).json({ message: "メール送信に成功しました" });
  } catch (error) {
    console.error("メール送信エラー:", error);
    res.status(500).json({ error: "メール送信に失敗しました" });
  }
}
