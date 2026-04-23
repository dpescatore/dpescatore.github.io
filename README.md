# Personal Website

Sito personale statico di Daniele Pescatore, costruito in HTML, CSS e JavaScript vanilla.

La versione attualmente piu' completa del progetto e' `portfolio_site_anim.html`, con:

- hero animata con canvas
- sezione profilo e timeline professionale
- sezione servizi
- portfolio progetti
- certificazioni e abilitazioni
- sezione contatti con link esterni e social
- metadati SEO e structured data JSON-LD

## Struttura del progetto

```text
.
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   `-- main.js
`-- img/
    |-- me.jpeg
    `-- profile-placeholder.svg
```

## File principali

- `portfolio_site_anim.html`
  Pagina principale attualmente in uso. Contiene contenuti, sezioni, link esterni, portfolio e contatti.

- `css/style.css`
  Stili globali del sito: palette, layout, componenti, responsive, hero avatar e card.

- `js/main.js`
  Animazioni lato client:
  - particle canvas nella hero
  - background animato
  - typing animation del ruolo
  - count-up delle statistiche
  - reveal on scroll

- `img/`
  Asset immagini usati nella hero e nel sito.

## Come aprire il progetto

Essendo un sito statico, puoi aprire direttamente `portfolio_site_anim.html` nel browser.

Se preferisci usare un server locale, ad esempio con VS Code Live Server o un server statico equivalente, la pagina da servire e' sempre:

`portfolio_site_anim.html`

## Contenuti presenti

Il sito oggi presenta:

- profilo professionale come Software Engineer, Innovation Manager e docente IT
- esperienze su sistemi safety-critical, emergency management, WebGIS, AI integration e microservizi
- portfolio con progetti come:
  - Sistema Integrato 118 & Fleet Management
  - Sala Operativa Nazionale - Croce Rossa
  - SmartCity & WebGIS
  - ESEO / ESA
  - Smart Health 2.0
  - i-TRIER
- link a organizzazioni e realta' citate nel testo
- contatti email, DevDay, X e Instagram

## Personalizzazioni frequenti

I punti piu' comuni da modificare sono:

- testi e sezioni: `portfolio_site_anim.html`
- colori, layout, componenti: `css/style.css`
- animazioni e canvas: `js/main.js`
- foto profilo: `img/me.jpeg`

## Note operative

- La hero usa due canvas:
  - `#bg-canvas` per il fondo animato
  - `#hero-canvas` per le particelle nella sezione iniziale

- La foto profilo nella hero usa attualmente:
  - `img/me.jpeg`

- Le altre versioni HTML (`portfolio_site.html` e `portfolio_site_2.html`) sono bozze o varianti e non rappresentano necessariamente la versione principale del sito.

## Stack

- HTML5
- CSS3
- JavaScript vanilla
- Font via Bunny Fonts

## Stato del progetto

Progetto statico in evoluzione, orientato a una presentazione professionale personale con forte attenzione a:

- leggibilita'
- identita' professionale
- portfolio tecnico
- presenza online e SEO di base
