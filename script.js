const clientId = "9901a837d97a4f758cdf064a80a9f9e8"
const clientSecret = "d58128189d8742709054d0865ad2c62c"

async function pobierzTokenMusicBrainz(){

}

async function pobierzTokenSpotify(){
  const url = "https://accounts.spotify.com/api/token";

  const odpowiedz = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
    },
    body: new URLSearchParams({
      grant_type: "client_credentials"
    })
  });

  if (!odpowiedz.ok) {
    const blad = await odpowiedz.text();
    throw new Error(`Błąd logowania Spotify (${odpowiedz.status}): ${blad}`);
  }

  const dane = await odpowiedz.json();
  return dane.access_token;
}

async function pobierzTop50(token){
  const headers = { "Authorization": "Bearer " + token };
  
  const zapytania = [
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10&offset=0&market=US",
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10&offset=10&market=US",
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10&offset=20&market=US",
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10&offset=30&market=US",
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=10&offset=40&market=US",
  ];

  const obietnice = [];
  for (let i = 0; i < zapytania.length; i++) {
    obietnice.push(fetch(zapytania[i], { headers: headers }));
  }
  const odpowiedzi = await Promise.all(obietnice);

  const dane = [];
  for (let i = 0; i < odpowiedzi.length; i++) {
    if (!odpowiedzi[i].ok) {
      throw new Error("Blad API Spotify zapytanie " + (i+1) + " (" + odpowiedzi[i].status + ")")
    }
    const json = await odpowiedzi[i].json();
    dane.push(json);
  }

  const wszystkiePiosenki = [];
  for (let i = 0; i < dane.length; i++) {
    const piosenkiZListy = dane[i].tracks.items;
    
    for (let j = 0; j < piosenkiZListy.length; j++) {
      wszystkiePiosenki.push({track: piosenkiZListy[j]});
    }
  }
  return wszystkiePiosenki;
}

async function pobierzTop5(token) {
  const headers = { "Authorization": "Bearer " + token };
  
  const zapytania = [
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=5&market=US",
    "https://api.spotify.com/v1/search?q=genre:pop&type=track&limit=5&market=PL",
  ];

  const obietnice = [];
  for (let i = 0; i < zapytania.length; i++) {
    obietnice.push(fetch(zapytania[i], { headers: headers }));
  }
  const odpowiedzi = await Promise.all(obietnice);

  const dane = [];
  for (let i = 0; i < odpowiedzi.length; i++) {
    if (!odpowiedzi[i].ok) {
      const blad = await odpowiedzi[i].text();
      throw new Error("Blad API Spotify zapytanie " + (i+1) + " (" + odpowiedzi[i].status + ")")
    }
    const json = await odpowiedzi[i].json();
    dane.push(json);
  }

  const wszystkiePiosenki = [];
  for (let i = 0; i < dane.length; i++) {
    const piosenkiZListy = dane[i].tracks.items;
    
    for (let j = 0; j < piosenkiZListy.length; j++) {
      wszystkiePiosenki.push({track: piosenkiZListy[j]});
    }
  }
  return wszystkiePiosenki;
}

const body = document.querySelector('body')

function SzkieletAplikacji() {
  const stronaGlowna = document.createElement("div");
  stronaGlowna.id = "StronaGlowna";
  stronaGlowna.className = "glowna";

  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";

  const logo = document.createElement("div");
  logo.id = "Logo";
  logo.textContent = "Tutaj miejsce na logo";
  sidebar.append(logo);

  const kontenerMenu = document.createElement("div");
  kontenerMenu.id = "kontener";

  const menu = document.createElement("div");
  menu.id = "menu";

  const Kafelki = [
    { id: "KafelekWyszukaj", tekst: "Wyszukaj", cel: "Wyszukaj" },
    { id: "KafelekRanking", tekst: "Ranking", cel: "GlownyRankingSwiat" },
    { id: "KafelekNowosci", tekst: "Nowosci", cel: "Nowosci" },
    { id: "KafelekUlubione", tekst: "Ulubione", cel: "Ulubione" }
  ];

  Kafelki.forEach(k => {
    const kafelek = document.createElement("div");
    kafelek.id = k.id;
    kafelek.className = "klasa";
    kafelek.textContent = k.tekst;
    kafelek.addEventListener("click", () => przełączWidok(k.cel));
    menu.append(kafelek);
  });

  kontenerMenu.append(menu);
  sidebar.append(kontenerMenu);
  stronaGlowna.append(sidebar);

  const glownaTresc = document.createElement("div");
  glownaTresc.className = "glowna-tresc";
  glownaTresc.id = "obszar-roboczy";
  stronaGlowna.append(glownaTresc);

  body.append(stronaGlowna);
}

