const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");
const menuItemDropDown = document.querySelectorAll(".menu-item-dropdown");
const menuItemsStatic = document.querySelectorAll(".menu-item-static");
const sidebarBtn = document.getElementById("sidebar-btn");
const darkMode =document.getElementById("dark-mode-btn");

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
})

function checkWindowsSize(){
  sidebar.classList.remove("minimize");
}

checkWindowsSize();
window.addEventListener("resize", checkWindowsSize);

sidebarBtn.addEventListener("click", () =>{
  document.body.classList.toggle("sidebar-hidden");
});

menuItemsStatic.forEach((menuItem) => {
  menuItem.addEventListener("mouseenter", () => {
    if (!sidebar.classList.contains("minimize")) return;

    menuItemDropDown.forEach((item) => {
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
  sidebar.classList.toggle("minimize");
});
