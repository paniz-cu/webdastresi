async function Slider() {
    let slider: any[] = [];
    try {
        let data = await fetch("http://localhost:3001/slider");
        let res = await data.json();
        slider = res.map((item: any) => {
            return `
            <div class="swiper-slide w-full lg:h-[250px] sm:h-[430px] rounded-3xl overflow-hidden bg-cover z-10 bg-center"
                style="background-image: url('${item.image}');">
            </div>`;
        });
        document.querySelector(".swiper-wrapper")!.innerHTML = slider.join("");
        
    } catch (error: any) {
        console.log(error.message);
    }
}
export default Slider;

