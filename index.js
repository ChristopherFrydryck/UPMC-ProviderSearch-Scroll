// activeFilters
var activeFilters = [];
var limitedArray = [];
var limitedFullArray = [];
var filteredArray = [];
var startResults = 0;
var endResults = 20;

// Initally shuffle json data for cards
// shuffle(myJson);


// Define the languages of search on render
languageRender("English", "Hebrew", "Spanish")
hospitalRender("UPMC St Margaret", "UPMC Mercy", "UPMC Presbyterian", "UPMC Magee Womens Hospital")

console.log(hospitals)



// Fake loading function. T is the time in milliseconds
function fakeLoading(t){
    document.getElementById("loaderDiv").scrollIntoView();
    document.getElementById("loaderDiv").style.cssText = "display: flex"
    document.getElementById("results").style.cssText = "display: none"
    setTimeout(() => {
        document.getElementById("results").style.cssText = "display: block";
        document.getElementById("loaderDiv").style.cssText = "display: none";
    }, t);
} fakeLoading(4000); // Load for 4s by default





function dataInitalize(start ,end, ANPfilt) {
    document.getElementById("results").innerHTML = ""
    // Initalize first 20 results but not the data
    
    if(arguments.length == 2){
        limitedFullArray = myJson
        limitedArray = myJson.filter((x, i) => i >= start && i < end)
    }else{
        limitedFullArray = myJson.filter((x, i) => x.acceptingNewPatients == true);
        limitedArray = myJson.filter((x, i) => x.acceptingNewPatients == true).filter((x, i) => i >= start && i < end)
    }


    document.getElementById("results").innerHTML = '<h4 id="numResults">' + limitedFullArray.length + ' Results</h4>'
    start == 0 ? document.getElementById("results").innerHTML += '<a href="https://myupmc.upmc.com/anywhere-care/" target="_blank"><div class="ANC-Card"><p>I\'m looking for virtual care via <span>UPMC AnywhereCare</span>.</p></div></a>' : null
    for(let i = 0; i < limitedArray.length; i++){
        document.getElementById("results").innerHTML += '<a href="#"><div class="provider"><div class="leftColumn"><h2 class="name">Lastname, Firstname MI, MD</h2><div class="spacer"><h3>Internal Medicine</h3><span class="np"></span></div></div><div class="rightColumn"><h4>Pine Richland Medical Associates</h4><div><address>9999 Poplar Street <br>Pittsburgh, PA 15222</address><phone>(412) 412-4124</phone></div><div class="milesDist"><span class="letter">B</span><span class="distance"> 0.75 miles away</span></div></div></div></a>'
    }

    let dist = document.getElementsByClassName('distance');
    let na = document.getElementsByClassName('name');
    let add = document.querySelectorAll('address');
    let pho = document.querySelectorAll('phone');
    let np = document.querySelectorAll('.np');
    let prac = document.querySelectorAll('.rightColumn h4');
    let lett = document.querySelectorAll('.letter');

        
        limitedArray.forEach((v, i) => {
            na[i].innerHTML = limitedArray[i].name + ", MD"; // Render name
            add[i].innerHTML = limitedArray[i].address; // Render address
            pho[i].innerHTML = limitedArray[i].phone; // Render phone number
            prac[i].innerHTML = limitedArray[i].practice; // Render practice name
            lett[i].innerHTML = String.fromCharCode(97 + i).toUpperCase();

            // Render accepting new patients
            if(limitedArray[i].acceptingNewPatients == true){
                np[i].innerHTML = '<i class="fa fa-check" aria-hidden="true"><span class="np">Accepting new patients</span></i>'
            }


            // Render distances
            if(limitedArray[i].distance == 1){
                dist[i].innerHTML = limitedArray[i].distance + " mile away";
            }else{
                dist[i].innerHTML = limitedArray[i].distance + " miles away";
            }
        })
} dataInitalize(startResults, endResults);




// For floating button logic to toggle map and list view
var showingMap = false;
document.addEventListener('DOMContentLoaded', function () {
    var mapToggles = document.getElementsByClassName("mapListToggle");
    for( let i = 0; i < mapToggles.length; i++){
        mapToggles[i].addEventListener("click", mobileToggle);
    }
});


