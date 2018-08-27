function reloadHome(){
    location.reload();
}

function stopVideo() {
    setTimeout(function(){
        $("#dogVideo").css("animation", "1s fadeOut forwards")
        $('.picturesWrap').css("animation", "1s picturesShow forwards")
    }, 2000)
    setTimeout(function(){
        $("#dogVideo").hide()
    }, 3000)

}

function alertZip() {
    $(".alertZip").show()
    $(".alertZip").css("animation", "1s fadeIn forwards")
}

function hideZip() {
    $(".alertZip").css("animation", "1s fadeOut forwards")
    $(".alertZip").hide()
}

function enterSite() {
    if ($("#location-input").val().length === 5) {
        $(".container1").css("animation", "1s modalFade forwards")
        var enter = setTimeout(function(){$(".container1").hide()}, 1000)
        stopVideo()
    } else {
        alertZip()
    }
}

$(document).on("click", "#submit", function() {
    enterSite()
})


$(document).on("click", ".alertZip", function() {
    hideZip()
})


function hidePictures() {
    $(".picturesWrap").css("animation", "1s picturesHide forwards")
}

function showInfo() {
    $(".petInfo").css("animation", "1s infoShow forwards");
}

function showPictures() {
    $(".picturesWrap").css("animation", "1s picturesShow forwards")
}

function hideInfo() {
    $(".petInfo").css("animation", "1s infoHide forwards");
}

$(document).on("click", ".thumbnail", function() {
    hidePictures()
    showInfo()
})

$(document).on("click", "#backToSearch", function() {
    hideInfo()
    showPictures()
})

$(document).on("click", ".adjustSearch", function() {
    hidePictures()
    reloadHome()
})

