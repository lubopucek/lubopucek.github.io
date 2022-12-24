
// console.log("Immediately invoked function expression.");

const openNavMenu = document.querySelector(".open-nav-menu"),
closeNavMenu = document.querySelector(".close-nav-menu"),
navMenu = document.querySelector(".nav-menu"),
menuOverlay = document.querySelector(".menu-overlay"),
mediaSize = 992;

openNavMenu.addEventListener("click", toggleNav);
closeNavMenu.addEventListener("click", toggleNav);
// Close the navMenu by clicking outside
menuOverlay.addEventListener("click", toggleNav);

function toggleNav() {
    navMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('hidden-scrolling');
}

let hasChildren = document.querySelectorAll('.menu-item-has-children');
for(let i = 0; i <= hasChildren.length - 1; i++) {
    hasChildren[i].getElementsByTagName("a")[0].setAttribute('data-toggle', 'sub-menu');
}

navMenu.addEventListener("click", (event) => {
   if(event.target.hasAttribute('data-toggle') && window.innerWidth <= mediaSize) {
    // prevent default anchor click behavior
    event.preventDefault();
    const menuItemHasChildren = event.target.parentElement;
    // If menuItemHasChildren is already collapsed, collapse it
    if(menuItemHasChildren.classList.contains('active')) {
        collapseSubMenu();
    }
    else {
        // Collapse existing expanded menuItemHasChildren
        if(navMenu.querySelector('.menu-item-has-children.active')) {
            collapseSubMenu();
        }

        menuItemHasChildren.classList.add('active');
        const subMenu = menuItemHasChildren.querySelector('.sub-menu');
        subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        }
   }
})

function collapseSubMenu() {
    navMenu.querySelector('.menu-item-has-children.active .sub-menu')
    .removeAttribute('style');
    navMenu.querySelector('.menu-item-has-children.active')
    .classList.remove('active');
}

function resizeFix() {
    // If navMenu is open, close it
    if(navMenu.classList.contains('open')){
        toggleNav();
    }
    // If menuItemHasChildren is expanded, collapse it
    if(navMenu.querySelector('.menu-item-has-children.active')) {
        collapseSubMenu();
    }
}



window.addEventListener('resize', function() {
    if(this.innerWidth > mediaSize) {
        resizeFix();
    }
})
 