function mobileToggle(){
    let results = document.getElementById('leftColumn');
    let map = document.getElementById('map');
    let container = document.getElementById('row');
    

    if(showingMap){
        map.style.cssText = "display: none;"
        results.style.cssText = 'display: inherit;'
        container.style.cssText = 'flex-direction: column;'
        showingMap = false;
    }else{
        results.style.cssText = "display: none;"
        map.style.cssText = "display: inherit;"
        container.style.cssText = 'flex-direction: column-reverse;'
        showingMap = true;
    }
     
}


// Reset inline styles greater than tablet
window.addEventListener('resize', reportWindowSize);
function reportWindowSize(){
    if(window.innerWidth > 768){
        document.getElementById('leftColumn').removeAttribute('style');
        document.getElementById('map').removeAttribute('style');
        document.getElementById('row').removeAttribute('style');
    }else{
        
    }
}



// Alert when clicking edit search
document.getElementById('editSearch').addEventListener('click', () => alert("You successfully edited the search. You may continue with the test."));
document.querySelectorAll('#searchHead a').forEach((x,i) => x.addEventListener('click', () => alert("You successfully edited the search. You may continue with the test.")))







// Shrinks search header at scroll position 100
function scrollFunction() {
    if (window.scrollY < 100 && window.innerWidth > 768) {
        document.getElementById('searchHead').style.cssText = "font-size: 28px; white-space: normal; padding-top: 10;";
        document.getElementById('searchFiltersHead').style.cssText = "flex-direction: column;";
        document.getElementById('editSearch').style.cssText = "margin-left: 0;";
        document.querySelectorAll('#filter .option').forEach(e => {
            e.style.cssText = "font-size: 14px"
        })
        document.querySelectorAll('#chips .chip').forEach(e => {
            e.style.cssText = "font-size: 14px"
        })
    } else if(window.scrollY > 100 && window.innerWidth > 768) {
        document.getElementById('searchHead').style.cssText = "font-size: 18px; white-space: normal; width: auto;";
        document.getElementById('searchFiltersHead').style.cssText = "flex-direction: row-reverse; justify-content: flex-end; align-items: baseline; padding-top: 0;";
        document.getElementById('editSearch').style.cssText = "margin-left: 18px;";
        document.querySelectorAll('#filter .option').forEach(e => {
            e.style.cssText = "font-size: 12px"
        })
        document.querySelectorAll('#chips .chip').forEach(e => {
            e.style.cssText = "font-size: 12px"
        })
    }


   
} window.onscroll = function() {scrollFunction()};


function filterScroll(){
    // let moreLeft = document.querySelector("#filter .option.More").getBoundingClientRect().left;
    // let moreTop = document.querySelector("#filter .option.More").getBoundingClientRect().top;

    // document.getElementById("moreMenu").style.cssText="top: " + moreTop +"; left:"+moreLeft+";"
    const moreMenu = document.getElementById("moreMenu")
    const filters = document.getElementById("filter")

    moreMenu.style.cssText = "";

    if((moreMenu.offsetLeft + moreMenu.offsetWidth - 10) >= filters.offsetWidth){
        moreMenu.style.cssText="right: 0;";
        // console.log("stick to right")
    }
    
}
document.getElementById('filter').onscroll = () => filterScroll()




function clickMore(){
    const moreMenu = document.getElementById("moreMenu")
    const arrow = document.getElementsByClassName('arrow-up')[0];
    const filters = document.getElementById("filter")




        moreMenu.classList.toggle("hidden")
        window.getComputedStyle(arrow).visibility == 'hidden' ? arrow.style.cssText="visibility: visible" : arrow.style.cssText="visibility: hidden"
        
 
   

    moreMenu.style.cssText = "";

    if((moreMenu.offsetLeft + moreMenu.offsetWidth - 10) >= filters.offsetWidth){
        moreMenu.style.cssText="right: 0;";
        // console.log("stick to right")
    }
    
}document.querySelector("#filter .option.More").addEventListener("click", () => clickMore())



// For Clear All filter chip
function clearAllFilters(){
    activeFilters = [];
    dataInitalize(0, 20)
    managePaginationLength();
    document.querySelectorAll('#filter .option').forEach((e) => {
        e.classList.remove("active")
    })

    document.getElementById("moreMenu").classList.add("hidden");
    document.getElementsByClassName('arrow-up')[0].style.cssText="visibility: hidden;";


    document.querySelectorAll('#filter .option .container').forEach((e) => {
        e.classList.remove("active")
    })

    document.getElementById("chips").innerHTML = ''
    document.getElementById('map').style.cssText = 'top: 150px;  height: calc(100vh - 150px);'

    fakeLoading(800);


}


