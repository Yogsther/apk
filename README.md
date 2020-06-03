# APK (Alkohol per krona)

## [APK.YGSTR.COM](https://apk.ygstr.com)

Systembolagets sortiment sorterat efter APK
https://sv.wikipedia.org/wiki/Alkohol_per_krona

## Uppdatera sortimentet

1. Ladda ned en ny XML och byt ut xml.xml https://www.systembolaget.se/api/assortment/products/xml (OBS. Det kan ta flera minuter att ladda in hela XML filen genom en webläsare, och ibland dör sidan, så jag rekommenderar starkt att använda wget eller curl ```curl -o xml.xml https://www.systembolaget.se/api/assortment/products/xml```)

2. Installera beroenden
```npm i```

3. Uppdatera databasen `node parsexml.js` 
```Loaded XML: 7.491ms
Parsed XML: 2137.520ms
Creating database: 81.097ms
Saved database: 50.205ms
```

🍻 Klart!