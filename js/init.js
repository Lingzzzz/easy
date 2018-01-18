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
    var color = ["yellow darken-2", "deep-orange lighten-1", "orange", "green accent-4", "light-green darken-3", "teal accent-4",
        "cyan accent-4", "light-blue accent-3", "cyan darken-3", "teal darken-1", "light-blue", "blue darken-1", "pink lighten-2", "purple lighten-3",
        "red lighten-3", "red accent-2"
    ];
    var num = Math.floor(Math.random() * color.length);
    console.log(color[num]);
    $('#iconfontHeaderBG').addClass(color[num]);
}

