// async function Menu() { 
//     try {
//         let data = await fetch("http://localhost:3001/menu");
//         let res = await data.json();
//         let menuHTML = res.map((item: any) => {
//             if (item.dropdown.length > 0) {
//                 let dropdownHTML = item.dropdown.map((sub: any) => {
//                     return `<div class="brand-item">
//                         <a href="${sub.link}" class="block text-gray-700 hover:text-blue-700">${sub.name}</a>
//                     </div>`;
//                 }).join("");
//                 // **ویژه برای برندها**
//                 if (item.name === "برندها") {
//                     dropdownHTML = `
//                         <div class="brands-grid ">
//                             ${dropdownHTML}
//                         </div>
//                         <div class="view-more">
//                             <a href="/brands" class="text-red-500 font-semibold hover:text-red-700">مشاهده دیگر برندها</a>
//                         </div>`;
//                     return `<div class="relative  group hidden lg:inline-block md:hidden w-full ">
//                         <a class="hover:text-orange-600 text-gray-500  absolute right-[1250px] bottom-[16px] font-bold px-4 mr-96 hover:border-b-2 pb-2 transition-all duration-150 inline-block">
//                             ${item.name} <span class="text-[12px] absolute bottom-[10px] right-14">▼</span>
//                         </a>
//                         <div class="brands-menu">
//                             ${dropdownHTML}
//                         </div>
//                     </div>`;
//                 }
//                 // برای بقیه آیتم‌های با dropdown
//                 return `<div class="w-[242px] items-center justify-center relative max-w-full group cursor-pointer hover:body-gray hidden lg:inline-block md:hidden">
//                     <a class="hover:text-orange-600 items-center text-gray-500 font-bold justify-center px-2 mr-5 hover:border-b-2 pb-2 transition-all duration-150 lg:inline-block">
//                         ${item.name} <span class="text-[12px]">▼</span>
//                     </a>
//                     <div class="absolute hidden submenu z-50 shadow-2xl font-bold bg-white text-gray-500 mt-[0.75px] space-y-2 w-100 group-hover:block">
//                         ${dropdownHTML}
//                     </div>
//                 </div>`;
//             } else {
//                 return `<a href="${item.link}" class="hover:text-orange-600 text-gray-500 font-bold justify-center px-8 mr-14 hover:border-b-2 transition-all duration-150 lg:inline-block">
//                     ${item.name} <span class="text-[12px]">▼</span>
//                 </a>`;
//             }
//         }).join("");
//         let menuContainer = document.querySelector(".menu");
//         if (menuContainer) {
//             menuContainer.insertAdjacentHTML("beforeend", menuHTML);
//         } else {
//             console.warn("عنصر .menu پیدا نشد!");
//         }
//     } catch (error: any) {
//         console.log("خطا در دریافت منو:", error.message);
//     }
// }
// export default Menu();
async function Menu() {
    try {
        let data = await fetch("http://localhost:3001/menu");
        let res = await data.json();
        let specialProductsHTML = "";
        let menuHTML = res.map((item) => {
            // بررسی اینکه آیا نام این منو "برندها" است یا نه
            if (item.name === "برندها") {
                // ساخت داینامیک ستون‌های 5 تایی با 6 آیتم در هر ستون
                const itemsPerColumn = 6; // تعداد آیتم در هر ستون
                let columnsHTML = "";
                for (let i = 0; i < item.dropdown.length; i += itemsPerColumn) {
                    const columnItems = item.dropdown.slice(i, i + itemsPerColumn);
                    let itemsHTML = columnItems.map((sub) => `
                        <li>
                            <a href="${sub.link}" class="block px-2 py-1 hover:text-blue-700 hover:bg-gray-100 sm:hidden lg:block">
                                ${sub.name}
                            </a>
                        </li>
                    `).join("");
                    columnsHTML += `
                        <div>
                            <ul class="space-y-2 sm:hidden lg:block">
                                ${itemsHTML}
                            </ul>
                        </div>
                    `;
                }
                // ساختار HTML برای برندها
                specialProductsHTML += `
                  <div class="relative group sm: hidden lg:block">
                      <a href="#" class="absolute px-2 mr-[1200px] text-[13px] text-gray-500 font-bold hover:text-orange-600 hover:border-b-4 pb-4">
                          برندها <span class="text-[8px]">▼</span>
                      </a>
                      
                      <div class="absolute right-32 text-[13px]  hidden group-hover:grid grid-cols-5 gap-4 bg-white text-gray-600 w-[1250px] mt-[36px] shadow-lg p-4 z-5">
                          ${columnsHTML}
                      </div>
                      
                  </div>
                `;
                return ""; // جلوگیری از دوباره تکرار محصولات برند خاص
            }
            // برای سایر منوها
            if (item.dropdown.length > 0) {
                return `<div class="w-[183px] text-[13px] items-center sticky top-0 z-50 justify-center max-w-full group cursor-pointer hover:body-gray hidden lg:inline-block md:hidden sm:hidden">
                    <a class="hover:text-orange-600 items-center inline-flex text-gray-500 font-bold justify-center px-2 ml-0 py-0 hover:border-b-2 pb-5 transition-all duration-150 lg:inline-block ">
                        ${item.name} <span class="text-[8px] ">▼</span>
                    </a>
                    <div class="absolute hidden submenu shadow-2xl font-bold bg-white text-gray-500 mt-[0.75px] space-y-0 w-100 group-hover:block ${item.name === 'برندها' ? 'grid grid-cols-4 gap-4 max-w-7xl' : ''}">
                        ${item.dropdown.map((sub) => {
                    let subClass = item.name === "برندها" ? "bg-transparent hover:bg-gray-200" : "";
                    let subDropdown = "";
                    if (sub.dropdown && sub.dropdown.length > 0) {
                        subDropdown = `<div class="relative group">
                                    <a href="${sub.link}" class="block px-2 py-2 capitalize hover:text-blue-800 hover:bg-gray-100 ${subClass}">
                                        ${sub.name} <span class="text-[12px] absolute right-[350px]">▶</span>
                                    </a>
                                    <div class="absolute right-full top-0 hidden  nested-submenu bg-white text-gray-500 space-y-2 w-[380px] shadow-lg">
                                        ${sub.dropdown.map((subSub) => {
                            return `<a href="${subSub.link}" class="block px-4 py-2 capitalize hover:text-blue-700 hover:bg-gray-100">${subSub.name}</a>`;
                        }).join("")}
                                    </div>
                                </div>`;
                    }
                    else {
                        subDropdown = `<a href="${sub.link}" class="block px-4 sm:hidden lg:block py-2 capitalize hover:text-blue-700 hover:bg-gray-100 h-[40px] ${subClass}">${sub.name}</a>`;
                    }
                    return subDropdown;
                }).join("")}
                    </div>
                </div>`;
            }
            else {
                return `<a href="${item.link}" class="hover:text-orange-600   items-center text-[13px] text-gray-500 font-bold justify-center px-3 mr-10 hover:border-b-2 sm: hidden pb-5 transition-all duration-150 lg:inline-block">
                    ${item.name} <span class="text-[8px]">▼</span>
                </a>`;
            }
        }).join("");
        // افزودن HTML داینامیک برندها به منو
        menuHTML = specialProductsHTML + menuHTML;
        let menuContainer = document.querySelector(".menu");
        if (menuContainer) {
            menuContainer.insertAdjacentHTML("beforeend", menuHTML);
        }
        else {
            console.warn("عنصر .menu پیدا نشد!");
        }
    }
    catch (error) {
        console.log("خطا در دریافت منو:", error.message);
    }
}
export default Menu;
