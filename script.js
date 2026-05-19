function pokazWidok(id){
  const Widoki = document.querySelectorAll(".widok")
  Widoki.forEach(widok => widok.classList.add("ukryty"))
  const widokDocelowy = document.getElementById(id)
  widokDocelowy.classList.remove("ukryty")
}

const Ranking = document.getElementById("KafelekRanking")
const Wyszukaj = document.getElementById("KafelekWyszukaj")
const Nowosci = document.getElementById("KafelekNowosci")
const Ulubione = document.getElementById("KafelekUlubione")

Ranking.addEventListener("click", () => pokazWidok("GlownyRankingSwiat"))
Nowosci.addEventListener("click", () => pokazWidok("Nowosci"))
Ulubione.addEventListener("click", () => pokazWidok("Ulubione"))
Wyszukaj.addEventListener("click", () => pokazWidok("Wyszukaj"))

const Powrot = document.querySelectorAll(".przycisk-powrot")

Powrot[0].addEventListener("click", () => pokazWidok("Ranking"))
Powrot[1].addEventListener("click", () => pokazWidok("Ranking"))
Powrot[2].addEventListener("click", () => pokazWidok("Ranking"))
Powrot[3].addEventListener("click", () => pokazWidok("Ranking"))

function segmentTop(klasa,i,zdjecie,tytul,tworca){
  const k = document.querySelector(klasa)
  const tr = document.createElement("tr")
  tr.append(document.createElement("td"))
  tr.lastChild.textContent = i
  tr.append(document.createElement("td"))
  tr.lastChild.append(document.createElement("img"))
  tr.lastChild.lastChild.setAttribute("src",zdjecie)
  tr.append(document.createElement("td"))
  tr.lastChild.textContent = tytul
  tr.append(document.createElement("td"))
  tr.lastChild.textContent = tworca
  k.append(tr)
}

function segmentNowosci(klasa,i,zdjecie,tytul,tworca){
  const k = document.querySelector(klasa)
  const div = document.createElement("div")
  div.classList.add("kafelek-utworu")
  div.append(document.createElement("img"))
  div.lastChild.setAttribute("src",zdjecie)
  div.append(document.createElement("h4"))
  div.lastChild.textContent = tytul
  div.append(document.createElement("p"))
  div.lastChild.textContent = tworca
  k.append(div)
}

for(let i=1;i<51;i++){
  segmentTop(".top50",i,"okladka"+((i%3)+1)+".jpg","Tatuazyk","Sentino")
}

for(let i=1;i<6;i++){
  segmentTop(".top5S",i,"okladka2.jpg","Risk it All","Bruno Mars")
}

for(let i=1;i<6;i++){
  segmentTop(".top5P",i,"okladka1.jpg","Babydoll","Dominic Fike")
}

for(let i=1;i<11;i++){
  segmentNowosci(".nowosci-karuzela",i,"okladka"+((i%3)+1)+".jpg","Babydoll","Dominic Fike")
}

for(let i=1;i<21;i++){
  segmentNowosci(".ulubione-grid",i,"okladka"+((i%3)+1)+".jpg","Tytul","Tworca")
}