//variables used for nav-button loop
var buttons = document.getElementsByClassName("nav-button");
var i;

//get all buttons named nav-content, attaches event listener and toggles padding bottom and maxheight properties to make it appear and disappear
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById("nav-content");
        if (content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.paddingBottom = "0px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px"
            content.style.paddingBottom = "15px";
        } 
    });
}

var sideBar = document.getElementsByClassName("nav-object");

// event listener for scrolling, this updates the dynamic header and the side bar navigation
window.addEventListener("scroll", function() {
    let logo = document.getElementById("header-logo");
    let nav = document.getElementById("nav-button");
    let sideNav = document.getElementById("nav-container");
    let what = document.getElementById("what");
    let how = document.getElementById("how");
    let creditCards = document.getElementById("credit-cards");
    let beginner = document.getElementById("beginner");
    let limited = document.getElementById("limited");
    let everyday = document.getElementById("everyday");
    let travel = document.getElementById("travel");
    let badCredit = document.getElementById("bad-credit");
    let end = document.getElementById("end");
    // for header
    if (window.innerWidth > 600) {
        if (window.scrollY > 50) { 
            logo.style.height = "80px";
            logo.style.paddingLeft = "10px";
            logo.style.paddingRight = "10px";
            nav.style.paddingLeft = "10px";
            nav.style.paddingRight = "10px";
        } else {
            logo.style.height = "120px";
            logo.style.paddingLeft = "50px";
            logo.style.paddingRight = "50px";
            nav.style.paddingLeft = "50px";
            nav.style.paddingRight = "50px";
        }
    }
    // for side bar
    if (window.innerWidth > 600) {
        if(window.scrollY > 5700) {
            sideNav.style.position = "absolute";
            sideNav.style.top = "5800px";
        }
        else{
            sideNav.style.position = "fixed";
            sideNav.style.top = "100px";
        }
    }
    if (window.innerWidth > 600) {
        if(window.scrollY > (0) && window.scrollY < (what.offsetHeight-100)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[0].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (what.offsetTop-100) && window.scrollY < (how.offsetTop-110)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[1].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (how.offsetTop-110) && window.scrollY < (creditCards.offsetTop-100)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[2].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (creditCards.offsetTop-100) && window.scrollY < (beginner.offsetTop-110)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[3].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (beginner.offsetTop-110) && window.scrollY < (limited.offsetTop-110)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[4].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (limited.offsetTop-110) && window.scrollY < (everyday.offsetTop-100)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[5].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (everyday.offsetTop-100) && window.scrollY < (travel.offsetTop-110)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[6].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (travel.offsetTop-110) && window.scrollY < (badCredit.offsetTop-100)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[7].style.borderLeft = "4px solid #2A5D67";
        }
        else if(window.scrollY > (badCredit.offsetTop-100) && window.scrollY < (end.offsetTop-100)) {
            // Remove border from all nav-objects
            for (let k = 0; k < sideBar.length; k++) {
                sideBar[k].style.borderLeft = "2px solid #2A5D67";
            }

            // Add border to the clicked one
            sideBar[8].style.borderLeft = "4px solid #2A5D67";
        }
    }
});