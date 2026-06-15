# Top Tier Tracking 🎧

Nowoczesny i lekki panel muzyczny korzystający z oficjalnego API Spotify. Aplikacja została napisana od zera w czystym JavaScript (Vanilla JS), a cała struktura strony jest generowana dynamicznie w kodzie.

##  Główne funkcje

* **Rankingi:** Automatyczne pobieranie list TOP 50 i TOP 5 utworów ze świata i z Polski.
* **Wyszukiwarka:** Szybkie wyszukiwanie konkretnych artystów i piosenek w bazie Spotify.
* **Nowości:** Pobieranie najnowszych hitów (wykorzystuje autorskie obejście limitów API za pomocą podwójnych zapytań).
* **Ulubione:** Zapisywanie ulubionych piosenek bezpośrednio w pamięci przeglądarki (LocalStorage), dzięki czemu nie znikają po odświeżeniu strony.

##  Jak uruchomić projekt?

Aplikacja nie wymaga serwera. Działa bezpośrednio w przeglądarce!

1. Pobierz pliki na swój komputer.
2. Upewnij się, że w głównym folderze znajduje się Twoje logo pod nazwą `logo.png`.
3. Otwórz plik `index.html` w dowolnej przeglądarce internetowej.

##  Wykorzystane technologie

* **HTML5 & CSS3** (Flexbox, Grid, responsywny design)
* **JavaScript ES6+** (async/await, fetch API, dynamiczne renderowanie DOM)
* **LocalStorage API** (przechowywanie danych użytkownika)