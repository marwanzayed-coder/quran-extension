let background = [
  "../images/photo-1431794062232-2a99a5431c6c.jpg",
  "../images/photo-1470813740244-df37b8c1edcb.jpg",
  "../images/photo-1416949929422-a1d9c8fe84af.jpg",
  "../images/photo-1621679613806-421680402771.jpg",
  "../images/photo-1460472749544-d2b2f1a2b202.jpg",
  "../images/photo-1421217802296-7a0b5e2abef2.jpg",
  "../images/photo-1584043204475-8cc101d6c77a.jpg",
];
let imges = Math.floor(Math.random() * background.length);
let body = document.getElementById("body");
body.style.cssText = `background-image: url(${background[imges]});`;
body.onload = startTime();
homePage();

function homePage() {
  fetch("../quran.json")
    .then((res) => res.json())
    .then((rep) => {
      let i = Math.floor(Math.random() * 114);
      let num = Math.floor(Math.random() * rep[i].total_verses);
      let ayah = document.getElementById("ayah");
      let ayahText = document.createTextNode(rep[i].verses[num].text);
      ayah.appendChild(ayahText);
      let ayahNum = document.createTextNode(
        ` \ufd3f${rep[i].verses[num].id.toLocaleString("AR-EG")}\ufd3e `
      );

      let ayahName = document.getElementById("ayah-name");
      let ayahNameText = document.createTextNode(
        `سورة ${rep[i].name} - عدد الايات ${rep[i].total_verses.toLocaleString(
          "AR-EG"
        )}`
      );
      ayahName.appendChild(ayahNameText);
      ayah.appendChild(ayahNum);
    });
}
function startTime() {
  let times = document.querySelector(".times");
  const today = new Date();
  let h = today.getHours();
  if (h < 10) {
    h = `0${today.getHours()}`;
  }

  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  setTimeout(startTime, 1000);
  times.innerHTML = tConvert(`${h}:${m}:${s}`);

  let month = document.querySelector(".month");
  let day = document.querySelector(".day");
  let year = document.querySelector(".year");
  const yyyy = today.getFullYear();
  const mm = today.getMonth();
  const dd = today.getDate();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month.innerHTML = monthName[mm];
  day.innerHTML = dd;
  year.innerHTML = yyyy;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((req) => {
      console.log("File Register");
    })
    .catch((err) => {
      console.log(err);
    });
}
