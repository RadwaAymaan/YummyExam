
$(document).ready(function () {
    $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        // $('#loading').addClass('d-none');
        // $('#loading').removeClass('d-flex');
    });
});
async function getMeal(){
                
                let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
                let finalResult = await apiResponse.json();
                displayMeal(finalResult.meals,0);
                // console.log(finalResult.meals);  
                getMealDetail() 
}
getMeal();
   function displayMeal(meal,mealNo){
     let container = ``;
     for(let i=0;i<meal.length;i++){
        container +=
        `<div class="col-md-3" id="${meal[i].idMeal}"> 
        <div class="meal rounded-2" id="meal">
       <img class="w-100" src="${meal[i].strMealThumb}" alt="">
       <div class="layer text-black p-2 rounded-2">
        <h3>${meal[i].strMeal}</h3>
       </div>
    </div>
      </div>` 
     }
    $('.meals').eq(mealNo).html(`${container}`);
}

function getMealDetail(){
    document.querySelectorAll('.col-md-3').forEach(item => {
        item.addEventListener('click', event => {
        detalis(item.id);
        $('#loading').fadeIn(50);
        $('#displayDetail').removeClass("nonActive")
        $('#displayDetail').siblings().addClass("nonActive");
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        closeSlide();
        })
      })
    })
}

    async function detalis(idValue){
    
        let detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
        let deresult= await detali.json();
        displayDetails(deresult); 
        console.log(deresult.meals);
    }
   
    
