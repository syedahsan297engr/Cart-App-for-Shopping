//the functions you have define in other javascript file can be imported as this below use type "module" in html
//source section to make this import work remember to add file in sources in html from where you are importing the 
//data also there is one more thing the func name start with export in file for the function you wanna export
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue, remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//import all the func you want to use otherwise they will not work
const appSetting = {
    databaseURL: "https://playground-64fde-default-rtdb.firebaseio.com/"

}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputField = document.getElementById("input-field");
const inputBtn = document.getElementById("input-btn");
const shoppingListEl = document.getElementById("shopping-list")

function clear_list() {
    shoppingListEl.innerHTML = '';
}

function clear_space() {
    inputField.value = '';
}

function button_clicked(){
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    clear_space();
    //add_to_list(inputValue); commenting bcz in onValue we are adding so this line creates duplicate
}


inputBtn.addEventListener("click", function () {
    button_clicked();
})

inputField.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        button_clicked();
    }
});

function add_to_list(input){
    let itemID = input[0];
    let itemValue = input[1];
    let newEl = document.createElement("li");
    //newEl.classList.add("input");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function () {
        let locationOfDatabase = ref(database, `shoppingList/${itemID}`);
        remove(locationOfDatabase)
    })
    shoppingListEl.append(newEl);
}


onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let booksArray = Object.entries(snapshot.val());
    //console.log(booksArray);
        clear_list();
        for (let i = 0; i < booksArray.length; i++) {
            let currentItem = booksArray[i];
            let currentItemID = currentItem[0];
         //console.log(currentItemID);
            let currentItemValue = currentItem[1];
            //console.log(currentItemValue);

            add_to_list(currentItem); //elements in data base are added if you edit certain element it is added as a new copy with other elements of database so first clear the data base
        }
    }else{
        shoppingListEl.innerHTML = "No Item Here ... Yet!";
    }
    
    //console.log(snapshot);
})



//setting the view port means your website shows good on mobile  as same on laptop as same on laptop enabled in html
//also text not selection enabled in css

