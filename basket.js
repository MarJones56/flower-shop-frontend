let basketCheck = localStorage.getItem("basket");
if (basketCheck == null) {
    let basketNav = document.getElementById("basketNav");
    basketNav.innerHTML = `<img src="Logos/basket0.png"></img>`
} else {
    let basketNav = document.getElementById("basketNav");
    basketNav.innerHTML = `<img src="Logos/basket1.png"></img>`
}