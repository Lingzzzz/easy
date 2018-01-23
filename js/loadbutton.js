/* ========================================================================
 * Bootstrap: loadingbtn.js v3.4.0
 * no url
 * 手艺人小王写的
 * lingz针对项目改的
 * ========================================================================
 */

+function ($) {
    'use strict';

    // LOADINGBTN CLASS DEFINITION
    // ======================

    var LoadingBtn = function(element, options){
        this.options             = options
        this.$body               = $(document.body)
        this.$element            = $(element)
    }

    LoadingBtn.VERSION  = '3.4.0'

    LoadingBtn.TRANSITION_DURATION = 300

    LoadingBtn.options = {
        html:true,
        normalTpl:'生成',
        loadingTpl:'生成中...<div class="preloader-wrapper small active">'+
                   '<div class="spinner-layer spinner-yellow-only">'+
                   '<div class="circle-clipper left"><div class="circle"></div></div>'+
                   '<div class="gap-patch"><div class="circle"></div></div>'+
                   '<div class="circle-clipper right"><div class="circle"></div></div>'+
                   '</div></div>',
        successTpl:'生成成功',
        dangerTpl:'生成失败',
    }

    LoadingBtn.prototype.config = function(_relatedTarget){
        for(var i in _relatedTarget){
            this.options[i] = _relatedTarget[i];
        }
    }

    LoadingBtn.prototype.loading = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('loading.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.addClass('disabled')
        ele.attr('disabled','true')

        this.options.html?ele.html(this.options.loadingTpl):ele.text(this.options.loadingTpl)
    };

    LoadingBtn.prototype.success = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('success.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('disabled')
        ele.removeAttr('disabled')

        this.options.html?ele.html(this.options.successTpl):ele.text(this.options.successTpl)
        ele.blur()
    }

    LoadingBtn.prototype.fail = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('fail.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('disabled').addClass('red lighten-1')
        this.options.html?ele.html(this.options.dangerTpl):ele.text(this.options.dangerTpl)
        ele.blur()

        if(!_relatedTarget || !!_relatedTarget.reset){
            setTimeout(function(){
                this.reset()
            }.bind(this),1000)
        }
    };

    LoadingBtn.prototype.reset = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('reset.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('red lighten-1 disabled')
        ele.removeAttr('disabled')
        this.options.html?ele.html(this.options.normalTpl):ele.text(this.options.normalTpl)
        ele.blur()
    }

    // LoadingBtn PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.fullmodal')
            var options = $.extend({}, LoadingBtn.options, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.fullmodal', (data = new LoadingBtn(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }


    var old = $.fn.loadingbtn

    $.fn.loadingbtn = Plugin
    $.fn.loadingbtn.Constructor = LoadingBtn


    // LoadingBtn NO CONFLICT
    // =================

    $.fn.loadingbtn.noConflict = function () {
        $.fn.loadingbtn = old
        return this
    }


    // LoadingBtn DATA-API
    // ==============


}(jQuery);
