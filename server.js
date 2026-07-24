const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const styles = `
<style>
@page { size: A4 landscape; margin: 0; }

:root {
  --navy: #08275c;
  --navy-deep: #051d45;
  --pink: #ee91ad;
  --pink-soft: #fff2f6;
  --gold: #c9953f;
  --gold-soft: #e8c98a;
  --paper: #fffdfa;
  --ink: #10284f;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  background: #edf2f7;
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
}

.form-box {
  width: min(900px, calc(100% - 32px));
  margin: 28px auto;
  padding: 28px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 12px 38px rgba(8, 39, 92, .13);
  border: 1px solid rgba(8, 39, 92, .08);
}

.form-box h2 {
  margin: 0 0 8px;
  color: var(--navy);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
}

.form-box p {
  margin: 0 0 22px;
  color: #5f6878;
}

.form-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

input,
select {
  min-width: 220px;
  flex: 1 1 260px;
  padding: 13px 15px;
  border-radius: 10px;
  border: 1px solid #ccd3dd;
  font-size: 16px;
  outline: none;
}

input:focus,
select:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(201, 149, 63, .14);
}

button {
  padding: 13px 25px;
  background: var(--navy);
  color: #fff;
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

button:hover { background: var(--navy-deep); }

.print-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 18px;
}

.certificate {
  width: 1123px;
  height: 794px;
  margin: 20px auto;
  padding: 18px;
  background: linear-gradient(145deg, var(--navy-deep), var(--navy));
  box-shadow: 0 18px 55px rgba(5, 29, 69, .24);
}

.paper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 45%, rgba(238,145,173,.08), transparent 38%),
    repeating-radial-gradient(ellipse at center, rgba(201,149,63,.035) 0 1px, transparent 1px 10px),
    var(--paper);
  border: 2px solid var(--gold);
}

.paper::before,
.paper::after {
  content: "";
  position: absolute;
  inset: 12px;
  pointer-events: none;
}

.paper::before {
  border: 1px solid var(--gold-soft);
}

.paper::after {
  inset: 23px;
  border: 1px dotted rgba(201,149,63,.82);
}

.corner {
  position: absolute;
  width: 86px;
  height: 86px;
  z-index: 3;
}

.corner::before,
.corner::after {
  content: "";
  position: absolute;
  background: var(--gold);
}

.corner::before { width: 62px; height: 2px; }
.corner::after { width: 2px; height: 62px; }
.corner.tl { top: 22px; left: 22px; }
.corner.tr { top: 22px; right: 22px; transform: scaleX(-1); }
.corner.bl { bottom: 22px; left: 22px; transform: scaleY(-1); }
.corner.br { bottom: 22px; right: 22px; transform: scale(-1); }
.corner::before { top: 18px; left: 0; }
.corner::after { top: 0; left: 18px; }

.corner-flower {
  position: absolute;
  left: 12px;
  top: 12px;
  color: var(--pink);
  font-size: 25px;
  line-height: 1;
}

.watermark {
  position: absolute;
  left: 50%;
  top: 51%;
  width: 490px;
  transform: translate(-50%, -50%);
  opacity: .025;
  filter: grayscale(1);
  pointer-events: none;
}

.logo {
  position: relative;
  z-index: 4;
  text-align: center;
  padding-top: 34px;
}

.logo img {
  width: 270px;
  height: 104px;
  object-fit: contain;
}

.title {
  position: relative;
  z-index: 4;
  margin-top: 5px;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 64px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--navy);
  text-transform: uppercase;
}

.title .pink { color: var(--pink); }

.title-divider {
  position: relative;
  z-index: 4;
  width: 430px;
  height: 28px;
  margin: 13px auto 4px;
}

.title-divider::before,
.title-divider::after {
  content: "";
  position: absolute;
  top: 13px;
  width: 185px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold));
}

.title-divider::before { left: 0; }
.title-divider::after { right: 0; transform: scaleX(-1); }

.divider-gem {
  position: absolute;
  left: 50%;
  top: 3px;
  transform: translateX(-50%) rotate(45deg);
  width: 19px;
  height: 19px;
  border: 2px solid var(--pink);
  background: var(--pink-soft);
}

.side-flower {
  position: absolute;
  top: 205px;
  z-index: 4;
  color: var(--pink);
  font-size: 58px;
}
.side-flower.left { left: 122px; }
.side-flower.right { right: 122px; }

.presented {
  position: relative;
  z-index: 4;
  margin-top: 4px;
  text-align: center;
  color: #4a5870;
  font-size: 22px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
}

.name {
  position: relative;
  z-index: 4;
  width: 540px;
  min-height: 68px;
  margin: 9px auto 0;
  padding: 0 18px 10px;
  border-bottom: 1.5px solid var(--gold);
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 52px;
  line-height: 1.05;
  color: var(--navy);
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.message {
  position: relative;
  z-index: 4;
  margin-top: 17px;
  text-align: center;
  font-family: "Segoe Script", "Brush Script MT", cursive;
  font-size: 44px;
  line-height: 1.1;
  color: var(--navy);
}

.message-heart {
  color: var(--pink);
  font-family: Georgia, serif;
  font-size: 50px;
  vertical-align: -3px;
}

.message-line {
  position: relative;
  z-index: 4;
  width: 600px;
  margin: 8px auto 0;
  border-bottom: 2px dotted rgba(238,145,173,.5);
}

.date {
  position: relative;
  z-index: 4;
  margin-top: 20px;
  text-align: center;
  color: var(--navy);
  font-size: 25px;
  font-weight: 700;
}

.date-line {
  display: inline-block;
  min-width: 190px;
  margin-left: 12px;
  padding: 0 12px 5px;
  border-bottom: 1.5px solid var(--gold);
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
}

.ribbon {
  position: relative;
  z-index: 4;
  width: 560px;
  height: 62px;
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #fff7fa, #f9dce5);
  border: 1px solid #efb7c8;
  box-shadow: 0 5px 12px rgba(238,145,173,.13);
  color: #db7192;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 29px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.ribbon::before,
.ribbon::after {
  content: "";
  position: absolute;
  top: 15px;
  width: 53px;
  height: 43px;
  background: #f8d6e1;
  border: 1px solid #efb7c8;
  z-index: -1;
}
.ribbon::before { left: -38px; transform: skewY(8deg); }
.ribbon::after { right: -38px; transform: skewY(-8deg); }

.badge {
  position: absolute;
  z-index: 4;
  bottom: 66px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #fff;
  border: 2px solid var(--navy);
  box-shadow: 0 0 0 6px #fff, 0 0 0 8px var(--gold);
}
.badge.left { left: 88px; }
.badge.right { right: 88px; }

.badge-inner {
  width: 103px;
  height: 103px;
  border-radius: 50%;
  border: 2px dotted var(--gold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--navy);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 13px;
  line-height: 1.25;
  text-transform: uppercase;
}

.badge-icon {
  display: block;
  margin-bottom: 4px;
  color: var(--pink);
  font-size: 33px;
  line-height: 1;
}

.footer {
  position: absolute;
  z-index: 4;
  left: 0;
  right: 0;
  bottom: 36px;
  text-align: center;
  color: var(--navy);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
}

.footer-ornament {
  margin-top: 8px;
  color: var(--gold);
  letter-spacing: 7px;
  font-size: 18px;
}

@media (max-width: 1160px) {
  .certificate {
    transform-origin: top left;
  }
}

@media print {
  html, body {
    width: 297mm;
    height: 210mm;
    background: #fff;
  }

  .form-box,
  .print-bar { display: none !important; }

  .certificate {
    width: 297mm;
    height: 210mm;
    margin: 0;
    padding: 4.7mm;
    box-shadow: none;
    page-break-inside: avoid;
    page-break-after: avoid;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
`;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minar Certificate Generator</title>
  ${styles}