function przełączWidok(idWidoku) {
  const obszar = document.getElementById("obszar-roboczy");
  obszar.textContent = "";

  if (idWidoku === "Ranking") Ranking(obszar);
  else if (idWidoku === "GlownyRankingSwiat") Top50(obszar);
  else if (idWidoku === "Wyszukaj") Wyszukaj(obszar);
  else if (idWidoku === "Nowosci") Nowosci(obszar);
  else if (idWidoku === "Ulubione") Ulubione(obszar);
}

function PrzyciskPowrotu() {
  const kontener = document.createElement("div");
  kontener.className = "kontener-powrotu";
  
  const przycisk = document.createElement("button");
  przycisk.className = "przycisk-powrot";
  przycisk.textContent = "Wróć";
  przycisk.addEventListener("click", () => przełączWidok("Ranking"));
  
  kontener.append(przycisk);
  return kontener;
}

function SzkieletTabeli() {
  const tabela = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  ["Pozycja", "Okładka", "Tytuł", "Artysta"].forEach(naglowek => {
    const th = document.createElement("th");
    th.textContent = naglowek;
    tr.append(th);
  });

  thead.append(tr);
  tabela.append(thead);

  const tbody = document.createElement("tbody");
  tabela.append(tbody);

  return { tabela, tbody };
}

function Wiersz(tbody, i, zdjecie, tytul, tworca) {
  const tr = document.createElement("tr");

  const tdPozycja = document.createElement("td");
  tdPozycja.textContent = i;

  const tdOkladka = document.createElement("td");
  const img = document.createElement("img");
  img.src = zdjecie;
  img.alt = tytul;
  tdOkladka.append(img);

  const tdTytul = document.createElement("td");
  tdTytul.textContent = tytul;

  const tdArtysta = document.createElement("td");
  tdArtysta.textContent = tworca;

  tr.append(tdPozycja, tdOkladka, tdTytul, tdArtysta);
  tbody.append(tr);
}

function KafelekUtworu(kontener, zdjecie, tytul, tworca) {
  const kafelek = document.createElement("div");
  kafelek.className = "kafelek-utworu";

  const img = document.createElement("img");
  img.src = zdjecie;
  img.alt = tytul;

  const h4 = document.createElement("h4");
  h4.textContent = tytul;

  const p = document.createElement("p");
  p.textContent = tworca;

  kafelek.append(img, h4, p);
  kontener.append(kafelek);
}

async function Ranking(rodzic) {
  const widok = document.createElement("div");
  widok.id = "Ranking";
  widok.className = "widok";
  p = document.createElement("p");
  rodzic.append(p)
  try {
    const token = await pobierzTokenSpotify();
    const utwory = await pobierzTop5(token);
    const kontenerTabele = document.createElement("div");
    kontenerTabele.className = "rankingi-kontener";

    const sekcjaSwiat = document.createElement("div");
    sekcjaSwiat.id = "RankingSwiat";
    const h2Swiat = document.createElement("h2");
    h2Swiat.textContent = "Ranking TOP 5 Piosenek worldwide";
    const tabelaSwiat = SzkieletTabeli();
    sekcjaSwiat.append(h2Swiat, tabelaSwiat.tabela);

    const sekcjaPolska = document.createElement("div");
    sekcjaPolska.id = "RankingPolska";
    const h2Polska = document.createElement("h2");
    h2Polska.textContent = "Ranking TOP 5 Piosenek w Polsce";
    const tabelaPolska = SzkieletTabeli();
    sekcjaPolska.append(h2Polska, tabelaPolska.tabela);

    kontenerTabele.append(sekcjaSwiat, sekcjaPolska);
    widok.append(kontenerTabele);
    rodzic.append(widok);

    for(let i=0;i<5;i++){
      const pozycja = i + 1;

      const zdjecie = utwory[i].track.album.images.length > 0
        ? utwory[i].track.album.images[1].url   
        : "https://placehold.co/50x50?text=?";

      const tytul = utwory[i].track.name;
      const tworcy = utwory[i].track.artists.map(a => a.name).join(", ");

      Wiersz(tabelaSwiat.tbody, pozycja, zdjecie, tytul, tworcy);
    }
    for(let i=5;i<10;i++){
      const pozycja = i - 4;

      const zdjecie = utwory[i].track.album.images.length > 0
        ? utwory[i].track.album.images[1].url   
        : "https://placehold.co/50x50?text=?";

      const tytul = utwory[i].track.name;
      const tworcy = utwory[i].track.artists.map(a => a.name).join(", ");

      Wiersz(tabelaPolska.tbody, pozycja, zdjecie, tytul, tworcy);
    }
  } catch (error) {
    p.textContent = "Błąd pobierania danych z API: " + error.message;
    console.error(error);
  }
}

