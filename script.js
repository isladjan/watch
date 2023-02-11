// let infoDiv = document.querySelector(".info");
// let text = "Total width/height: " + screen.width + "*" + screen.height + "<br>" +
// "Available width/height: " + screen.availWidth + "*" + screen.availHeight + "<br>" +
// "Color depth: " + screen.colorDepth + "<br>" +
// "Color resolution: " + screen.pixelDepth;
// infoDiv.innerHTML = text;



(() => {
    //when we click on the main menu
    mainmenu();

    submenu();

    //up and down touch 
    controlsInit();



    /*  ````````````````````````````````  */

    //when we click on the main menu
    //MARK: -mainmenu
    function mainmenu() {
        let menuEl = document.querySelectorAll(".main-menu > li");
        menuEl.forEach(el => {
            el.addEventListener("click", (e) => {
                document.querySelector(".main-menu").classList.remove("activ")
                document.querySelector(`.${e.target.dataset.name}`).classList.add("activ");
            })
        });
    }



    //MARK: -submenu
    function submenu() {
        let submenuEl = document.querySelectorAll(".submenu > li");
        let content = document.querySelector(".content");

        submenuEl.forEach(el => {
            el.addEventListener("click", (e) => {
                e.target.parentElement.classList.remove("activ")
                let cur = content.querySelector(`.${e.target.dataset.subname}`);
                if (cur) {
                    cur.classList.add("activ");
                    cur.firstElementChild.classList.add("activ");
                }
            })
        })
    }




    //MARK: -controlsInit
    function controlsInit() {
        document.querySelectorAll(".controls").forEach(el => {
            el.addEventListener("click", (e) => {
                let activGroup = document.querySelector(".panel-group.activ");
                if(!activGroup) { //if the subgroup does not exist - return to the main menu
                    document.querySelector(".main-menu").classList.add("activ");
                    console.log('RETURN');
                    return;
                }
                let activPanel = activGroup.querySelector(".panel.activ");
                let lastOrder;

                //get last index of panel in current section
                let orderList = [];
                document.querySelector(".panel-group.activ").querySelectorAll(".panel").forEach(el => {
                    orderList.push(Number(el.dataset.order))
                });
                lastOrder = orderList[orderList.length - 1];


                //up
                if (e.target.classList.contains('up')) {
                    let nextEl = activGroup.querySelector(`[data-order="${Number(activPanel.dataset.order) - 1}"]`);
                    if (!nextEl) nextEl = activGroup.querySelector(`[data-order="${lastOrder}"]`);

                    nextEl.classList.add("activ");
                    activPanel.classList.remove("activ")
                    //console.log(nextEl);

                    //down
                } else if (e.target.classList.contains('down')) {
                    let nextEl = activGroup.querySelector(`[data-order="${Number(activPanel.dataset.order) + 1}"]`);
                    if (!nextEl) nextEl = activGroup.querySelector(`[data-order="1"]`);

                    nextEl.classList.add("activ");
                    activPanel.classList.remove("activ")
                    //console.log(nextEl);
                }


                //back
                else {
                    activGroup.classList.remove("activ");
                    activPanel.classList.remove("activ");
                    document.querySelector(".main-menu").classList.add("activ")
                }
            })
        })


    }


})();