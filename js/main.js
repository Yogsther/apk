var extraCategories = [];
var pool = database["Öl"];
var lastSearch = "";

var buttons = {
    Öl: "🍺",
    Cider: "🥂",
    "Vodka och Brännvin": "🥃",
    "Rött vin": "🍷",
    "Vitt vin": "🥂",
    Likör: "🥃"
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

types.innerHTML += `<select onchange="changeType(this.value)" id="categories" class="type">
<option value="">Fler kategorier</option>
</select>`;

function changeType(type) {
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

for (var category of extraCategories) {
    document.getElementById(
        "categories"
    ).innerHTML += `<option value="${category}">${category}</option>`;
}

function loadEntries(search = "", from = 0) {
    var html = "";
    for (var i = from; i < pool.length && i < from + 10; i++) {
        let item = pool[i];
        html += `<div class="entry"> <span class="text">${item.name} </span>
        <span class="description"><b>${item.apk} APK</b>
       ${item.price}kr / ${item.alc}% / ${item.volume}ml</span>
        <a href="https://www.systembolaget.se/${item.nr}" target="_blank" class="sleve">

            <img src="img/systembolaget.png" class="store-link">
        </a>
        </div>`;
    }

    document.getElementById("entries").innerHTML = html;
}

loadEntries();
