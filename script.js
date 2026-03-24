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

kafelekRanking.addEventListener('click', () => {
  pokazWidok('Ranking');
});

kafelekWyszukaj.addEventListener('click', () => {
  pokazWidok('Wyszukaj');
});
const przyciskiPowrotu = document.querySelectorAll('.przycisk-powrot');

przyciskiPowrotu.forEach(przycisk => {
  
  przycisk.addEventListener('click', () => {
    pokazWidok('StronaGlowna'); 
  });
  
});