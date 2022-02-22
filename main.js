window.onload = function () {
    console.log("LOADED!!!");
    get_all_book();
};

function remove_all_book() {
    document.getElementById("incompleteBookshelfList").innerHTML = '';
    document.getElementById("completeBookshelfList").innerHTML = '';
}

function find_buku() {
    let searchBookTitle;
    searchBookTitle = document.getElementById("searchBookTitle").value;

    if (searchBookTitle == "") {
        remove_all_book();
        get_all_book();
    } else {
        remove_all_book();

        let bookMine;
        let total_item = Object.keys(localStorage);
        for (let index = 0; index < total_item.length; index++) {
            console.log(index + ' loop')
            bookMine = JSON.parse(localStorage.getItem(total_item[index]));
            if (bookMine.title.indexOf(searchBookTitle) > -1) {
                appending_book(bookMine);
            }
        }
    }


}

function edit_book(key) {
    let item = JSON.parse(localStorage.getItem(key));
    document.getElementById("inputBookId").value = item.id;
    document.getElementById("inputBookTitle").value = item.title;
    document.getElementById("inputBookAuthor").value = item.author;
    document.getElementById("inputBookYear").value = item.year;

    if (item.isComplete == true) {
        document.getElementById("inputBookIsComplete").checked = true;
    } else {
        document.getElementById("inputBookIsComplete").checked = false;
    }
    document.querySelector('#bookSubmit').innerText = 'Update bukumu';
}


function get_all_book() {
    let bookMine;
    let total_item = Object.keys(localStorage);
    for (let index = 0; index < total_item.length; index++) {
        console.log(index + ' loop')
        bookMine = JSON.parse(localStorage.getItem(total_item[index]));
        appending_book(bookMine);
    }
}

let newBook;
function insert_buku() {
    //IF ELSE UPDATE
    inputBookId = document.getElementById("inputBookId").value;
    if (inputBookId != "") {
        let itemNew;
        let item = JSON.parse(localStorage.getItem(inputBookId));
        itemNew = {
            id: item.id,
            title: document.getElementById("inputBookTitle").value,
            author: document.getElementById("inputBookAuthor").value,
            year: document.getElementById("inputBookYear").value,
            isComplete: document.getElementById("inputBookIsComplete").checked
        };
        document.getElementById(itemNew.id).remove();
        appending_book(itemNew);
        localStorage.setItem(itemNew.id, JSON.stringify(itemNew));
        document.querySelector('#bookSubmit').innerText = 'Masukkan Buku';

    } else {
        newBook = {
            id: Date.now(),
            title: document.getElementById("inputBookTitle").value,
            author: document.getElementById("inputBookAuthor").value,
            year: document.getElementById("inputBookYear").value,
            isComplete: document.getElementById("inputBookIsComplete").checked
        };
        console.log(newBook.id + '_' + newBook.title + '_' + newBook.author + '_' + newBook.year + '_' + newBook.isComplete);
        localStorage.setItem(newBook.id, JSON.stringify(newBook));
        appending_book(newBook);

    }
    nulling_everything();
    return false;
}

function nulling_everything() {
    document.getElementById("inputBookId").value = "";
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}

function appending_book(key) {
    let h31 = document.createElement("h3");
    h31.innerText = key.title;

    let p1 = document.createElement("p");
    p1.innerText = "Penulis: " + key.author;

    let p2 = document.createElement("p");
    p2.innerText = "Tahun: " + key.year;

    let buton1;
    let buton2;
    let buton3;
    let div1;
    let articlemy;

    // IF ELSE BUTTON BEDA TEXT INSIDE
    if (key.isComplete == true) {
        buton1 = document.createElement("a");
        buton1.setAttribute("onclick", "finish_read(" + key.id + "," + true + ")");
        buton1.classList.add("green")
        buton1.style.cursor = "pointer";
        buton1.style.margin = "0px 3px 0px 0px";
        buton1.innerText = "Belum selesai dibaca";

        buton2 = document.createElement("a");
        buton2.setAttribute("onclick", "delete_read(" + key.id + ")");
        buton2.classList.add("red")
        buton2.style.cursor = "pointer";
        buton2.innerText = "Hapus buku";

        buton3 = document.createElement("a");
        buton3.setAttribute("onclick", "edit_book(" + key.id + ")");
        buton3.classList.add("yellow")
        buton3.style.cursor = "pointer";
        buton3.style.margin = "0px 3px 0px 0px";
        buton3.innerText = "Edit buku";

        div1 = document.createElement("div");
        div1.classList.add("action")
        div1.append(buton1, buton3, buton2);

        articlemy = document.createElement("article");
        articlemy.classList.add("book_item")
        articlemy.setAttribute("id", key.id);
        articlemy.append(h31, p1, p2, div1);

        //MASUKIN ATAS
        document.getElementById("completeBookshelfList").append(articlemy);
    } else {
        buton1 = document.createElement("a");
        buton1.setAttribute("onclick", "finish_read(" + key.id + "," + false + ")");
        buton1.classList.add("green")
        buton1.style.cursor = "pointer";
        buton1.style.margin = "0px 3px 0px 0px";
        buton1.innerText = "Selesai dibaca";

        buton2 = document.createElement("a");
        buton2.setAttribute("onclick", "delete_read(" + key.id + ")");
        buton2.classList.add("red")
        buton2.style.cursor = "pointer";
        buton2.innerText = "Hapus buku";

        buton3 = document.createElement("a");
        buton3.setAttribute("onclick", "edit_book(" + key.id + ")");
        buton3.classList.add("yellow")
        buton3.style.cursor = "pointer";
        buton3.style.margin = "0px 3px 0px 0px";
        buton3.innerText = "Edit buku";

        div1 = document.createElement("div");
        div1.classList.add("action")
        div1.append(buton1, buton3, buton2);

        articlemy = document.createElement("article");
        articlemy.classList.add("book_item")
        articlemy.setAttribute("id", key.id);
        articlemy.append(h31, p1, p2, div1);

        //MASUKIN BAWAH
        document.getElementById("incompleteBookshelfList").append(articlemy);
    }

}

function finish_read(key, key2) {
    let itemNew;
    let item = JSON.parse(localStorage.getItem(key));
    let choice = key2;

    console.log(item.id + '_' + item.title + '_' + item.author + '_' + item.year + '_' + item.isComplete);
    //IFELSE SEBALIKNYA
    if (key2 == true) {
        itemNew = {
            id: item.id,
            title: item.title,
            author: item.author,
            year: item.year,
            isComplete: false
        };
    } else {
        itemNew = {
            id: item.id,
            title: item.title,
            author: item.author,
            year: item.year,
            isComplete: true
        };
    }
    //DELETE DOM BASED ON ARTICLE ID
    document.getElementById(key).remove();
    appending_book(itemNew);
    localStorage.setItem(key, JSON.stringify(itemNew));

}

function delete_read(key) {
    localStorage.removeItem(key);
    document.getElementById(key).remove();
}