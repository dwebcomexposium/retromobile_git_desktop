/**!
 Agence'O Scripts
 Divers scripts

 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-06-13
 @last-update: 2016-06-23
 */

;(function ($) {

    // Modules functions
    $.fn.firstWord = function (numWords) {
        var node = this.contents().filter(function () {
                return this.nodeType == 3
            }).first(),
            text = node.text(),
            first = text.split(" ", numWords).join(" ");

        if (!node.length)
            return;

        node[0].nodeValue = text.slice(first.length);
        node.before('<span class="first-word">' + first + '</span>');
    };

    /**
     * Reorder site-banner
     */
    var $siteBanner = $('.site-banner');
    var $quicklinksWrapper = $('<div class="quicklinks-wrapper"></div>');
    $siteBanner.find('.block-small.quicklinks').wrapAll($quicklinksWrapper);
    $('.site-banner .social-sharing').before($('.site-banner .quicklinks-wrapper'));
    $('.site-banner .main-navigation').before($('.site-banner .global-search-form'));

    /**
     * home top Slider enhancements
     */
    //Fix full height
    $(window).resize(function () {
        $('#zone1 .slider-item').css({
            'max-height': function () {
                return Math.abs($(window).height() - $('.site-banner').height());
            }
        });
        $('.mod-catal.edito').width($('.layout-2-col').width());
        $('body.catalogue #zone3').css('top', $('.mod-catal.edito').outerHeight(true));
    }).resize();
    //Add wrapper to home Slider content
    $('#zone1 .slider-item .la-item-content').wrapInner($('<div class="la-item-content-inner" />'));

    /**
     * home Animation Slider
     */
    $('.front .list-articles.expo .grid-la-list').slick({
        centerMode: true,
        centerPadding: '80px',
        slidesToShow: 2,
        variableWidth: true,
        focusOnSelect: true
    }).find('.gla-item > a').click(function (e) {
        if (!$(this).parent().hasClass('slick-current')) {
            e.preventDefault();
        }
    });

    /**
     * Edito first-word highlight and Column
     */
    var $frontEdito = $('.front .edito');
    $frontEdito.find('.block-title').firstWord(1);

    /**
     * Switch article-illust & article-intro
     */
    var $articleIllust = $('<div>').addClass('article-illust').append($('.article-title .at-illust'));
    $('.article-content').before($articleIllust);

    /**
     * Newsletter Popin
     */
    var $newsletterForm = $('.site-banner .newsletter-form');
    var $newsletterFormBtn = $('.site-banner .sl-link-newsletter');
    if($newsletterForm.size() == 0) {
        $newsletterFormBtn.parent().hide();
    }
    var $nfCloseBtn = $('<div />').text('Close').addClass('btn-close').click(function (e) {
        e.preventDefault();
        $newsletterForm.hide().removeClass('is-open');
    });
    $newsletterForm.find('.nf-main-content').prepend($nfCloseBtn);
    $newsletterForm.click(function (e) {
        if ($(e.target).hasClass('is-open')) {
            $nfCloseBtn.click();
        }
    });
    $newsletterFormBtn.click(function (e) {
        e.preventDefault();
        $newsletterForm.show().addClass('is-open');
        $newsletterForm.find('.nf-form-input input').focus();
    });

    /**
     * Page header fixed background
     */

    $(window).scroll(function () {
        var $pageHeader = $('.page-header');
        if ($pageHeader.size()) {
            var scrolledY = $(window).scrollTop() - $pageHeader.offset().top;
            //$pageHeader.css('background-position', 'center ' + ((scrolledY)) + 'px');
        }
    });

    /**
     * Add viewport meta
     */
    //$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

    /**
     * Instafeed init
     */
    if ($('#insta-retromobile').size()) {
        var feedClientId = '11891b59a9e2448995212889dedf6ced';
        var feedUserId = '1056633822';
        //var feedAccessToken = '1056633822.11891b5.338b6d8c30dc457084736cccc4509bb6'; //local
        var feedAccessToken = '1056633822.11891b5.338b6d8c30dc457084736cccc4509bb6'; //retromobile
        var feedCount = 6;

        var userFeed = new Instafeed({
            get: 'user',
            clientId: feedClientId,
            userId: feedUserId,
            accessToken: feedAccessToken,
            sortBy: 'most-recent',
            limit: feedCount,
            target: 'insta-retromobile',
            template: '<a class="insta-item" href="{{link}}" target="_blank"><img class="insta-item-img" src="{{image}}" alt="" /></a>'
        });
        userFeed.run();
    }

})(jQuery);