
//templateFilter
template.defaults.imports.textareaFormat = function(val) {
    var reg = new RegExp("<br/>", "g");
    return val.replace(reg, "\n");
};

var page = {
    init: function() {
        this.loadPageData();
        this.removePage();
        this.restorePage();
        this.exportFile();
    },
    pageData: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {},
    loadPageData: function() {
        var _self = this;
        if (localStorage.getItem('data')) {
            this.renderPage(_self.pageData);
            _self.getRemoveData();

        } else {
            $.getJSON('../standard/config/ui01.json', function(data) {
                //本地存储数据
                localStorage.clear();
                localStorage.setItem('data', JSON.stringify(data));
                _self.pageData = data;

                //页面模版渲染
                _self.renderPage(data);

            }); 
        }
    },
    renderPage: function(data) {
        var menuHtml = template("leftMenu-tpl",data);
        var html = template("standardPages-tpl", data);
        $('.standard-container').html(html);
        $('.left-menu').html(menuHtml);
        $('.collapsible').collapsible();
        $('.scrollspy').scrollSpy();
        
    },
    savePageData: function() {
        $('[data-modal]').each(function() {
            page.formatModel($(this).attr('data-modal'), $(this).val().replace(/\n|\r\n/g, "<br/>"));
        })
        localStorage.setItem('data', JSON.stringify(this.pageData));
        window.open("./ui01-generate.html",'_self');

        //todo:数据提交到服务端
        //pageData user->templateid->pageData;
    },
    removePage: function() { //删除页面操作
        var _self = this;
        $(document).on('click', '.j-rmpage', function() {
            var parent = $(this).parents('.section');

            _self.pageOpration(parent.attr('id'), false);
        })
    },
    restorePage: function() { //恢复页面操作
        var _self = this;
        $(document).on('click', '.j-restore', function() {
            var pageid = $(this).data('pageid');
            _self.pageOpration(pageid, true);
        })
    },
    pageOpration: function(id, key) { //对页面进行操作
        this.pageData.modules[id].key = key;

        this.getRemoveData();

        this.renderPage(this.pageData);

        localStorage.setItem('data', JSON.stringify(this.pageData));
    },
    getRemoveData: function() { //更新回收站数据
        var _self = this;

        _self.pageData.recyleCount = 0;

        for (var i in _self.pageData.modules) {
            if (!_self.pageData.modules[i].key) {
                _self.pageData.recyleCount++;
            }
        }
        if (_self.pageData.recyleCount == _self.pageData.modulesCount) {
            $('.j-goGeneratePage').addClass('disabled').attr('disabled',true);
        }else{
            $('.j-goGeneratePage').removeClass('disabled').attr('disabled',false);
        }
    },
    formatModel: function(modalData, val) {
        return new Function("return page.pageData." + modalData + "=\'" + val + "\'")()
    },
    exportFile:function(){
        console.log(this.pageData.modules);
        var btn = this.pageData.modules.button;
        var input = this.pageData.modules.input;
        $('.j-exportClass').click( function() {
          var css = '.btn{\n'
                  +'border-radius:'+ btn.radius +'px;}\n'
                  +'.btn-default{\n'
                  +'color: #'+ btn.default +';\n'
                  +'background-color: #fff;\n'
                  +'border: 1 solid #'+ btn.default +'; }\n'
                  +'.btn-primary {\n'
                  +'background-color: #'+ btn.primary +';\n'
                  +'border-color: #'+ btn.primary +'; }\n'
                  +'.btn-success {\n'
                  +'background-color: #'+ btn.success +';\n'
                  +'border-color: #'+ btn.success +'; }\n'
                  +'.btn-danger {\n'
                  +'background-color: #'+ btn.danger +';\n'
                  +'border-color: #'+ btn.danger +'; }\n'
                  +'.form-control {\n'
                  +'border-radius:'+ input.radius +'px; }\n'
                  +'.form-control:focus {\n'
                  +'border-color:#'+ input.success +'; }\n';
          var blob = new Blob([css], {type: "text/plain;charset=utf-8"});
          saveAs(blob, Date.now()+'.css');
        });
    },
}

function initPageIndex(){
    $('.page-twoPart').each(function(index) {
        index = index + 1;
        if (index <= 8) {
            $(this).find('.num').html("0" + index);
        } else {
            $(this).find('.num').html(index);
        }
    });
}

