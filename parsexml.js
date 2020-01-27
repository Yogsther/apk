const fs = require("file-system");
const parseString = require("xml2js").parseString;

console.time("Loaded XML");
var xml = fs.readFileSync("xml.xml");
console.timeEnd("Loaded XML");
console.time("Parsed XML");
parseString(xml, function(err, result) {
    console.timeEnd("Parsed XML");

    console.time("Creating database");
    var database = {};
    for (let item of result.artiklar.artikel) {
        let good = {
            nr: Number(item.nr[0]),
            id: Number(item.Artikelid[0]),
            varnr: Number(item.Varnummer[0]),
            name: item.Namn[0],
            price: Number(item.Prisinklmoms[0]),
            volume: Number(item.Volymiml[0]),
            liter_price: Number(item.PrisPerLiter[0]),
            type: item.Varugrupp[0],
            package: item.Forpackning[0],
            country: item.Ursprunglandnamn[0],
            alc: Number(
                item.Alkoholhalt[0].substr(0, item.Alkoholhalt[0].length - 1)
            )
        };

        good.apk = ((good.alc * good.volume) / good.price / 100).toFixed(2);

        if (!database[good.type]) database[good.type] = [];
        database[good.type].push(good);
    }

    for (var table in database) {
        database[table].sort((a, b) => {
            return b.apk - a.apk;
        });
    }

    console.timeEnd("Creating database");

    console.time("Saved database");

    fs.writeFileSync(
        "js/database.js",
        "const database = " + JSON.stringify(database)
    );

    console.timeEnd("Saved database");
    return;
});
