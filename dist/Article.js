async function Article() {
    try {
        let response = await fetch("http://localhost:3001/article");
        let res = await response.json();
        if (!Array.isArray(res)) {
            console.error("Invalid data format");
            return;
        }
        let sliderItems = res.map((item) => `<div class="slideA ">
                <img src="${item.image}" alt="${item.title}">
                <div style="text-align: center; color: #444;  font-weight: 500; margin-top: 10px;" class="lg:text-[16px] sm: text-[12px] hover:text-blue-700">
                    ${item.title || ''}
                </div>
            </div>`).join("");
        let articleContainer = document.querySelector(".article");
        if (articleContainer) {
            articleContainer.innerHTML = sliderItems;
        }
        else {
            console.error("Error: Element with class '.article' not found.");
        }
        setupPagination();
    }
    catch (error) {
        console.error("Error fetching slider data:", error);
    }
}
function setupPagination() {
    const slider = document.querySelector(".article");
    if (!slider) {
        console.error("Error: Element with class '.article' not found.");
        return;
    }
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    const itemsPerPage = 4;
    const totalPages = Math.ceil(slider.children.length / itemsPerPage);
    if (totalPages <= 1) {
        const pagination = document.querySelector(".slider-pagination");
        if (pagination)
            pagination.style.display = "none";
        return;
    }
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            currentIndex = parseInt(dot.getAttribute("data-index") || "0");
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
        });
    });
}
export default Article;