function propChange(){
    $(document).ready(function(){
        //cover input onchange
        $("input[data-modal='modules.cover.background']").bind('input propertychange', function() {
            var val = $(this).val();
            if (val.length==3 || val.length==6) {
                if (decideFontColor(val)==true) {
                    $('.ui-demo01-cover').css({
                        "color":"#ffffff",
                        "background-color":"#"+val
                        });
                }else{
                    $('.ui-demo01-cover').css({
                        "color":"#263238",
                        "background-color":"#"+val
                        });
                }
            }
        });
        $("input[data-modal^='modules.color.color']").bind('input propertychange', function() {
            $(this).parents('tr').find('.color-block').css('background-color','#'+$(this).val());
        });
        //font input onchange
        $("input[data-modal^='modules.font.size']").bind('input propertychange', function() {
            $(this).parents('tr').find('.font-size').css('font-size', $(this).val()+'px');
        });

        //button input onchange
        $("input[data-modal='modules.button.radius']").bind('input propertychange', function() {
           $('.ui-demo01-button').find('.button-style,.button-cover-darken,.button-cover-light').css('border-radius',$(this).val()+'px');
        });

        //button input onchange
        $("input[data-modal='modules.button.primary']").bind('input propertychange', function() {
            var val = $(this).val();
            if (val.length==3 || val.length==6) {
                if (decideFontColor(val)==true) {
                    $('.ui-demo01-button').find('.ct-left .button-style,.ct-right .button-style').css({
                        "color":"#ffffff",
                        "background-color":"#"+val
                        });
                    $('.ui-demo01-button').find('.ct-bottom .button-style').eq(1).css({
                        "color":"#ffffff",
                        "background-color":"#"+val
                        });
                }else{
                    $('.ui-demo01-button').find('.ct-left .button-style,.ct-right .button-style').css({
                        "color":"#263238",
                        "background-color":"#"+val
                        });
                    $('.ui-demo01-button').find('.ct-bottom .button-style').eq(1).css({
                        "color":"#263238",
                        "background-color":"#"+val
                        });
                }
            }
           $("input[data-modal='modules.button.primary']").val($(this).val());
        });
        $("input[data-modal='modules.button.default']").bind('input propertychange', function() {
            $(this).parents('.button-list').find('.button-style').css({
                "color":"#"+$(this).val(),
                "border":"1px solid #"+$(this).val()
            });
        });

        $("input[data-modal='modules.button.success'],input[data-modal='modules.button.danger']").bind('input propertychange', function() {
            var val = $(this).val();
            if (val.length==3 || val.length==6) {
                if (decideFontColor(val)==true) {
                     $(this).parents('.button-list').find('.button-style').css({
                        "color":"#ffffff",
                        "background-color":"#"+val
                        });
                }else{
                    $(this).parents('.button-list').find('.button-style').css({
                        "color":"#263238",
                        "background-color":"#"+val
                        });
                }
            }
        });

        //input input onchange
        $("input[data-modal='modules.input.radius']").bind('input propertychange', function() {
           $('.ui-demo01-input').find('.input-status,.textarea-status').css('border-radius',$(this).val()+'px');
        });

        $("input[data-modal='modules.input.success'],input[data-modal='modules.input.danger']").bind('input propertychange', function() {
            var index = $(this).parents('.input-list').index();
            var val = $(this).val();
            if (val.length==3 || val.length==6) {
            $('.ui-demo01-input .ct-right .updown-structure').eq(index)
              .find('.input-status')
              .css('border','1px solid #'+$(this).val());
            $('.ui-demo01-input .ct-right .updown-structure').eq(index)
              .find('.verify-status')
              .css('color','#'+$(this).val());
            }
        });

        //select input onchange
        $("input[data-modal='modules.select.radius']").bind('input propertychange', function() {
           $('.ui-demo01-select').find('.select-box,.select-fold').css('border-radius',$(this).val()+'px');
        });

        $("input[data-modal='modules.select.active']").bind('input propertychange', function() {
            var val = $(this).val();
            if (val.length==3 || val.length==6) {
                if (decideFontColor(val)==true) {
                    $('.ui-demo01-select .select-fold').find('p').eq(0).css({
                        "color":"#ffffff",
                        "background-color":"#"+val
                        });
                }else{
                    $('.ui-demo01-select .select-fold').find('p').eq(0).css({
                        "color":"#263238",
                        "background-color":"#"+val
                        });
                }
            }
        });
    });
}

function renderStandard(){
  //render png function
  $('.j-renderPng').on('click',function(){
    $('.standard-container').clone().appendTo('#renderPages');
    var width = $('.standard-container').outerWidth(),
        height = $('.standard-container').outerHeight(),
        scale = window.devicePixelRatio;
    html2canvas($('#renderPages'),{
        scale: scale,
        width: width,
        height: height,
        onrendered:function(canvas){   
        canvas.toBlob(function(blob) {
            saveAs(blob, '视觉规范'+Date.now()+'.png');
        });   
      },
        background:"#ffffff"
    });
    $('#renderPages').empty();
  });
 //render pdf function
  $('.j-renderPdf').on('click',function(){
     $('.standard-container').clone().appendTo('#renderPages');
     var width = $('.standard-container').outerWidth(),
        height = $('.standard-container').outerHeight(),
        scale = window.devicePixelRatio;
        html2canvas($('#renderPages'),{
            scale: scale,
            width: width,
            height: height,
          onrendered:function(canvas){
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            var pageHeight = contentWidth / 960 * 540 
            var leftHeight = contentHeight;
            var position = 0;
            var imgWidth = 960
            var imgHeight = 960 / contentWidth * contentHeight;
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            var pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'pt',
                format: [960, 540]
            });
             if (leftHeight < pageHeight) {
                  pdf.addImage(pageData, 'png', 0, 0, imgWidth, imgHeight );
              } else {
                  while(leftHeight > 0) {
                      pdf.addImage(pageData, 'png', 0, position, imgWidth, imgHeight)
                      leftHeight -= pageHeight;
                      position -= 540;
                      if(leftHeight > 0) {
                          pdf.addPage();
                      }
                  }
              }
              pdf.save('视觉规范'+Date.now()+'.pdf');
          },
            background:"#ffffff"
        });
     $('#renderPages').empty();
  });
}

function decideFontColor(color){
    var sColor = color.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 3) {
            var sColorNew = "";
            for (var i=0; i<=3; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        var r = parseInt("0x"+sColor.slice(0, 2));
        var g = parseInt("0x"+sColor.slice(2, 4)); 
        var b = parseInt("0x"+sColor.slice(4, 6)); 
        var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        // a >0.2 background color is dark,font color is white,
        if (a > 0.2) {
            color = true;
        }else{
            color = false;
        }
    }
    return color;
}
