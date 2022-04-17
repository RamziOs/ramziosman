//* -------------- navigation menu ----------------*//
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenue);
    closeNavBtn.addEventListener("click", hideNavMenue);

    function showNavMenue() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenue() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    //* -------------- attach an event handler to document ----------------*//
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            //* -------------- make sure event.target.hash has a value before overriding default behavior ----------------*//
            if (event.target.hash !== "") {
                //* -------------- prevent default anchor click behavior ----------------*//
                event.preventDefault();
                const hash = event.target.hash;
                //* -------------- deactivate existing active section----------------*// 
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                //* -------------- activate new section----------------*//
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                //* -------------- deactivate existing active navigation menu 'link-item'----------------*// 
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                //* -------------- if clicked 'link-item' contained withing the navigation menu----------------*// 
                if (navMenu.classList.contains("open")) {
                    //* -------------- activeate new navigation menu 'link-item'----------------*// 
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    //* -------------- hide the navigation menu----------------*// 
                    hideNavMenue();
                }
                else {
                    let navIiems = navMenu.querySelectorAll(".link-item");
                    navIiems.forEach((item) => {
                        if (hash == item.hash) {
                            //* -------------- activeate new navigation menu 'link-item' ----------------*//
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                    fadeOutEffect();

                    //* -------------- Add # to url----------------*//
                    // window.location.hash = hash;
                }
            }
        }
    });
})();


//* -------------- About section tabs----------------*//
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        //* -------------- if event.target. contais 'tab-item class and not contains 'active' class ----------------*//
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            // console.log("event.target. contais 'tab-item class and not contains 'active' class");
            const target = event.target.getAttribute("data-target");
            //* --------------deactivate existing active 'tab-item'----------------*//
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //* -------------- activate 'tab-itrm'----------------*//
            event.target.classList.add("active", "outer-shadow");
            //* -------------- deactivate new 'tab-item'----------------*//
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // //* -------------- activate new 'tab-content'----------------*//
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}

//* -------------- Portfolio filtter and popup----------------*//
(() => {
    const filterContainer = document.querySelector(".portfolio-filter");
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        precBtn = document.querySelector(".pp-prev"),
        NextBtn = document.querySelector(".pp-next"),
        closeBtn = document.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    //* -------------- filter portfolio items  ----------------*//
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && !event.target.classList.contains("active")) {
            //* -------------- deactive existing active "filter-item"  ----------------*//
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //* -------------- active new "filter-item"  ----------------*//
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //* -------------- get the portfolioItem index  ----------------*//
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            //* -------------- convert screenshot into array  ----------------*//
            screenshots = screenshots.split(",");
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle()
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //* -------------- activate loader until the poupImg loaded ----------------*//
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //* -------------- deactivate loader after the poupImg loaded ----------------*//
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    //* -------------- next slide ----------------*//
    NextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 2) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideshow();
    })
    //* -------------- prev slide ----------------*//
    precBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 2;
        }
        else {
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails() {
        //* -------------- if portfolio-item-deatilsnot exists ----------------*//
        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-detils")) {
            projectDetailsBtn.style.display = "none";
            return;//* End function execution */
        }
        projectDetailsBtn.style.display = "block";
        //* -------------- get the project deatils ----------------*//
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-detils").innerHTML;
        //* -------------- set the project deatils ----------------*//
        popup.querySelector(".pp-project-details").innerHTML = details;
        //* -------------- get the project title ----------------*//
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        //* -------------- set the project title ----------------*//
        popup.querySelector(".pp-title h2").innerHTML = title;
        //* -------------- get the project category ----------------*//
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        //* -------------- set the project category ----------------*//
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }


    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else {
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();

//* -------------- hide all section except active ----------------*//
(() => {
    const section = document.querySelectorAll(".section");
    section.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();

window.addEventListener("load", () => {
    //* -------------- preloder ----------------*//
    document.querySelector(".preloder").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloder").style.display = "none"
    }, 600)
})