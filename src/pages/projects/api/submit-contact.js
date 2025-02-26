// api/submit-contact.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  // POSTデータを取得（JSONの場合）
  let data;
  try {
    data = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).send("Invalid JSON");
  }

  const { name, email, budget, deadline, yourChoice, message } = data;

  // Nodemailer のトランスポーター設定（例: Gmail）
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "koshidetsubasa@gmail.com",         // ご自身の Gmail アカウント
      pass: "Usagi0141",             // アプリパスワード
    },
  });

  // サイトオーナーへ送るメール
  const ownerMailOptions = {
    from: '"Website Contact" <yourgmail@gmail.com>',
    to: "koshidetsubasa@gmail.com", // 受信先
    subject: `新しいお問い合わせ: ${name}`,
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
こちらから追ってご連絡いたしますので、しばらくお待ちください。

-- 
Tsubasa Koshide
TAK.STUDIO
https://takstudio.tokyo/
〒136-0072 東京都江東区大島6-26-7 大友ビル3F ARKE内 
6-26-7 Ohtomo-building 3F ARKE, Ohshima, Ko-to-ku, Tokyo, 136-0072 JAPAN
CELL +81 (0)80 5251 8548
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
};
