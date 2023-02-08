// let infoDiv = document.querySelector(".info");
// let text = "Total width/height: " + screen.width + "*" + screen.height + "<br>" +
// "Available width/height: " + screen.availWidth + "*" + screen.availHeight + "<br>" +
// "Color depth: " + screen.colorDepth + "<br>" +
// "Color resolution: " + screen.pixelDepth;
// infoDiv.innerHTML = text;



(() => {


    //dbInit();

    controlsInit()

 


    /*  ````````````````````````````````  */

    //MARK: -controlsInit
    function controlsInit() {


        //get element with last order Number
        let orderList = [];
        let verbs = document.querySelectorAll(".verb");
        verbs.forEach(verb => {
            orderList.push(Number( verb.dataset.order))
        });
        let lastOrder = orderList[orderList.length -1]
 



        document.querySelectorAll(".controls").forEach(el => {

            el.addEventListener("click",  (e) => {
                let currentEl = document.querySelector(".activ");
                
                

                //up
                if(e.target.classList.contains('up')) {
                    let nextEl = document.querySelector(`[data-order="${Number(currentEl.dataset.order)-1}"]`);
                    if(!nextEl) nextEl = document.querySelector(`[data-order="${lastOrder}"]`);

                    nextEl.classList.add("activ");
                    currentEl.classList.remove("activ")
                    //console.log(nextEl);
       


                //down
                }else {
                    let nextEl = document.querySelector(`[data-order="${Number(currentEl.dataset.order)+1}"]`);
                    if(!nextEl) nextEl = document.querySelector(`[data-order="1"]`);

                    nextEl.classList.add("activ");
                    currentEl.classList.remove("activ")
                    //console.log(nextEl);

                }
            })
        })
       

    }

    //MARK: -dbInit
    function dbInit() {
        const request = indexedDB.open('WATCH', 1);


        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log(db);

            insertContact(db, {
                email: 'john.doe@outlook.com',
                firstName: 'John',
                lastName: 'Doe'
            });
       
            insertContact(db, {
                email: 'jane.doe@gmail.com',
                firstName: 'Jane',
                lastName: 'Doe'
            });
        };


        // create the Contacts object store and indexes
        request.onupgradeneeded = (event) => {
            let db = event.target.result;

            // create the Contacts object store 
            // with auto-increment id
            let store = db.createObjectStore('Contacts', {
                autoIncrement: true
            });

            // create an index on the email property
            let index = store.createIndex('email', 'email', {
                unique: true
            });
        };


    }




    function insertContact(db, contact) {
        // create a new transaction
        const txn = db.transaction('Contacts', 'readwrite');
    
        // get the Contacts object store
        const store = txn.objectStore('Contacts');
        //
        let query = store.put(contact);
    
        // handle success case
        query.onsuccess = function (event) {
            console.log(event);
        };
    
        // handle the error case
        query.onerror = function (event) {
            console.log(event.target.errorCode);
        }
    
        // close the database once the 
        // transaction completes
        txn.oncomplete = function () {
            db.close();
        };
    }


})();