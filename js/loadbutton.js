/* ========================================================================
 * Bootstrap: loadbutton.js v3.4.0
 * no url
 * 手艺人小王写的, Lingz 针对项目改的。
 * ========================================================================
 */

+function ($) {
    'use strict';

    // LOADBUTTON CLASS DEFINITION
    // ======================

    var LoadButton = function(element, options){
        this.options             = options
        this.$body               = $(document.body)
        this.$element            = $(element)
        this.$elementTxt         = $(element).html()
        // var html = ''+
    }

    LoadButton.VERSION  = '3.4.0'

    LoadButton.TRANSITION_DURATION = 300

    LoadButton.DEFAULTS = {
        keyboard: true,
        show: true
    }

    LoadButton.prototype.loading = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('loading.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.addClass('disabled').attr('disabled',true)
        ele.data('loading-txt')?ele.text(ele.data('loading-txt')):ele.text('生成中...')
    };

    LoadButton.prototype.success = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('success.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('disabled')
        ele.data('success-txt')?ele.text(ele.data('success-txt')):ele.text('生成成功')
        ele.blur()
    }

    LoadButton.prototype.fail = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('fail.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('disabled yellow darken-2').addClass('red lighten-1')
        ele.data('fail-txt')?ele.text(ele.data('fail-txt')):ele.text('生成失败')
        ele.blur()

        if(!_relatedTarget || !!_relatedTarget.reset){
            setTimeout(function(){
                this.reset()
            }.bind(this),1000)
        }
    };

    LoadButton.prototype.reset = function(_relatedTarget){
        var ele = this.$element;
        var e = $.Event('reset.bs.loadbtn', { relatedTarget: _relatedTarget })
        this.$element.trigger(e);

        ele.removeClass('btn-danger btn-success disabled')
        ele.removeAttr('disabled')
        ele.text(this.$elementTxt);
        ele.blur()
    }

    // LOADBUTTON PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.fullmodal')
            var options = $.extend({}, LoadButton.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data) $this.data('bs.fullmodal', (data = new LoadButton(this, options)))
            if (typeof option == 'string') data[option](_relatedTarget)
            else if (options.show) data.show(_relatedTarget)
        })
    }


    var old = $.fn.loadbutton

    $.fn.loadbutton = Plugin
    $.fn.loadbutton.Constructor = LoadButton


    // LOADBUTTON NO CONFLICT
    // =================

    $.fn.loadbutton.noConflict = function () {
        $.fn.loadbutton = old
        return this
    }


    // MODAL DATA-API
    // ==============


}(jQuery);
