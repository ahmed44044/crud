var productNameInput = document.getElementById('productNameInput')
var productPriceInput = document.getElementById('productPriceInput')
var productCategoryInput = document.getElementById('productCategoryInput')
var productDescInput = document.getElementById('productDescInput')
var tableBody=document.getElementById('tableBody')
var addBtn=document.getElementById('addBtn')
var updateBtn=document.getElementById('updateBtn')
var updateBtnId=document.getElementById('updateBtn')
var id;
var productContainer;

if (localStorage.getItem('myProduct') != null) {
    productContainer=JSON.parse(localStorage.getItem('myProduct'))
    displayProduct(productContainer)
} else {
    productContainer=[]
}

function addProduct(){
    if (validationProductName() ==true && validationProductDes() == true &&validationProductCategory() == true &&validationProductPrice() == true) {
        var product ={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value.replace(/\s/gm,"")  // بقوله شيل اي مسافه والزق الكلام
        }
        productContainer.push(product)
        localStorage.setItem('myProduct',JSON.stringify(productContainer))
        clearForm()
        displayProduct(productContainer)
    } else {
        alert("Product In-valid")
    }

}

function clearForm(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
}
function displayProduct(productList){
   var cartoona=``
    for (var i=0; i<productList.length;i++){
        cartoona +=`
        <tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i})"  class="btn btn-sm btn-outline-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-outline-danger">delete</button></td>
    </tr>`
    }
    tableBody.innerHTML=cartoona;
}

function searchProduct(searchName){
    var searchContainer=[];
    for (var i=0; i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(searchName.toLowerCase())==true){
            searchContainer.push(productContainer[i])
        }
    }
    displayProduct(searchContainer)
}


function deleteProduct(deleteIndex){
    productContainer.splice(deleteIndex,1)
    localStorage.setItem("myProduct",JSON.stringify(productContainer))
    displayProduct(productContainer)
}

function deleteAll()
{
    
    localStorage.clear()
    productContainer.splice(0)
    displayProduct(productContainer)
    
}

function setFormForUpdate(updateItem){
    productNameInput.value=productContainer[updateItem].name;
    productPriceInput.value=productContainer[updateItem].price;
    productCategoryInput.value=productContainer[updateItem].category;
    productDescInput.value=productContainer[updateItem].desc ;
    updateBtnId=updateItem;
    updateBtn.classList.replace('d-none','d-inline-block')
    addBtn.classList.add('d-none')
    
}



function updateProducts(){
    if (validationProductName() ==true && validationProductDes() == true &&validationProductCategory() == true &&validationProductPrice() == true) {
        var updateProduct ={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value.replace(/\s/gm,"") 
        }
        productContainer.splice(updateBtnId,1,updateProduct)
        localStorage.setItem("myProduct",JSON.stringify(productContainer))
        displayProduct(productContainer)
        updateBtn.classList.add('d-none')
        addBtn.classList.remove('d-none')
        clearForm()
    }
    else{
        alert("ProductUpdate in-valid")
    }

   

}

function validationProductName(){
    var regex =/^[a-zA-Z]{3,8}[0-9]{0,2}$/;
    if (regex.test(productNameInput.value) == true) {
        if (productNameInput.classList.contains("is-invalid") == true) {
            productNameInput.classList.replace("is-invalid","is-valid")
        } else {
            productNameInput.classList.add("is-valid")
        }
        
        return true;
    } else {
        if (productNameInput.classList.contains("is-valid") == true) {
            productNameInput.classList.replace("is-valid","is-invalid")
        } else {
            productNameInput.classList.add("is-invalid")
        }
        return false
    }
}
function validationProductDes(){
    var regex =/^[a-zA-Z] *[a-z]{3,}$/;
    if (regex.test(productDescInput.value) == true) {
        if (productDescInput.classList.contains("is-invalid") == true) {
            productDescInput.classList.replace("is-invalid","is-valid")
        } else {
            productDescInput.classList.add("is-valid")
        }
        
        return true;
    } else {
        if (productDescInput.classList.contains("is-valid") == true) {
            productDescInput.classList.replace("is-valid","is-invalid")
        } else {
            productDescInput.classList.add("is-invalid")
        }
        return false
    }
}
function validationProductPrice(){
    var regex =/^[1-9][0-9]{2,5}$/;
    if (regex.test(productPriceInput.value) == true) {
        if (productPriceInput.classList.contains("is-invalid") == true) {
            productPriceInput.classList.replace("is-invalid","is-valid")
        } else {
            productPriceInput.classList.add("is-valid")
        }
        
        return true;
    } else {
        if (productPriceInput.classList.contains("is-valid") == true) {
            productPriceInput.classList.replace("is-valid","is-invalid")
        } else {
            productPriceInput.classList.add("is-invalid")
        }
        return false
    }
}
function validationProductCategory(){
    var regex =/^[a-zA-Z]{3,20}$/;
    if (regex.test(productCategoryInput.value) == true) {
        if (productCategoryInput.classList.contains("is-invalid") == true) {
            productCategoryInput.classList.replace("is-invalid","is-valid")
        } else {
            productCategoryInput.classList.add("is-valid")
        }
        
        return true;
    } else {
        if (productCategoryInput.classList.contains("is-valid") == true) {
            productCategoryInput.classList.replace("is-valid","is-invalid")
        } else {
            productCategoryInput.classList.add("is-invalid")
        }
        return false
    }
}