function languageRender(...langs){
    let validList = document.getElementById("validLanguages");
    let invalidList = document.getElementById("invalidLanguages");
    let invalidListHidden = document.getElementById('invalidLanguagesHidden')

    let langArr = languages

    var index;
        for (var i=0; i<langs.length; i++) {
            index = langArr.indexOf(langs[i]);
            if (index > -1) {
                langArr.splice(index, 1);
            }
        }

    validList.innerHTML = '';
    invalidList.innerHTML = '';



    for(let i = 0; i < langs.length; i++){
        // if (i == 0){
        // validList.innerHTML += `<label class="control control-radio">${langs[i]}<input type="radio" name="radio" checked="checked" name="group2" value="option2"/><div class="control_indicator"></div></label>`
        // }else{
        //   validList.innerHTML+= `<label class="control control-radio">${langs[i]}<input type="radio" name="radio" name="group2" value="option2"/><div class="control_indicator"></div></label>`
        // }
        validList.innerHTML+= `<label class="control control-radio">${langs[i]}<input type="radio" name="radio" name="group2" value="option2"/><div class="control_indicator"></div></label>`
    }

    for(let i = 0; i < langArr.length; i++){
        if(i < 5){
            invalidList.innerHTML += `<label class="control control-radio disabled">
            ${langArr[i]}
                    <input type="radio" name="radio" name="group2" value="option2" disabled/>
                <div class="control_indicator"></div>
            </label>`
        }else{
            invalidListHidden.innerHTML += `<label class="control control-radio disabled">
            ${langArr[i]}
                    <input type="radio" name="radio" name="group2" value="option2" disabled/>
                <div class="control_indicator"></div>
            </label>`
        }
    }

    document.querySelector("#languageMore form").innerHTML+='<Button type="button" id="langButton" style="flex: 1; border: 2px solid #AF4591; border-radius: 4px; width: 100%; height: 40px; font-size: 14px; color: #AF4591; font-weight: 600; background-color: transparent; cursor: pointer;">View More Languages</Button>'

  
    
}


function showAllLanguages() {
    let button = document.getElementById("langButton");
    let hiddenList = document.getElementById('invalidLanguagesHidden');
    hiddenList.classList.toggle("hidden");   
    if(hiddenList.classList.contains("hidden")){
        button.innerText = "View More Languages"
    }else{
        button.innerText = "View Less Languages"
    } 
}document.getElementById("langButton").addEventListener("click", () => showAllLanguages());




function hospitalRender(...hosp){
    let validList = document.getElementById("validHospitals");
    let invalidList = document.getElementById("invalidHospitals");
    let invalidListHidden = document.getElementById('invalidHospitalsHidden')

    let hospArr = hospitals;

    

    var index;
        for (var i=0; i<hosp.length; i++) {
            index = hospArr.indexOf(hosp[i]);
            if (index > -1) {
                hospArr.splice(index, 1);
            }
        }
       

    validList.innerHTML = '';
    invalidList.innerHTML = '';
  

    for(let i = 0; i < hosp.length; i++){
        // if (i == 0){
        // validList.innerHTML += `<label class="control control-radio">${hosp[i]}<input type="radio" name="radio" checked="checked" name="group2" value="option2"/><div class="control_indicator"></div></label>`
        // }else{
        //   validList.innerHTML+= `<label class="control control-radio">${hosp[i]}<input type="radio" name="radio" name="group2" value="option2"/><div class="control_indicator"></div></label>`
        // }
        validList.innerHTML+= `<label class="control control-radio">${hosp[i]}<input type="radio" name="radio" name="group2" value="option2"/><div class="control_indicator"></div></label>`
    }

    for(let i = 0; i < hospArr.length; i++){
        if(i < 5){
            invalidList.innerHTML += `<label class="control control-radio disabled">
            ${hospArr[i]}
                    <input type="radio" name="radio" name="group2" value="option2" disabled/>
                <div class="control_indicator"></div>
            </label>`
        }else{
            invalidListHidden.innerHTML += `<label class="control control-radio disabled">
            ${hospArr[i]}
                    <input type="radio" name="radio" name="group2" value="option2" disabled/>
                <div class="control_indicator"></div>
            </label>`
        }
    }

    document.querySelector("#hospitalMore form").innerHTML+='<Button type="button" id="hospButton" style="flex: 1; border: 2px solid #AF4591; border-radius: 4px; width: 100%; height: 40px; font-size: 14px; color: #AF4591; font-weight: 600; background-color: transparent; cursor: pointer;">View More Hospitals</Button>'

  
    
}

