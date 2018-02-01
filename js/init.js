function goBack() {
    window.history.back();
}

$(document).ready(function() {
    $('.scrollspy').scrollSpy();
    $('.collapsible').collapsible();
    $('.modal').modal({
        endingTop: '6%'
    });
});

