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

function radomChangeColor() {
    var color = ["purple lighten-3", "light-blue lighten-2", "cyan lighten-2", "teal lighten-3", "green lighten-2", "orange lighten-3", "deep-orange lighten-3"];
    var num = Math.floor(Math.random() * color.length);
    console.log(color[num]);
    $('#headerWithBG').addClass(color[num]);
}

var motions = {
    init: function() {
        var _self = this;
        
        this.iframeInit()
        this.loadInitData();
        this.runScript();
    },
    htmlArea: null,
    cssArea: null,
    jsArea: null,
    asyncLoadScript: function(src) {
        var script = document.createElement('script'); //创建script标签
        script.type = "text/javascript";
        script.src = src;
        $("#code-iframe").contents().find('head').append(script)
    },
    iframeInit:function(){
        var iframe = document.createElement("iframe"),
            _self = this;
        iframe.src = "../motionDemo/example1/index.html";
        iframe.id = "code-iframe"
        iframe.name = 'codeIframe'

        // if (iframe.attachEvent) {
        //     iframe.attachEvent("onload", function() {
        //         _self.asyncLoadScript('../../js/motion.js')
        //     });
        // } else {
        //     iframe.onload = function() {
        //         _self.asyncLoadScript('../../js/motion.js')
        //     };
        // }

        $('.code-run').append(iframe)
    },
    htmlInit: function(data) {
        $('#copyHtml').html(data['tpl-html']);
        this.htmlArea = CodeMirror.fromTextArea($('#copyHtml')[0], {
            lineNumbers: true,
            mode: "text/html",
            theme: "dracula"
        });
    },
    cssInit: function(data) {
        $('#copyCss').html(data['tpl-css']);
        this.cssArea = CodeMirror.fromTextArea($('#copyCss')[0], {
            lineNumbers: true,
            mode: "text/css",
            theme: "dracula"
        });
    },
    jsInit: function(data) {
        $('#copyJs').html(data['tpl-js']);
        this.jsArea = CodeMirror.fromTextArea($('#copyJs')[0], {
            lineNumbers: true,
            mode: "javascript",
            theme: "dracula"
        });
    },
    getTplData: function(data) {
        var obj = {};
        for (var i = 0; i < $(data).length; i++) {
            if ($(data)[i].nodeName !== '#text') {
                obj[$(data)[i].id] = $($(data)[i]).html()
            }
        }

        return obj;
    },
    loadInitData: function() {
        var htmlobj = $.ajax({ url: "../motionDemo/example1/tpl.html", async: false });
        var data = this.getTplData(htmlobj.responseText);

        if (data) {
            this.htmlInit(data);
            this.cssInit(data);
            this.jsInit(data);
        }
    },
    runScript: function() {
        var _self = this
        $('.js-run').on('click', function() {
            // $('#code-iframe').contents().find('#runjs').html(_self.jsArea.getValue())
            document.getElementById("code-iframe").contentWindow
                .postMessage(
                    _self.jsArea.getValue(),
                    window.location.origin);
        })
    }
}

motions.init()