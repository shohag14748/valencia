// SPハンバーガーメニュー
$(function() {
  $('#menu-btn').on('click', function(){ //メニューボタンがクリックされたら関数を実行
    $(this).toggleClass("on"); //メニューボタンにクラス「on」をトグルで付けたり消したり
    if($(this).hasClass("on")) { //クラス「on」が付いていた時の処理
      $(this).attr('src','parts/img/menu_close.svg'); //attrメソッドで画像をclose用に変更
      $("#menu-conts").slideDown(); //メニューの項目を表示
    } else { //クラス「on」が付いていない時の処理
      $(this).attr('src','parts/img/menu_open.svg'); //attrメソッドで画像を従来のものに変更
      $("#menu-conts").slideUp(); //メニューの項目を非表示
    }
  });

  //ページ内遷移するとトグルメニューが閉じない対処
  $('p a').on('click', function(){
    if (window.innerWidth <= 767) {
      $('#menu-btn').click();
    }
	});
});


// SPハンバーガーメニュー・アコーディオン部
$(function(){
  var $menu = $('.accordion-menu');
  var $panel = $menu.find('p.child');
  var $toggle = $menu.find('p.parent a');
  $panel.hide();
  $toggle.removeClass('is-open').addClass('is-close');
  $toggle.click(function(e){
    e.preventDefault();
    if($(this).hasClass('is-close')) {
      $(this).parent().next().slideDown();
      $(this).removeClass('is-close').addClass('is-open');
    } else {
      $(this).parent().next().slideUp();
      $(this).removeClass('is-open').addClass('is-close');
    }
  });
});



// PC グロナビ：カレント表記
/*
$(function() {
	$('.gnav li a').each(function(){
			var $href = $(this).attr('href');
			if(location.href.match($href)) {
					$(this).parent().addClass('current');
			} else {
					$(this).parent().removeClass('current');
			}
	});
});
$(document).ready(function() {
	if(location.pathname != "/") {
			$('.gnav li a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
	} else $('.gnav li a:eq(0)').addClass('active');
});
*/






$(function() {
  // ページ内スクロール
  $('a[href^="#"]').on('click', function() {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  // ページ上部へ戻る
  var backToTop = $('#backToTop');
  backToTop.hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });
  $('#backToTop').on('click', function() {
    $('body,html').animate({
      scrollTop: 0
    }, 300);
    return false;
  });
});




// 画像のプリロード
$(function(){
	$("a img").each(function(){
		if(String($(this).attr("src")).match(/_off\.(.*)$/)){
			var img = new Image();
			img.src = String($(this).attr("src")).replace(/_off\.(.*)$/,"_on.$1");
		}
	});
});





// 画像のロールオーバー：ふわっと
(function($){
  $(function() {
    if(jQuery.support.opacity){
      var fadeSpeed = 400;
      var rolloverImg = $('a img');
      rolloverImg.each(function() {
        if(this.src.match('_off')) {
        var imgWidth = $(this).width();
          var imgHeight = $(this).height();
            $(this).parent('a').css( {display: 'inline-block', width: imgWidth, height: imgHeight});
            this.onImgSrc = new Image();
            this.onImgSrc.src = this.getAttribute('src').replace('_off', '_on');
            $(this.onImgSrc).css( {position: 'absolute', opacity: 0} );
            $(this).before(this.onImgSrc);
            $(this.onImgSrc).mousedown(function(){
              $(this).stop().animate({opacity: 0}, {duration: fadeSpeed, queue: false});
            });
            $(this.onImgSrc).hover(
              function(){ $(this).animate( {opacity: 1}, {duration: fadeSpeed, queue: false}); },
              function(){ $(this).animate( {opacity: 0}, {duration: fadeSpeed, queue: false}); }
            );
          }
      });
    }
  });
})(jQuery);




// コンテンツがふわっとフェードイン
// Fade関連
$(function(){
  $(window).scroll(function (){
    $('.fadein').each(function(){
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight + 0){
          $(this).addClass('scrollin');
      }
    });
  });
  $(window).scroll();
});




// FAQアコーディオン
(function($){
  $(function(){
    //jqueryオブジェクト保存と効率化
    var accordionItem=$('#step');
    //一旦全部消す
    $('#step').find('ul.answer').hide();
    //active要素を指定して開く
		var no=0;
		//accordionItem.find('p.question').eq(no).addClass('active').next('ul.answer').show();
    //click-action
    accordionItem.find('p.question').click(function () {
    //active切り替え
    $(this).toggleClass('active');
    //slideToggle
    //$(this).next('ul.answer').slideToggle('fast');
		//});

    //activeをhasClass()で判定
    if($(this).hasClass('active')) {
    //開く処理slide
     $(this).next('ul.answer').slideDown('fast');
    } else {
    //閉じる処理slide
     $(this).next('ul.answer').slideUp('fast');
    }
    });
    //hover-toggle
    accordionItem.find('p.question').hover(function () {
    //toggle hoveredクラス
    $(this).toggleClass('hovered');
    });
  });
})(jQuery);




$(function(){
	$('#tab-contents div[id != "tab1"]').hide();
	// タブをクリックすると
	$("a").click(function(){
		// 一度全てのコンテンツを非表示にする
		$("#tab-contents div").hide();
		// 次に選択されたコンテンツを再表示する
		$($(this).attr("href")).show();
		// 現在のcurrentクラスを削除
		$(".current").removeClass("current");
		// 選択されたタブ（自分自身）にcurrentクラスを追加
		$(this).addClass("current");
		return false;
	});
});