function showAllHospitals() {
    let button = document.getElementById("hospButton");
    let hiddenList = document.getElementById('invalidHospitalsHidden');
    hiddenList.classList.toggle("hidden");   
    if(hiddenList.classList.contains("hidden")){
        button.innerText = "View More Hospitals"
    }else{
        button.innerText = "View Less Hospitals"
    } 
}document.getElementById("hospButton").addEventListener("click", () => showAllHospitals());






function windowResize(){
    const moreMenu = document.getElementById("moreMenu")
    const filters = document.getElementById("filter")

 
   

    moreMenu.style.cssText = "";

    if((moreMenu.offsetLeft + moreMenu.offsetWidth - 10) >= filters.offsetWidth){
        moreMenu.style.cssText="right: 0;";
    }

}window.addEventListener("resize", () => windowResize());





// For clicking on  the 'X' of the chip. E is the "X" that is clicked
// and e.parentNode is the entire chip
function closeChip(e){
    // console.log(e.parentNode)
    // console.log(e)

    e.parentNode.classList.add('hidden')

    document.querySelector("#filter .option."+e.parentNode.innerText.split(" ").toString()).classList.remove("active")
    document.querySelector("#filter .option." + e.parentNode.innerText.split(" ")[0].toString() + " .container").classList.remove("active");

    fakeLoading(800);

    if(e.parentNode.classList.contains("More")){
        document.getElementById("moreMenu").classList.add("hidden");
        document.getElementsByClassName('arrow-up')[0].style.cssText="visibility: hidden;";
    }

    let splicePoint = activeFilters.findIndex((x) => x == e.parentNode.innerText);
    activeFilters.splice(splicePoint, 1);

    if(activeFilters.includes("Accepting New Patients")){
        dataInitalize(0, 20, true)
        managePaginationLength();
    }else{
        dataInitalize(0, 20)
        managePaginationLength();
    }



    if(activeFilters.length == 0){
        document.getElementById('map').style.cssText = 'top: 150px;  height: calc(100vh - 150px);'
        document.getElementById("chips").innerHTML = ''
    }else{
        document.getElementById('map').style.cssText = 'top: 180px;  height: calc(100vh - 180px);'
    }

}




// Activates and hides filter settings
function clickFilter(e){
    // console.log(e.classList.contains('active'))
    e.querySelector('.container').classList.toggle('active')
    e.classList.toggle('active');
    

    // console.log(e.classList.contains('More'))
    
    if(!activeFilters.includes(e.querySelector('.container p').innerText) && !e.classList.contains('More')){
        activeFilters.push(e.querySelector('.container p').innerText);
        fakeLoading(800);
    }else{
        if(!e.classList.contains('More')){
            let splicePoint = activeFilters.findIndex((x) => x == e.querySelector('.container p').innerText)
            activeFilters.splice(splicePoint, 1);
            fakeLoading(800);
        }
    }

    if(activeFilters.length == 0){
        document.getElementById('map').style.cssText = 'top: 150px;  height: calc(100vh - 150px);'
    }else{
        document.getElementById('map').style.cssText = 'top: 180px;  height: calc(100vh - 180px);'
    }


    // Check for ANP
    if(activeFilters.includes("Accepting New Patients")){
        dataInitalize(0, 20, true)
        managePaginationLength();
    }else{
        dataInitalize(0, 20)
        managePaginationLength();
    }

    // console.log(activeFilters);
    document.getElementById("chips").innerHTML = '';
    for(let i = 0; i < activeFilters.length; i++){
        document.getElementById("chips").innerHTML += '<div class="chip ' + activeFilters[i].split(" ")[0].toString() + '"><p>' + activeFilters[i] + '</p><a href="#searchFilters" onClick="closeChip(this)" class="close" style="padding: 8px;"><i class="fa fa-close" aria-hidden="true"></i></a></div>';
    }
    if(activeFilters.length !== 0){
        document.getElementById("chips").innerHTML += '<a href="#searchFilters" onClick="clearAllFilters()" class="chip Clear"><p>Clear All</p></a>'
    }else{
        document.getElementById("chips").innerHTML = ''
    }  
    
}



