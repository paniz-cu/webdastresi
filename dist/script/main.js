import Menu from "./Menu";
import Slider from "./Slider";
import product from "./Product";
import Slider2 from "./Slider2";
import Goods from "./Goods";
import Stuff from "./Stuff";
import Barnds from "./Brands";
import Article from "./Article";
Menu();
Slider();
product();
Slider2();
Goods();
Stuff();
Barnds();
Article();
document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const burgerButton = document.getElementById("burgerButton");
    const closeMenu = document.getElementById("closeMenu");
    function openMenu() {
        menu.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
    }
    function closeMenuFunc() {
        menu.classList.add("translate-x-full");
        overlay.classList.add("hidden");
    }
    burgerButton.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeMenuFunc);
    overlay.addEventListener("click", closeMenuFunc);
});
setTimeout(() => {
    // test?.addEventListener("mouseenter",function(){
    //   jest?.classList.add("block");
    // });
    // test?.addEventListener("mouseleave",function(){
    //   jest?.classList.remove("block");
    // });
}, 2000);
function updateClock() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}
setInterval(updateClock, 1000);
updateClock();