async function Top50(rodzic) {
  const widok = document.createElement("div");
  widok.id = "GlownyRankingSwiat";
  widok.className = "widok";

  const h2 = document.createElement("h2");
  h2.textContent = "Ranking TOP 50 Piosenek worldwide";

  const p = document.createElement("p");
  p.textContent = "Pobieranie danych ze Spotify";

  const tabelaStruktura = SzkieletTabeli();

  widok.append(h2, p, tabelaStruktura.tabela, PrzyciskPowrotu());
  rodzic.append(widok);

  try {
    const token = await pobierzTokenSpotify();
    const utwory = await pobierzTop50(token);

    utwory.forEach((piosenka, index) => {
      const pozycja = index + 1;

      const zdjecie = piosenka.track.album.images.length > 0
        ? piosenka.track.album.images[1].url   
        : "https://placehold.co/50x50?text=?";

      const tytul = piosenka.track.name;
      const tworcy = piosenka.track.artists.map(a => a.name).join(", ");

      Wiersz(tabelaStruktura.tbody, pozycja, zdjecie, tytul, tworcy);
    });

  } catch (error) {
    p.textContent = "Błąd pobierania danych z API: " + error.message;
    console.error(error);
  }
}

function Nowosci(rodzic) {
  const widok = document.createElement("div");
  widok.id = "Nowosci";
  widok.className = "widok";

  const h2 = document.createElement("h2");
  h2.textContent = "Gorące Nowości";

  const karuzela = document.createElement("div");
  karuzela.className = "nowosci-karuzela";

  widok.append(h2, karuzela, PrzyciskPowrotu());
  rodzic.append(widok);

  for (let i = 1; i < 11; i++) {
    KafelekUtworu(karuzela, "okladka" + ((i % 3) + 1) + ".jpg", "Babydoll", "Dominic Fike");
  }
}

function Ulubione(rodzic) {
  const widok = document.createElement("div");
  widok.id = "Ulubione";
  widok.className = "widok";

  const h2 = document.createElement("h2");
  h2.textContent = "Twoje Ulubione";

  const siatka = document.createElement("div");
  siatka.className = "ulubione-grid";

  widok.append(h2, siatka, PrzyciskPowrotu());
  rodzic.append(widok);

  for (let i = 1; i < 21; i++) {
    KafelekUtworu(siatka, "okladka" + ((i % 3) + 1) + ".jpg", "Tytul", "Tworca");
  }
}

function Wyszukaj(rodzic) {
  const widok = document.createElement("div");
  widok.id = "Wyszukaj";
  widok.className = "widok";

  const kontenerWyszukiwarki = document.createElement("div");
  kontenerWyszukiwarki.className = "wyszukiwarka-kontener";

  const h2 = document.createElement("h2");
  h2.textContent = "Co chcesz wyszukać?";

  const form = document.createElement("form");
  form.id = "formularz-wyszukiwania";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "szukanie";
  input.placeholder = "Wpisz nazwę artysty lub utworu...";
  input.autocomplete = "off";

  const przyciskSzukaj = document.createElement("button");
  przyciskSzukaj.type = "submit";
  przyciskSzukaj.id = "przycisk-szukaj";
  przyciskSzukaj.textContent = "Szukaj";

  form.append(input, przyciskSzukaj);

  const komunikatBledu = document.createElement("p");
  komunikatBledu.id = "komunikat-bledu";
  komunikatBledu.className = "blad-ukryty";
  komunikatBledu.textContent = "Musisz wpisać nazwę artysty!";

  form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (input.value.trim() === "") {
      komunikatBledu.className = "blad-widoczny"
    } else {
      komunikatBledu.className = "blad-ukryty"
      alert("Wyszukiwanie dla: " + input.value)
    }
  });

  kontenerWyszukiwarki.append(h2, form, komunikatBledu);

  const wynikiGrid = document.createElement("div");
  wynikiGrid.id = "wyniki-wyszukiwania";
  wynikiGrid.className = "wyniki-grid";

  widok.append(kontenerWyszukiwarki, wynikiGrid, PrzyciskPowrotu());
  rodzic.append(widok);
}

SzkieletAplikacji();
przełączWidok("Ranking");