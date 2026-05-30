# Projekt

## Beskrivning
Detta projekt är en webbapplikation byggd med Angular och TypeScript.
Applikationen presenterar kurser från Mittuniversitetets kurskatalog och låter användaren bygga ett eget ramschema.
Projektet kombinerar tidigare moment med Angular-komponenter, routing, services och localStorage.

## Grundkrav
- Webbplats byggd med Angular och TypeScript
- Minst två undersidor (Kurser och Ramschema)
- Komponenter och routing
- Två services: CourseService och ScheduleService
- Sökning och filtrering på kurskod, kursnamn och ämne
- Sortering på kurskod, kursnamn, poäng och ämne
- Antal kurser visas vid aktuell sökning
- Ramschema med localStorage — laddas in vid sidomladdning
- Inga dubletter i ramschemat
- Ta bort kurser från ramschemat
- Totala högskolepoäng visas i ramschemat
- Responsiv design för mobil och desktop

## Extra funktionalitet (överbetyg)
- Startsida för det fiktiva lärosätet Vertex Academy med hero-bild
- Navbar badge som visar antal kurser i ramschemat
- Sorteringspil i kolumnrubriker som visar riktning
- Knapp gråas ut och visar "✓ Tillagd" om kursen redan finns i ramschemat
- Signals och computed() för reaktiv filtrering utan sidomladdning

## Installation
```bash
git clone https://github.com/aliatwood/Typescript-projekt.git
cd Typescript-projekt
npm install
ng serve
```

## Publicerad webbplats
Webbplatsen publiceras automatiskt via **GitHub Pages**.  
[Länk till den publicerade webbplatsen](https://aliatwood.github.io/Typescript-projekt/hem)