// Call this function to fix pagination length when changing data
function managePaginationLength(){
    document.getElementById("nums").innerHTML = "";
    startResults = 0;
    endResults = 20;
    let length = Math.ceil(limitedFullArray.length/20);

    for(let i = 0; i < length; i++){
        if(i == 0){
            document.getElementById("nums").innerHTML += '<a onClick="clickFunction(this)" href="#searchFilters"><h5 class="navLink 1 active">1</h5></a>'
        }else{
            document.getElementById("nums").innerHTML += '<a onClick="clickFunction(this)" href="#searchFilters"><h5 class="navLink ' + parseInt(i+1) + '">' + parseInt(i+1) + '</h5></a>'
        }
       
    }

    let navArrows = document.getElementsByClassName('nav');
    navArrows[0].classList.add('disabled')
    navArrows[1].classList.remove('disabled')
}




// Pagination click function
function clickFunction(element){
    var allNums = document.getElementsByClassName('navLink');
    var t = element.getElementsByTagName('h5');
    var target = t[0];

    navArrows = document.getElementsByClassName('nav');
    // this.classList.add("active");
    

    if(element.classList.contains('nav') && element.classList.contains('disabled')){
        
    }else if(element.classList.contains('navNext')){
        navArrows[0].classList.remove('disabled');
        // shuffle(myJson);
        // dataInitalize();


        

        for( var i = 0; i < allNums.length; i++){
            if(allNums[i].classList.contains('active')){
                startResults += 20;
                endResults += 20;
                // console.log(startResults + " " + endResults)
                activeFilters.includes("Accepting New Patients") ? dataInitalize(startResults, endResults, true) : dataInitalize(startResults, endResults);
                allNums[i].classList.remove('active');
                allNums[i+1].classList.add('active');
                break;
            }
        }
      
        if(allNums[allNums.length-1].classList.contains('active')){
            navArrows[1].classList.add('disabled')
            navArrows[0].classList.remove('disabled')
        }else{
            navArrows[1].classList.remove('disabled')
        }
        
    }else if(element.classList.contains('navPrev')){
        navArrows[1].classList.remove('disabled');
        // shuffle(myJson);
        // dataInitalize();

        for( var i = 0; i < allNums.length; i++){
            if(allNums[i].classList.contains('active')){
                startResults -= 20;
                endResults -= 20;
                // console.log(startResults + " " + endResults)
                activeFilters.includes("Accepting New Patients") ? dataInitalize(startResults, endResults, true) : dataInitalize(startResults, endResults);
                allNums[i].classList.remove('active');
                allNums[i-1].classList.add('active');
                break;
                
            }
        }
        if(allNums[0].classList.contains('active')){
            navArrows[0].classList.add('disabled')
            navArrows[1].classList.remove('disabled')
        }else{
            navArrows[0].classList.remove('disabled')
        }
        
    }else{
        if(target.classList.contains('active')){
           
        }else{
            // shuffle(myJson);
            // dataInitalize();
            for( var i = 0; i < allNums.length; i++){
                allNums[i].classList.remove('active');
            }

            target.classList.add('active');


            if(target == allNums[0]){
                startResults = 0;
                endResults = 20;
                // console.log(startResults + " " + endResults)
                activeFilters.includes("Accepting New Patients") ? dataInitalize(startResults, endResults, true) : dataInitalize(startResults, endResults);
                navArrows[0].classList.add('disabled')
                navArrows[1].classList.remove('disabled')
            }else if(target == allNums[allNums.length - 1]){
                startResults = (allNums.length - 1) * 20;
                endResults = limitedFullArray.length;
                // console.log(startResults + " " + endResults)
                activeFilters.includes("Accepting New Patients") ? dataInitalize(startResults, endResults, true) : dataInitalize(startResults, endResults);
                navArrows[0].classList.remove('disabled')
                navArrows[1].classList.add('disabled')
            }else{
                for(var i = 0; i < navArrows.length; i++){
                    navArrows[i].classList.remove('disabled')
                }

                startResults = (parseInt(target.innerText)-1) * 20
                endResults = (parseInt(target.innerText)-1) * 20 + 20
                // console.log(startResults + " " + endResults)
                activeFilters.includes("Accepting New Patients") ? dataInitalize(startResults, endResults, true) : dataInitalize(startResults, endResults);
            
               
                
            }
            
        }
    }
    
}