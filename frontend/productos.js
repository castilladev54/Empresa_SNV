const sideBar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");
const menuItemDropDown = document.querySelectorAll(".menu-item-dropdown");
const menusItemsStatic = document.querySelectorAll(".menu-item-static");

menusItemsStatic.forEach((menuItem) => {
  menuItem.addEventListener("mouseenter", () => {
    if (!sideBar.classList.contains("minimize")) return;

    menusItemsStatic.forEach((item) => {
      const otherSubmenu = item.querySelector(".sub-menu");
      if (otherSubmenu) {
        item.classList.remove("sub-menu-toggle");
        otherSubmenu.style.height = "0";
        otherSubmenu.style.padding = "0";
      }
    });
  });
});

menuItemDropDown.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    const subMenu = menuItem.querySelector(".sub-menu");
    const isActive = menuItem.classList.toggle("sub-menu-toggle");
    if (subMenu) {
      if(isActive){
        subMenu.style.height=`${subMenu.scrollHeight + 6}px`;
        subMenu.style.padding="0.2rem 0";
      }else{
        subMenu.style.height= "0";
        subMenu.style.padding= "0";
      }
    }
    menuItemDropDown.forEach((item) => {
      if(item !== menuItem){
        const otherSubmenu = item.querySelector(".sub-menu");
        if(otherSubmenu){
          item.classList.remove("sub-menu-toggle");
          otherSubmenu.style.height="0"
          otherSubmenu.style.padding="0"
        }
      }
    });
  });
});

menuBtn.addEventListener("click", () => {
  sideBar.classList.toggle("minimize");
});
