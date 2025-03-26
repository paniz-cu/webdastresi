async function Barnds() {
    try {
        let data = await fetch("http://localhost:3001/brands");
        let res = await data.json();
        // ✅ لیست اصلی را دو بار پشت سر هم قرار می‌دهیم
        let sliderItems = res.map((item) => `
            <div class="slideb slider-item  rounded-xl shadow-md p-10 "
                style="background-image: url('${item.image}');">
            </div>
            
        `);
        let sliderContent = [...sliderItems, ...sliderItems].join("");
        // مقداردهی به `.slider2`
        document.querySelector(".brands").innerHTML = sliderContent;
    }
    catch (error) {
        console.error("Error fetching slider data:", error.message);
    }
}
export default Barnds;
