let productName = document.querySelector("[name = productName]");
let productPrice = document.querySelector("[name = productPrice]");
let productCategory = document.querySelector("[name= productCategory]");
let productproductDescrip = document.querySelector("[name= productDescrip]");
let addBtn = document.querySelector("[type=submit]");
let tbody = document.querySelector("tbody");
let searchInput = document.querySelector("[type = search ]");
let productsDetailes;


//********************** Check if localStorage is empty or not *****

if (window.localStorage.productsDetailesLocal == undefined) {
  productsDetailes = [];
} else {
  productsDetailes = JSON.parse(window.localStorage.productsDetailesLocal);
  displayElement(productsDetailes);
}

//************ ckeck if inputs value are empty or not ************

function checkIfEmpty(ifInputsNotEmpty) {
  let errorMsg = document.querySelector(".errorMsg");
  if (
    productName.value === "" ||
    productPrice.value === "" ||
    productCategory.value == "" ||
    productproductDescrip.value == ""
  ) {
    errorMsg.style.visibility = "visible";
  } else {
    errorMsg.style.visibility = "hidden";
    ifInputsNotEmpty();
  }
}

//************** once click add data will added to array and localStorage ***********

addBtn.onclick = function (event) {
  event.preventDefault();
  addData();
};

function addData() {
  console.log("kkk");
  checkIfEmpty(addDataToArray);
  function addDataToArray() {
    productsDetailes.push({
      productName: productName.value,
      productPrice: productPrice.value,
      productCategory: productCategory.value,
      productproductDescrip: productproductDescrip.value,
    });
    window.localStorage.productsDetailesLocal = JSON.stringify(productsDetailes);
    tbody.innerHTML = "";
    displayElement(productsDetailes);
    clearInputs();
  }
}

//*********************** create element for display data on taple *********

function displayElement(productsArray) {
  for (let i = 0; i < productsArray.length; i++) {
    let tr = document.createElement("tr");

    let tdIndex = document.createElement("td");
    tdIndex.innerHTML = i + 1;
    tr.appendChild(tdIndex);

    let tdName = document.createElement("td");
    tdName.innerHTML = productsArray[i].productName;
    tr.appendChild(tdName);

    let tdPrice = document.createElement("td");
    tdPrice.innerHTML = productsArray[i].productPrice;
    tr.appendChild(tdPrice);

    let tdCategory = document.createElement("td");
    tdCategory.textContent = productsArray[i].productCategory;
    tr.appendChild(tdCategory);

    let tdproductDescrip = document.createElement("td");
    tdproductDescrip.textContent = productsArray[i].productproductDescrip;
    tr.appendChild(tdproductDescrip);

    let editTd = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.textContent = "Edit";
    editTd.appendChild(editBtn);
    tr.appendChild(editTd);

    let deleteTd = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "Delete";
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);

    //************* once click on editBtn it will call edit function **************

    editBtn.onclick = function () {
      editItem(i);
    };
    
    // update يرجع تاني للزرار الادد وينفذ فانكشن الادد مش فانكش ال  update  ال4سطور الجايين عشان بعد ما اضغط علي الزار ال
    
    addBtn.innerHTML = "Addproduct ❤😂👀";
    addBtn.onclick = function (event) {
      event.preventDefault();
      addData();
    };
    
    //************* once click on delteBtn it will call delete function **************
   
    deleteBtn.onclick = function () {
      deleteItem(i);
    };

    //*******/

    tbody.appendChild(tr);
  }
}

//******************************* clear inputs **********************

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productproductDescrip.value = "";
}

//******************************* deleteFunction ********************

function deleteItem(i) {
  productsDetailes.splice(i, 1);
  window.localStorage.productsDetailesLocal = JSON.stringify(productsDetailes);
  tbody.innerHTML = "";
  displayElement(productsDetailes);
}

//************************** editFunction ************************

function editItem(i) {
  addBtn.innerHTML = "Update";
  productName.value = productsDetailes[i].productName;
  productPrice.value = productsDetailes[i].productPrice;
  productCategory.value = productsDetailes[i].productCategory;
  productproductDescrip.value = productsDetailes[i].productproductDescrip;

  addBtn.onclick = function (event) {
    event.preventDefault();
    //********* هنادي علي داله اللي بتتشك علي المربعات فاضيه ولا اي **** */
    
    checkIfEmpty(updateElement);

    function updateElement() {
      productsDetailes[i].productName = productName.value;
      productsDetailes[i].productPrice = productPrice.value;
      productsDetailes[i].productCategory = productCategory.value;
      productsDetailes[i].productproductDescrip = productproductDescrip.value;
      window.localStorage.productsDetailesLocal = JSON.stringify(productsDetailes);
      tbody.innerHTML = "";
      displayElement(productsDetailes);
      clearInputs();

    }
  };
}

//******************************* search on array(real time search)  *****************

searchInput.oninput = function () {

  //**** searchInput الارري دي هحط فيها العناصر اللي بتماتش القيمه اللي في  */
  let matchArr = [];
  for (let i = 0; i < productsDetailes.length; i++) {
    if (productsDetailes[i].productName.includes(searchInput.value)) {
      matchArr.push(productsDetailes[i]);
    }
    else{
      console.log("noooo")
    }
  }
  tbody.innerHTML = "";
  displayElement(matchArr);
};

