let data = null;
let popCard = document.getElementById('pop-up-card');
let but = document.getElementById('but');
let mainBody = document.getElementById('main-body');
let cardsList = document.getElementById('cards-list');
let filterBox = document.getElementById('filterBox');
let filterDes = document.getElementById('destination');
let filterDat = document.getElementById('date');

function popUp() {
    let cardsList = document.getElementById('cards-list');
    cardsList.classList.toggle('d-none');
    popCard.classList.toggle('d-none');
    if(but.textContent=="Add a Ride"){
        but.textContent="Back";
    }else{
        but.textContent="Add a Ride";
    }
}

function createRequest(data) {
    let cardsList = document.getElementById('cards-list');
    let h1 = document.createElement('h1');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    let card = document.createElement('div');
    card.classList.add('card');
    h1.classList.add('h2');
    h1.textContent = data.name;
    console.log(data.name);
    p1.textContent = data.destination;
    p2.textContent = `On ${data.date} at ${data.time}`;
    p3.textContent = data.hostel;
    p4.textContent = data.mobileNumber;
    card.appendChild(h1);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(p4);
    cardsList.appendChild(card);
}

function filterDisplay(){
    filterBox.classList.toggle('d-none');
    document.getElementById('but').classList.toggle('d-none');
}

function filterFunction(){
    let cardsList = document.getElementById('cards-list');
    mainBody.removeChild(cardsList);
    let cL = document.createElement('div');
    cL.classList.add('cards-list');
    cL.id='cards-list';
    mainBody.appendChild(cL);
    a(false ,filterDes.value ,filterDat.value );
    filterDisplay();
}


let a = async (k=true,des,dat) => {
    if(k){
        await fetch("https://krish-2512.github.io/cc-api/cc-api.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            data = jsonData.data;
        });
    }
    console.log(data);
    function addRequest1(){
        let newData = {
            name:document.getElementById('Name').value,
            destination:document.getElementById('Destination').value,
            hostel:document.getElementById('Hostel').value,
            mobileNumber:document.getElementById('Mn').value,
            date:document.getElementById('Date').value,
            time:document.getElementById('Time').value
        }
        // createRequest(newData);
        data.push(newData);
        document.getElementById('Name').value="";
        document.getElementById('Destination').value="";
        document.getElementById('Hostel').value='';
        document.getElementById('Mn').value='';
        document.getElementById('Date').value='';
        document.getElementById('Time').value='';
        let cardsList = document.getElementById('cards-list');
        cardsList.classList.add('d-none');
    }
    if(document.getElementById('Name').value!=""){
        addRequest1();
    }
    for (let b of data) {
        if(k){
            createRequest(b);
        }else{
            if(des=="" && dat!=""){
                if(b.date==dat){
                    createRequest(b);
                }
            }else if(dat=="" && des!=""){
                if(b.destination==des){
                    createRequest(b);
                }
            }else if(dat!="" && des!=""){
                if(b.date==dat && b.destination==des){
                    createRequest(b);
                }
            }else{
                createRequest(b);
            }
        }
    }
};
a();
function addRequest(){
    let cardsList = document.getElementById('cards-list');
    mainBody.removeChild(cardsList);
    let cL = document.createElement('div');
    cL.classList.add('cards-list');
    cL.id='cards-list';
    mainBody.appendChild(cL);
    a(true);
}