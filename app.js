var petApiKey = "8daa9fc85d6b47e46552a02497bbdfb8";
var mapApiKey = "AIzaSyATvFSKs1YEJMLy6w9qAIXKWgzoteNXrmg";

var config = {
    apiKey: "AIzaSyAl_UE81tOfcyfc6tEx7vFQd8hlU22JEpo",
    authDomain: "pet-package.firebaseapp.com",
    databaseURL: "https://pet-package.firebaseio.com",
    projectId: "pet-package",
    storageBucket: "pet-package.appspot.com",
    messagingSenderId: "164600393958"
  };

firebase.initializeApp(config);

var database = firebase.database();
var animalType;
var address;

$(document).on("click", "#submit", function(event){
    event.preventDefault();
    
    var zip = $("#location-input").val();
    var animalType = $("#animal-input").val();
    var size = $("#size-input").val();
    var age = $("#age-input").val();
    var sex = $("#sex-input").val();

    console.log(zip)
    console.log(animalType)
    console.log(size)
    console.log(age)
    console.log(sex)

    var userQuery = "https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=" + petApiKey + "&animal=" + animalType + "&age=" + age + "&location=" + zip + "&size=" + size + "&sex=" + sex + "&count=25&output=full&format=json";
    
    $.ajax({
        url: userQuery,
        method: "GET"
    }).then(function(response) {
        
        console.log(response)

        var shortenedObj = response.petfinder.pets.pet;
        var nameArr = [];
        var zipArr = [];
        var imgArr = [];
        var breedArr = [];
        var phoneArr = [];
        var streetAddr = [];

        for (var i = 0; i < shortenedObj.length; i++) {
            if (shortenedObj[i].contact.address1.$t && shortenedObj[i].media.photos) {
                
                nameArr.push(shortenedObj[i].name.$t);
                zipArr.push(shortenedObj[i].contact.city.$t + " " + shortenedObj[i].contact.zip.$t);
                imgArr.push(shortenedObj[i].media.photos.photo[2].$t);
                streetAddr.push(shortenedObj[i].contact.address1.$t);
                
                if(shortenedObj[i].breeds.breed.$t) {
                    breedArr.push(shortenedObj[i].breeds.breed.$t);
                }
                else {
                    breedArr.push(shortenedObj[i].breeds.breed[0].$t);
                }
                
                if (shortenedObj[i].contact.phone.$t) {
                    phoneArr.push(shortenedObj[i].contact.phone.$t)
                }
                else {
                    phoneArr.push("Information Not Given");
                }
        
            }
        }    

        for (var i = 0; i < 12; i++){
            var thumbnail = $("<div>");
            thumbnail.addClass("thumbnail");
            thumbnail.attr("id", i);
            var petName = $("<h4>").text(nameArr[i]);
            thumbnail.attr("name", nameArr[i]);
            var breedType = $("<p>").text(breedArr[i]);
            thumbnail.attr("breed", breedArr[i]);
            thumbnail.attr("data-location", streetAddr[i]);
            thumbnail.attr("data-zip", zipArr[i]);
            var phoneNum = $("<p>").text(phoneArr[i]);
            thumbnail.attr("number", phoneArr[i]);
            var image = $("<img>").attr("src", imgArr[i]);
            thumbnail.attr("data-image", imgArr[i]);
            thumbnail.append(image, petName);
            $(".picturesWrap").append(thumbnail);
        }

        var searchButton = $("<div>")
        searchButton.text("adjust parameters")
        searchButton.addClass("adjustSearch")
        $(".picturesWrap").append(searchButton);

        database.ref().push({
            
            //Storing search params
            Type: animalType,
            age: age,
            size: size,
            sex: sex,
            zip: zip,
            picture: image,

            //Storing petfinder API return data
            name: nameArr,
            zipCode: zipArr,
            images: imgArr,
            phoneNum: phoneArr 
        })
    })
})

$(document).on("click", ".thumbnail", function(event){
   event.preventDefault();
    var parsedAddress = $(this).attr("data-location").replace(/\./g,'');

    if(parsedAddress.includes("PO Box" || "POBox")){
        address = $(this).attr("data-zip");
    }
    else{
        address = $(this).attr("data-location") + " " + $(this).attr("data-zip");
    }

   var queryURL = "https://www.google.com/maps/embed/v1/search?q=" + address + "&key=" + mapApiKey;
   
   $("#google-map").attr("src", queryURL);
   $("#mapPicture").attr("src", $(this).attr("data-image"))
   $("#mapName").text("Name: " + $(this).attr("name"));
   $("#mapBreed").text($(this).attr("breed"));
   $("#mapNumber").text($(this).attr("number"));
});

$(document).on("click", "#mapVets", function(event){
    event.preventDefault();

    var vets = "Veterinarians Near " + address;

    var queryURL = "https://www.google.com/maps/embed/v1/search?q=" + vets + "&key=" + mapApiKey;
    $("#google-map").attr("src", queryURL);
});

$(document).on("click", "#mapParks", function(event){
    event.preventDefault();

    var parks = "Dog Parks Near " + address;

    var queryURL = "https://www.google.com/maps/embed/v1/search?q=" + parks + "&key=" + mapApiKey;
    $("#google-map").attr("src", queryURL);
});

$(document).on("click", "#mapStores", function(event){
    event.preventDefault();

    var stores = "Pet Stores Near " + address;

    var queryURL = "https://www.google.com/maps/embed/v1/search?q=" + stores + "&key=" + mapApiKey;
    $("#google-map").attr("src", queryURL);
});