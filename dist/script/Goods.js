async function Goods() {
    let goods = [];
    try {
        const response = await fetch("http://localhost:3001/goods");
        if (!response.ok)
            throw new Error("خطا در دریافت داده‌ها");
        const data = await response.json();
        goods = data.map((item) => `
            <div class="p-2 max-w-full ">
                <div class="bg-white sm: w-[200px] lg:w-[290px] p-5 rounded-2xl  cursor-pointer m-1">
                    <img src="${item.image}" class="lg:w-[240px] lg:h-85 sm: w-[150px] sm: h-[230px]  object-contain rounded-xl" />
                    <p class="text-gray-400 font-semibold text-[13px] ">${item.title || "نامشخص"}</p>
                    <p class="text-sm text-gray-700 text-[16px]">${item.description || "برند نامشخص"}</p>
                    
                    
                    <div class="flex justify-between items-center">
                    <span class="text-gray-400 line-through">${item.old_price}</span>
                        <span class="text-blue-600 font-bold text-[16px]">${item.new_price ? item.new_price.toLocaleString() : "0"} تومان</span>
                        
                    </div>
                </div>
            </div>
        `);
        const wrapper = document.querySelector(".sliderg");
        if (wrapper)
            wrapper.innerHTML = goods.join("");
    }
    catch (error) {
        console.error("خطا: ", error);
    }
}
export default Goods;