</head>
<body>
  <div class="form-box">
    <h2>Minar Jewellers Certificate Generator</h2>
    <p>Enter the customer's name and piercing date to create a print-ready A4 landscape certificate.</p>
    <form method="POST" action="/generate">
      <div class="form-row">
        <input name="customerName" placeholder="Customer Name" maxlength="45" required>
        <select name="piercingType" required>
          <option value="" selected disabled>Select Certificate Type</option>
          <option value="ear">Ear Piercing Certificate</option>
          <option value="nose">Nose Piercing Certificate</option>
        </select>
        <input type="date" name="date" required>
        <button type="submit">Generate Certificate</button>
      </div>
    </form>
  </div>
</body>
</html>
  `);
});

app.post("/generate", (req, res) => {
  const name = escapeHtml(req.body.customerName);
  const rawDate = req.body.date;
  const piercingType = req.body.piercingType === "nose" ? "nose" : "ear";

  const certificateText = piercingType === "nose"
    ? {
        message: "I just got my nose pierced!",
        footer: "Nose piercing is a celebration of you!",
        badge: "My special<br>nose piercing<br>day",
        aria: "Minar Jewellers Nose Piercing Certificate of Pride"
      }
    : {
        message: "I just got my ears pierced!",
        footer: "Ear piercing is a celebration of you!",
        badge: "My special<br>ear piercing<br>day",
        aria: "Minar Jewellers Ear Piercing Certificate of Pride"
      };

  const dateParts = String(rawDate || "").split("-");
  const formattedDate = dateParts.length === 3
    ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
    : "";

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate of Pride</title>
  ${styles}
</head>
<body>
  <div class="print-bar">
    <button type="button" onclick="window.print()">Print Certificate</button>
    <button type="button" onclick="window.location.href='/'">Create Another</button>
  </div>

  <main class="certificate">
    <section class="paper" aria-label="${certificateText.aria}">
      <div class="corner tl"><span class="corner-flower">♥</span></div>
      <div class="corner tr"><span class="corner-flower">♥</span></div>
      <div class="corner bl"><span class="corner-flower">♥</span></div>
      <div class="corner br"><span class="corner-flower">♥</span></div>

      <img class="watermark" src="/logo.png" alt="">

      <div class="side-flower left">✿</div>
      <div class="side-flower right">✿</div>

      <div class="logo">
        <img src="/logo.png" alt="Minar Jewellers">
      </div>

      <div class="title">Certificate of <span class="pink">Pride</span></div>

      <div class="title-divider"><span class="divider-gem"></span></div>

      <div class="presented">Presented to</div>
      <div class="name">${name}</div>

      <div class="message">${certificateText.message} <span class="message-heart">♡</span></div>
      <div class="message-line"></div>

      <div class="date">DATE:<span class="date-line">${formattedDate}</span></div>

      <div class="ribbon">✦&nbsp; You Look Gorgeous &nbsp;✦</div>

      <div class="badge left">
        <div class="badge-inner">
          <span class="badge-icon">♛</span>
          A moment<br>to treasure<br>forever
        </div>
      </div>

      <div class="badge right">
        <div class="badge-inner">
          <span class="badge-icon">♡</span>
          ${certificateText.badge}
        </div>
      </div>

      <div class="footer">
        ${certificateText.footer}
        <div class="footer-ornament">— ✦ ♥ ✦ —</div>
      </div>
    </section>
  </main>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
