
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
    },
    pageData: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {},
    loadPageData: function() {
        var _self = this;
        if (localStorage.getItem('data')) {
            this.renderPage(_self.pageData);
            _self.getRemoveData();

        } else {
            $.getJSON('config/uiDemo1.json', function(data) {
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
        console.log(data);
    },
    savePageData: function() {
        $('[data-modal]').each(function() {
            page.formatModel($(this).attr('data-modal'), $(this).val().replace(/\n|\r\n/g, "<br/>"));
        })
        localStorage.setItem('data', JSON.stringify(this.pageData));
        window.open("./demo1-generate.html",'_self');

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
        var _self = this

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
    $('.j-renderPng').loadingbtn('config',{
        html:true,
        normalTpl:'保存为PNG',
    });
    _self = $(this);
    _self.loadingbtn('loading');
    $('.standard-container').clone().appendTo('#renderPages');
    html2canvas($('#renderPages'),{
      onrendered:function(canvas){      
      downloadFile('视觉规范'+Date.now()+'.png',canvas.toDataURL('image/png', 1.0));
      _self.loadingbtn('success');
      setTimeout(function (){_self.loadingbtn('reset')},2000);
      },
        background:"#ffffff"
    });
    $('#renderPages').empty();
  });

 //render pdf function
  $('.j-renderPdf').on('click',function(){
    $('.j-renderPdf').loadingbtn('config',{
        html:true,
        normalTpl:'保存为PDF',
    });
     _self = $(this);
     _self.loadingbtn('loading');
     $('.standard-container').clone().appendTo('#renderPages');
        html2canvas($('#renderPages'),{
          onrendered:function(canvas){
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            var pageHeight = contentWidth / 960 * 540 
            var leftHeight = contentHeight;
            var position = 0;
            var imgWidth = 960
            var imgHeight = 960 / contentWidth * contentHeight;
            var pageData = canvas.toDataURL('image/png', 1.0);
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
              _self.loadingbtn('success');
              setTimeout(function (){_self.loadingbtn('reset')},2000);
          },
            background:"#ffffff"
        });
     $('#renderPages').empty();
  });

}



//base64 transform to blob object
function base64Img2Blob(code) {
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}

//download File
function downloadFile(fileName, content) {
    var aLink = document.createElement('a');
    var blob = base64Img2Blob(content); //new Blob([content]);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    aLink.dispatchEvent(event);
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
