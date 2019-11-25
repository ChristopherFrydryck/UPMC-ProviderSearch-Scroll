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
    Array.from(document.querySelectorAll('.rightColumn h4')).forEach((v, i)  => {
        v.innerHTML = myJson[i].practice;
    })
} dataRandomize();


// Shrinks search header at scroll position 100
function scrollFunction() {
    if (window.scrollY < 100) {
        document.getElementById('searchFiltersHead').style.cssText = "font-size: 24px;";
    } else if(window.scrollY > 100) {
        document.getElementById('searchFiltersHead').style.cssText = "font-size: 18px;";
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