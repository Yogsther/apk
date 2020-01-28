var themes = {
    light: {
        dark: "#e7e7e7",
        darker: "#cccccc",
        text: "black",
        background: "rgb(247, 247, 247)"
    },
    dark: {
        dark: "#292929",
        darker: "#222",
        text: "white",
        background: "#1b1b1b"
    }
};

var darkmode = localStorage.getItem("darkmode");
if (darkmode) {
    setTheme(themes.dark);
}

function toggleTheme() {
    darkmode = !darkmode;
    localStorage.setItem("darkmode", darkmode);
    setTheme(darkmode ? themes.dark : themes.light);
}

function setTheme(theme) {
    let root = document.documentElement;
    root.style.setProperty("--dark", theme.dark);
    root.style.setProperty("--darker", theme.darker);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--background", theme.background);
}

var extraCategories = [];
var pool = database["Öl"];
var lastSearch = "";

database["Alla"] = [];
for (var key in database) {
    if (key != "Alla") {
        for (let item of database[key]) {
            database["Alla"].push(item);
        }
    }
}
database["Alla"].sort((a, b) => {
    return b.apk - a.apk;
});

var page = 0;
var resultsPerPage = 10;

var buttons = {
    Öl: "🍺",
    Cider: "🥂",
    "Vodka och Brännvin": "🥃",
    "Rött vin": "🍷",
    "Vitt vin": "🥂",
    Likör: "🥃",
    Alla: "🍻"
};

window.onload = () => {
    changeType("Öl");
};

var types = document.getElementById("types");
for (var button in buttons) {
    types.innerHTML += `<button class="type" onclick="changeType('${button}')">${
        button.split(" ")[0]
    }</button>`;
}

/* types.innerHTML += `<select onchange="changeType(this.value)" id="categories" class="type">
<option value="">Fler kategorier</option>
</select>`; */

function changeType(type) {
    page = 0;
    pool = database[type];
    if (buttons[type]) {
        document.getElementById("header").innerText = buttons[type];
        for (var el of document.getElementById("types").children) {
            if (el.innerText == type.split(" ")[0]) {
                el.classList.add("type-active");
            } else {
                el.classList.remove("type-active");
            }
        }
    }

    loadEntries();
}

for (var key in database) {
    if (Object.keys(buttons).indexOf(key) == -1) extraCategories.push(key);
}

/* for (var category of extraCategories) {
    document.getElementById(
        "categories"
    ).innerHTML += `<option value="${category}">${category}</option>`;
} */

function next() {
    page++;
    document.getElementById("back").disabled = false;

    loadEntries();
}

function back() {
    page--;
    if (page == 0) document.getElementById("back").disabled = true;
    document.getElementById("next").disabled = false;
    loadEntries();
}

var query = false;
function search(q) {
    query = q;
    document.getElementById("navigation").style.display = query
        ? "none"
        : "block";

    resultsPerPage = query ? 50 : 10;
    loadEntries();
}

function getColor(apk) {
    var score = apk * 110 - (database["Alla"][0].apk * 100 - 100);
    if (score < 0) score = 0;

    return `hsl(${score}, 91%, 62%)`;
}

function loadEntries() {
    var html = "";
    var start = resultsPerPage * page;
    var i = start;
    var added = 0;

    while (i < pool.length && added < resultsPerPage) {
        let item = pool[i];
        if (
            !query ||
            item.name.toLowerCase().indexOf(query.toLowerCase()) != -1
        ) {
            html += `<div class="entry"><div class="apk-label" style="background:${getColor(
                item.apk
            )};"></div> <span class="text">${item.name} </span>
        <span class="description"><b >${item.apk} APK</b>
       ${item.price}kr / ${item.alc}% / ${item.volume}ml</span>
        <a href="https://www.systembolaget.se/${
            item.nr
        }" target="_blank" class="sleve">

            <img src="img/systembolaget.png" class="store-link">
        </a>
		</div>`;
            added++;
        }
        i++;
    }

    document.getElementById("next").disabled =
        page * resultsPerPage > pool.length || added < resultsPerPage;

    document.getElementById("entries").innerHTML = html;
    document.getElementById("page").innerText =
        (page + 1).toString() +
        " / " +
        (added < resultsPerPage
            ? page + 1
            : query
            ? "?"
            : Math.ceil(pool.length / resultsPerPage));
}

loadEntries();
