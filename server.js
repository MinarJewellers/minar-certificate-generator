const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

const styles = `
<style>
@page{
  size:A4 landscape;
  margin:0;
}

*{
  box-sizing:border-box;
}

body{
  margin:0;
  background:#edf2f7;
  font-family:Arial,sans-serif;
}

.form-box{
  max-width:850px;
  margin:25px auto;
  background:white;
  padding:25px;
  border-radius:16px;
  box-shadow:0 5px 20px rgba(0,0,0,.12);
}

.form-box h2{
  margin-top:0;
  color:#08275c;
}

input{
  padding:12px;
  width:250px;
  border-radius:8px;
  border:1px solid #ccc;
  font-size:16px;
  margin-right:10px;
}

button{
  padding:12px 24px;
  background:#08275c;
  color:white;
  border:none;
  border-radius:10px;
  font-size:16px;
  cursor:pointer;
  font-weight:bold;
}

.print-bar{
  text-align:center;
  margin:18px;
}

.certificate{
  width:1123px;
  height:794px;
  background:#08275c;
  margin:20px auto;
  padding:18px;
}

.paper{
  width:100%;
  height:100%;
  background:white;
  border-radius:38px;
  position:relative;
  overflow:hidden;
  box-shadow:0 8px 20px rgba(0,0,0,.16);
}

.logo{
  text-align:center;
  margin-top:28px;
}

.logo img{
  width:320px;
  max-height:90px;
  object-fit:contain;
}

.title{
  text-align:center;
  font-family:Georgia,serif;
  font-size:72px;
  line-height:0.92;
  font-weight:900;
  color:#08275c;
  letter-spacing:1px;
  margin-top:8px;
}

.title .pink{
  color:#f09ab0;
}

.presented{
  text-align:center;
  font-size:26px;
  color:#666;
  margin-top:20px;
}

.name{
  width:620px;
  margin:18px auto 0;
  border-bottom:2px solid #c9c9c9;
  text-align:center;
  font-size:52px;
  color:#08275c;
  padding-bottom:10px;
  font-family:Georgia,serif;
  min-height:65px;
}

.message{
  text-align:center;
  margin-top:28px;
  font-size:44px;
  color:#08275c;
  font-weight:600;
}

.date{
  text-align:center;
  margin-top:28px;
  font-size:34px;
  color:#08275c;
  font-weight:bold;
}

.date-line{
  display:inline-block;
  min-width:260px;
  border-bottom:2px solid #c9c9c9;
  padding-bottom:4px;
}

.gorgeous{
  text-align:center;
  margin-top:36px;
  font-size:44px;
  color:#f09ab0;
  font-weight:900;
  transform:rotate(-4deg);
}

.flower{
  position:absolute;
  font-size:58px;
  color:#f09ab0;
}

.flower.left{
  left:120px;
  top:170px;
}

.flower.right{
  right:120px;
  top:170px;
}

.teddy{
  position:absolute;
  left:85px;
  bottom:90px;
  font-size:110px;
}

.lolly{
  position:absolute;
  right:95px;
  top:340px;
  font-size:105px;
  transform:rotate(15deg);
}

.footer{
  position:absolute;
  left:0;
  right:0;
  bottom:32px;
  text-align:center;
  color:#08275c;
  font-size:24px;
}

@media print{

  body{
    background:white;
  }

  .form-box,
  .print-bar{
    display:none;
  }

  .certificate{
    margin:0;
    width:297mm;
    height:210mm;
    page-break-after:avoid;
    page-break-inside:avoid;
  }

}
</style>
`;

app.get("/", (req,res)=>{

res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Minar Certificate Generator</title>
${styles}
</head>

<body>

<div class="form-box">

<h2>Minar Jewellers Certificate Generator</h2>

<form method="POST" action="/generate">

<input
name="customerName"
placeholder="Customer Name"
required>

<input
type="date"
name="date"
required>

<button type="submit">
Generate Certificate
</button>

</form>

</div>

</body>
</html>
`);

});

app.post("/generate",(req,res)=>{

const name = req.body.customerName;

const rawDate = req.body.date;

const formattedDate = new Date(rawDate).toLocaleDateString("en-GB",{
day:"2-digit",
month:"2-digit",
year:"numeric"
});

res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Certificate Of Pride</title>
${styles}
</head>

<body>

<div class="print-bar">
<button onclick="window.print()">
Print Certificate
</button>
</div>

<div class="certificate">

<div class="paper">

<div class="flower left">✿</div>
<div class="flower right">✿</div>

<div class="logo">
<img src="/logo.png">
</div>

<div class="title">
<span class="pink">C</span>ertificate of <span class="pink">P</span>ride
</div>

<div class="presented">
Presented to:
</div>

<div class="name">
${name}
</div>

<div class="message">
I just got my ears pierced!
</div>

<div class="date">
DATE:
<span class="date-line">
${formattedDate}
</span>
</div>

<div class="gorgeous">
✦ You look gorgeous ✦
</div>


<div class="footer">
Ear piercing is a celebration of you!
</div>

</div>

</div>

</body>
</html>
`);

});

app.listen(PORT,()=>{
console.log("Server running on http://localhost:" + PORT);
});