function displayDetails(dataAPI) {
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (dataAPI.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataAPI.meals[0][`strMeasure${i}`]} ${dataAPI.meals[0][`strIngredient${i}`]}</li>`
        }
        // console.log(dataAPI.meals[0][`strIngredient${i}`]);
    }
    let tags=dataAPI.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit[i]}</li>
            `
        }
    }else{
            tags=[];
    }
    const cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${dataAPI.meals[0].strMealThumb}" alt="image meal">
                        <h2>${dataAPI.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                
                <p>${dataAPI.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${dataAPI.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataAPI.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    
    `;
    document.getElementById('mealDetails').innerHTML=cartona;
    // console.log(dataAPI);
}
/////////////////////////Navv/////////////////////////////
function openSlide(){
    $('.overlay').animate({left:'0px'},500);
    $('.open-close-icon').removeClass('fa-align-justify');
    $('.open-close-icon').addClass('fa-x');
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({top: '0px'},(i + 5) * 100);
    }
}
function closeSlide(){
    let sideBarWidth = $('.side-nav').innerWidth();
    $('.overlay').animate({left:-sideBarWidth},500);
    $('.open-close-icon').removeClass('fa-x');
    $('.open-close-icon').addClass('fa-align-justify');
//    let offset = $('ul li').offset().top;
//    console.log(offset);
    $('.links li').animate({top:'300px'},500);
}
$('.nav-header i').click(function (e) { 
        if($('.overlay').css('left') == '0px'){
            closeSlide();
        }else{
            openSlide();
        }
    });
closeSlide();
/////////////////////////////search////////////////////
function showSearchInput(){
    $('#searchInput').click(()=>{
       openSearch();
       $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        getTerm();
    });
    let searchContainer = document.getElementById('searchContainer');
    let container =``;
    container +=`<div class="row py-4">
            <div class="col-md-6">
            <input type="text" placeholder="Search By Name" class="search form-control text-white bg-transparent" id="searchName">
            </div>
            <div class="col-md-6">
            <input type="text" maxlength="1" placeholder="Search By First Letter"class="search form-control text-white bg-transparent" id="searchLetter">
            </div>
        </div>` 
        searchContainer.innerHTML = container;
    })
}
showSearchInput();
function openSearch(){
    $(function () {
        closeSlide();
        console.log('hello');
        $('#search').removeClass("nonActive")
        $('#search').siblings().addClass("nonActive");
    });
}
async function searchByName(term){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let finalResult = await apiResponse.json();
    // let meals = finalResult.meals;
    displayMeal(finalResult.meals,1);
    console.log(finalResult.meals);
}
async function searchByLetter(letter){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let finalResult = await apiResponse.json();
    displayMeal(finalResult.meals,1);
}
function getTerm(){
$('#searchName').keyup(function (eventInfo) {
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000);
    searchByName(eventInfo.target.value);
});

$('#searchLetter').keyup(function (eventInfo) {
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000);
    searchByLetter(eventInfo.target.value);
});
}


//////////////////////////////category//////////////////////////////
function showCategoryInput(){
    $('#Category').click(()=>{
        opencategory();
       $('#loading').fadeIn(50);
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        showCategory();
    });
})
}
showCategoryInput();
function opencategory(){
    $(function () {
        closeSlide();
        $('#categoryBox').removeClass("nonActive")
        $('#categoryBox').siblings().addClass("nonActive");
    });
}
async function showCategory(){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalResult = await apiResponse.json();
    displayList(finalResult.categories);
    console.log(finalResult.categories);
    getCategoryType();
    $('#listCategry').removeClass("nonActive")
    $('#listCategry').siblings().addClass("nonActive");
    
}
function displayList(category){
    let container = ``;
    for(let i=0;i<category.length;i++){
       container +=
       `<div class="col-md-3">
       <div class="meal rounded-2" id="meal">
      <img class="w-100" src="${category[i].strCategoryThumb}" alt="">
      <div class="layer position-absolute text-center text-black p-2 d-block" id="layer1">
                        <h3>${category[i].strCategory}</h3>
                        <p>${category[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
   </div>
     </div>` 
    }
   $('#listCategry').html(`${container}`);

    console.log('hello');
}
function getCategoryType(){

document.querySelectorAll('.layer').forEach(item => {
    item.addEventListener('click', event => {
        getType(item.querySelector('h3').textContent);
    })
  })
}


// }
async function getType(catId){
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`);
    let finalResult = await apiResponse.json();
    displayMeal(finalResult.meals,2);
    console.log(finalResult.meals);
    $('#specificCategory').removeClass("nonActive")
    $('#specificCategory').siblings().addClass("nonActive");
    $('#loading').fadeIn(50);
    $('#loading').fadeOut(1000,()=>{
    $("body").css('overflow','visible');})
    getCategoryDetail();
}

function getCategoryDetail(){
    document.querySelectorAll('.col-md-3').forEach(item => {
        item.addEventListener('click', event => {
        categoryDetalis(item.id);
        $('#loading').fadeIn(50);
        $('#displayCategoryDetail').removeClass("nonActive")
        $('#displayCategoryDetail').siblings().addClass("nonActive");
        $('#loading').fadeOut(1000,()=>{
        $("body").css('overflow','visible');
        closeSlide();
        })
      })
    })
}
async function categoryDetalis(idValue){ 
    let detali = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
    let deresult= await detali.json();
    displayCategoryDetails(deresult); 
    console.log(deresult.meals);
}
function displayCategoryDetails(dataAPI) {
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (dataAPI.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${dataAPI.meals[0][`strMeasure${i}`]} ${dataAPI.meals[0][`strIngredient${i}`]}</li>`
        }
        // console.log(dataAPI.meals[0][`strIngredient${i}`]);
    }
    let tags=dataAPI.meals[0].strTags;
    let tagesword=``;
    if(tags){
        let tagessplit=tags.split(",");
        for(let i=0;i<tagessplit.length;i++){
            tagesword+=`
            <li class="alert alert-danger m-2 p-1">${tagessplit[i]}</li>
            `
        }
    }else{
            tags=[];
    }
    const cartona = `
    <div class="col-md-4">
                    <img class="w-100 rounded-3" src="${dataAPI.meals[0].strMealThumb}" alt="image meal">
                        <h2>${dataAPI.meals[0].strMeal}</h2>
                </div>
                <div class="col-md-8">
                <h2>Instructions</h2>
                
                <p>${dataAPI.meals[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${dataAPI.meals[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${dataAPI.meals[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagesword}
                </ul>
                <a target="_blank" href="${dataAPI.meals[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${dataAPI.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    
    `;
    document.getElementById('categoryDetails').innerHTML=cartona;
    // console.log(dataAPI);
}
///////////////////Area////////////////////////////////
$('#AreaInput').click(function(){      
    openAria()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     arealist();  
    });
   
   
})                              
function openAria()
{ $(function () {
    closeSlide()
    console.log('hi');
    $("#area").removeClass("nonActive");
    $("#area").siblings().addClass("nonActive");
});
}


async function arealist()
{
    let aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let aresult= await aresponse.json();
    displyAreaList(aresult.meals,aresult.meals.length,1);
    areaName();

}
function areaName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getArea(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
            

        })
    }
}
async function getArea(Areaname){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Areaname}`);
    let arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,3);
    console.log(arfinalResult.meals);
    $('#Areameals').removeClass("nonActive")
    $('#Areameals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyAreaList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
            <i class="fa-solid fa-house-laptop fa-4x "></i>
                <h3>${arr[i].strArea}</h3>
          </div>
        </div>
        `
    }
       $('.list').eq(num).html(`${cartoona}`);
}
/////////////////////////integrates///////////////
$('#IngredientsInput').click(function(){      
    openInteg()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(2000, function(){
     $('body').css("overflow", "visible");
     Integlist();  
    });
   
   
})                              
function openInteg()
{ $(function () {
    closeSlide()
    console.log('hi');
    $("#Ingredients").removeClass("nonActive");
    $("#Ingredients").siblings().addClass("nonActive");
});
}


async function Integlist()
{
    let aresponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let aresult= await aresponse.json();
    displyIntegList(aresult.meals,aresult.meals.length,2);
    integName();

}
function integName(){
    let item =document.querySelectorAll(".meallist");
    for (let i=0;i<item.length;i++){
        $(item[i]).click(function(info){
            getInteg(item[i].querySelector("h3").textContent);
            console.log(item[i].querySelector("h3").textContent);
            

        })
    }
}
async function getInteg(IntegName){
    let arResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IntegName}`);
    let arfinalResult = await arResponse.json();
    displayMeal(arfinalResult.meals,4);
    console.log(arfinalResult.meals);
    $('#IntergatesMeals').removeClass("nonActive")
    $('#IntergatesMeals').siblings().addClass("nonActive");
    getMealDetail();

}
function displyIntegList(arr,val,num){
    let cartoona = "";
    for (let i=0;i<val && i<20; i++) {
        cartoona += `
        <div class="col-md-3">
          <div class="meallist rounded-2  cursor-pointer text-center">
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${`${arr[i].strDescription}`.split(" ").slice(0,20).join(" ")}</p>
          </div>
        </div>
        `
    }
       $('.list').eq(num).html(`${cartoona}`);
}
///////////////////////contacts///////////////////////
function showContacts() {
    document.getElementById('contact').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password Minimum eight characters, at least one letter and one number:
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
 let submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}




$('#ContactsInput').click(function(){      
    openCont()
    $("#loading").fadeIn( 50);
    $("#loading").fadeOut(1000, function(){
     $('body').css("overflow", "visible");
     showContacts();  
    });
}) 

function openCont()

{ $(function () {
    closeSlide();
    $("#contact ").removeClass("nonActive");
    $("#contact").siblings().addClass("nonActive");
});
}
