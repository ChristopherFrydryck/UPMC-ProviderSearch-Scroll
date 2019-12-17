// Initally shuffle json data for cards
shuffle(myJson);


function dataRandomize() {
    Array.from(document.getElementsByClassName('distance')).forEach((v, i)  => {
        if(myJson[i].distance == '1'){
            v.innerHTML = myJson[i].distance + " mile away";
        }else{
            v.innerHTML = myJson[i].distance + " miles away";
        }
    })
    Array.from(document.getElementsByClassName('name')).forEach((v, i)  => {
        v.innerHTML = myJson[i].name + ", MD"
    })
    Array.from(document.querySelectorAll('address')).forEach((v, i)  => {
        v.innerHTML = myJson[i].address;
    })
    Array.from(document.querySelectorAll('phone')).forEach((v, i)  => {
        v.innerHTML = myJson[i].phone;
    })
    Array.from(document.querySelectorAll('.letter')).forEach((v, i) => {
        v.innerHTML = String.fromCharCode(97 + i).toUpperCase();
    })
    Array.from(document.querySelectorAll('.rightColumn h4')).forEach((v, i)  => {
        v.innerHTML = myJson[i].practice;
    })
} dataRandomize();



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
    }
}








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


// Activates and hides filter settings
function clickFilter(e){
    console.log(e.classList.contains('active'))
    e.querySelector('.container').classList.toggle('active')
    e.classList.toggle('active');
    // if (e.classList.contains('option') && e.classList.contains('time')){
    //     // alert("clicked time!")
    //     e.querySelector('.container').classList.toggle('active')
    //     e.classList.toggle('active');
        
    // }else if (e.classList.contains('option') && e.classList.contains('hospital')){
    //     // alert("clicked hospital!")
    // }else if (e.classList.contains('option') && e.classList.contains('patients')){
    //     // alert("clicked patients!")
    // }else if (e.classList.contains('option') && e.classList.contains('handicap')){
    //     // alert("clicked handicap!")
    // }else if (e.classList.contains('option') && e.classList.contains('network')){
    //     // alert("clicked network!")
    // }
}

// Shuffle function to randomize the order
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
        shuffle(myJson);
        dataRandomize();


        

        for( var i = 0; i < allNums.length; i++){
            if(allNums[i].classList.contains('active')){
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
        shuffle(myJson);
        dataRandomize();

        for( var i = 0; i < allNums.length; i++){
            if(allNums[i].classList.contains('active')){
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
            shuffle(myJson);
            dataRandomize();
            for( var i = 0; i < allNums.length; i++){
                allNums[i].classList.remove('active');
            }

            target.classList.add('active');

            if(target == allNums[0]){
                navArrows[0].classList.add('disabled')
                navArrows[1].classList.remove('disabled')
            }else if(target == allNums[allNums.length - 1]){
                navArrows[0].classList.remove('disabled')
                navArrows[1].classList.add('disabled')
            }else{
                for(var i = 0; i < navArrows.length; i++){
                    navArrows[i].classList.remove('disabled')
                }
            }
            
        }
    }
}