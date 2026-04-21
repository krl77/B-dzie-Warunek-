function pokazWidok(idWidokuDoPokazania) {
  const wszystkieWidoki = document.querySelectorAll('.widok');

  wszystkieWidoki.forEach(widok => {
    widok.classList.add('ukryty');
  });

  const widokDocelowy = document.getElementById(idWidokuDoPokazania);
  if (widokDocelowy) {
    widokDocelowy.classList.remove('ukryty');
  }
}

const kafelekRanking = document.getElementById('KafelekRanking');
const kafelekWyszukaj = document.getElementById('KafelekWyszukaj');
const kafelekNowosci = document.getElementById('KafelekNowosci');
const kafelekUlubione = document.getElementById('KafelekUlubione');

kafelekRanking.addEventListener('click', () => {
  pokazWidok('GlownyRankingSwiat');
});
kafelekNowosci.addEventListener('click', () => {
  pokazWidok('Nowosci');
});
kafelekUlubione.addEventListener('click', () => {
  pokazWidok('Ulubione');
});

kafelekWyszukaj.addEventListener('click', () => {
  pokazWidok('Wyszukaj');
});
const przyciskiPowrotu = document.querySelectorAll('.przycisk-powrot');

przyciskiPowrotu.forEach(przycisk => {
  
  przycisk.addEventListener('click', () => {
    pokazWidok('Ranking'); 
  });
  
});