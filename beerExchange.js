var numOfPeople = 8;
var people = [];
var iterations = 0;

function Person(id) {
    this.id = id;
    this.recieved = null;
    this.gaveTo = null;
}

function doBeerExchange(){
    // Reset/get starting conditions
    iterations = 0;
    numOfPeople = document.getElementById("numOfPeople").value;

    // Validate we have enough people
    if (numOfPeople < 3){
        alert("Not enough people for the exchange!");
    }
    else {
        // Do a beer exchange until a valid solution is found
        do {
            beerExchange();
            iterations++;
        } while(exchangeInvalid());
        // Show the results
        fillTable();
    }
}

function beerExchange(){
    // Create the people
    people = [];
    for (var i=1; i<=numOfPeople; i++){
        var person = new Person(i);
        people.push(person);
    }
    // For each person, give someone else a beer
    _.each(people, function(p){
        // Find someone who hasn't recieved yet, and isn't p, if empty set to p (will make the exchange invalid)
        var validGiftees = _.reject(people, function(r){
            return (r.recieved == p.id || r.recieved != null) || r.id == p.id;
        });
        validGiftees = (validGiftees.length) ? validGiftees : [p];
        var giveTo = _.sample(validGiftees);
        // Make the swap
        p.gaveTo = giveTo.id;
        giveTo.recieved = p.id;
    });
}

// Check that everyone hasn't given/recieved from the same person, and has gotten and given a beer
function exchangeInvalid(){
    var valid = _.every(people, function(p){ return (p.gaveTo != p.recieved) && (p.gaveTo != null) && (p.recieved != null); });
    return !valid;
}

function fillTable(){
    var it = document.getElementById('iterations');
    it.innerHTML = "Iterations: " + iterations;

    // Setup the table
    var table = document.getElementById('results');
    table.innerHTML = "";
    var head = table.insertRow(0);
    var headPerson = head.insertCell(0);
    headPerson.innerHTML = "Person";
    var headGives = head.insertCell(1);
    headGives.innerHTML = "Gives to";
    var headRecieves = head.insertCell(2);
    headRecieves.innerHTML = "Recieves from";

    // Fill table with results
    _.each(people, function(p){
        var row = table.insertRow(-1);
        var person = row.insertCell(0);
        person.innerHTML = p.id;
        var gives = row.insertCell(1);
        gives.innerHTML = p.gaveTo;
        var recieves = row.insertCell(2);
        recieves.innerHTML = p.recieved;
    });
}