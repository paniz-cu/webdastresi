async function product() {
  let productHTML = ""; // خروجی HTML اینجا ذخیره میشه

  try {
    let response = await fetch("http://localhost:3001/product");
    let products = await response.json();

    // ایجاد متغیری برای ذخیره دو محصول کنار هم
    let specialProductsHTML = ""; // اینجا محصولات برند Porodo و Philips قرار می‌گیرند

    // تولید HTML برای هر محصول
    productHTML = products.map((product: any) => {
      if (product.brand === "Porodo" || product.brand === "Philips") {
        specialProductsHTML += 
        `<div class="w-full lg:flex  flex-col lg:flex-row gap-10 hidden sm:hidden"> 
          <!-- آیتم اول -->
          <div class="bg-white p-18 rounded-2xl hover:shadow-2xl cursor-pointer w-full lg:w-[150%] ">
            <img src="${product.image}" alt="${product.name}" class="w-full sm: h-[100px] lg:h-[500px]  object-contain rounded-xl" />
            <h2 class="text-gray-700 font-semibold text-[18px] mt-2">${product.name}</h2>
            <p class="text-sm text-gray-500">${product.brand} - ${product.model}</p>
            <p class="text-red-500 font-bold">${product.discount.toLocaleString()} تومان تخفیف</p>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold text-lg">${product.price.toLocaleString()} تومان</span>
              <span class="text-gray-400 line-through">${product.oldPrice.toLocaleString()} تومان</span>
            </div>
          </div>
        </div>`;
        return ""; 
      }

      return (
        `<div class="bg-white sm: w-[480px] lg:w-[490px] p-4 lg:pr-52  rounded-2xl hover:shadow-2xl flex flex-col gap-5  sm:mb-4  cursor-pointer ">
          <div class="flex flex-col sm:flex-row-reverse gap-8 items-center ">
            <div class="lg:pl-12 ">
              <h2 class="text-gray-700 font-semibold sm: text-[12px] lg:text-[16px]">${product.name}</h2>
              <p class="text-sm text-gray-500">${product.brand} - ${product.model}</p>
              <p class="text-red-500 font-bold">${product.discount.toLocaleString()} تومان تخفیف</p>
              <div class="flex ">
                <span class="text-blue-600 font-bold text-lg">${product.price.toLocaleString()} تومان</span>
                <span class="text-gray-400 line-through">${product.oldPrice.toLocaleString()} تومان</span>
              </div>
            </div>
            <img src="${product.image}" alt="${product.name}" class=" lg:w-30 lg:h-22 sm: w-[140px] object-contain rounded-xl ml-10" />
          </div>
        </div>`
      );
    }).join("");


    // ترکیب محصولات خاص و بقیه محصولات
    let finalHTML = 
    `<div class="flex lg:flex-nowrap  sm: flex-wrap sm:mr-0 sm:ml-0  gap-5 justify-between items-center lg:mr-8 ">
      <div class="flex w-full gap-9 z-10 lg:flex-nowrap sm: flex-wrap">
        ${specialProductsHTML}
      </div>
      <div class="w-full flex flex-wrap gap-4  lg:mr-16 sm:px-10 md:px-20 lg:px-5">
        ${productHTML}
      </div>
    </div>`;

    document.getElementById("product-list")!.innerHTML = finalHTML;
  } catch (error: any) {
    console.log("خطا در دریافت محصولات:", error.message);
  }
}

// فراخوانی تابع برای نمایش محصولات
export default product;
