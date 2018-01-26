function goBack() {
    window.history.back();
}

$(document).ready(function(){
    $('.scrollspy').scrollSpy();
    $('.collapsible').collapsible();
    $('.modal').modal({
        endingTop: '6%'
    });
});
function radomChangeColor() {
    var color = ["purple lighten-3","light-blue lighten-2","cyan lighten-2","teal lighten-3","green lighten-2","orange lighten-3","deep-orange lighten-3"];
    var num = Math.floor(Math.random() * color.length);
    console.log(color[num]);
    $('#headerWithBG').addClass(color[num]);
}

