// JavaScript by Robin Savemark

$(function() {
	var video = document.getElementById("video");
	var showVideo = $(".top-banner-video");
	var playVideo = $("#play-video");
	var pauseVideo = $("#pause-video");
	var body = $("html, body");

	playVideo.on("click", function(e) {
		e.preventDefault();
		pauseVideo.fadeIn();
		showVideo.fadeIn();
		video.play();
		body.css({
			"overflow": "hidden"
		});
	});

	pauseVideo.on("click", function(e) {
		e.preventDefault();
		pauseVideo.fadeOut();
		showVideo.fadeOut();
		video.pause();
		body.css({
			"overflow": "auto"
		});
	});

	function updateProgressbar() {
		var progress = document.getElementById("progress-bar");
		var progressBar = $(".progress-bar");
		var percentage = Math.floor((100 / video.duration) * video.currentTime);
		progressBar.attr("value", percentage);
		progressBar.width(percentage + "%");
	}

	video.addEventListener('timeupdate', updateProgressbar, false);

	window.setInterval(function(time) {
		if (video.readyState > 0) {
			var duration = $("[data-video-duration]").get(0);
			var videoDuration = Math.round(video.duration);
			duration.firstChild.nodeValue = videoDuration;
			clearInterval(time);
		}
	}, 1000);
});

$('.container-fluid').on("click", function() {
	console.log("clicked")
	var $menu, $this, $content;
	$this = $('#hamburger');
	$menu = $("#menu");
 	$content = $("#content");
 	$menu.removeClass("open");
	$content.removeClass("slide-right");
	$this.removeClass("active");
})

$('#hamburger').on("click", function(e) {
	e.preventDefault();
	var $menu, $this, $content;
	$this = $(this);
	$menu = $("#menu");
	$content = $("#content");
	if ($this.hasClass("active")) {
		$this.removeClass("active");
		$menu.removeClass("open");
		$content.removeClass("slide-right");
	} else {
		$this.addClass("active");
		$menu.addClass("open");
		$content.addClass("slide-right");
	}
});

(function() {
	var clickOrTouch = "click touchstart";
	var $scroll = $("#scroll-top");
	var $body = $("html, body");
	$scroll.on(clickOrTouch, function() {
		$body.animate({
			scrollTop: 0
		}, 1200);
		return false;
	});
}.call(this));

(function() {
	var clickOrTouch = "click touchstart";

	$("[data-toggle]").on(clickOrTouch, function() {

		var $this = $(this);
		var $nrId = $this.attr("data-modal-toggle");
		var $strategyId = $("[data-modal-id]").html('You have chosen <span class="orange bold text-center">' + $('#strategy-' + $nrId + '').html() + '</span>');

		if ($nrId === "1" || $nrId === "5") {
			$("#payment-option").hide();
		} else {
			$("#payment-option").show();
		}

	});
}.call(this));

(function() {
	var clickOrTouch = "click touchstart"
	$(".newsfeed-box > .newsfeed-box-content > p > a, .newsfeed-box > .newsfeed-box-reviews > p > a").on(clickOrTouch, function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this;
		$this = $(this).parent().parent().parent(".newsfeed-box");

		if ($this.hasClass("active")) {
			$this.removeClass("active");
		} else {
			$this.addClass("active");
		}
	});
	return;
}.call(this));

(function() {
	var $boxHeight = $(".box"),
		$newsfeedHeight = $(".newsfeed-box");

	$boxHeight.matchHeight({
		byRow: true,
		property: "height",
		target: null,
		remove: false
	});

	$newsfeedHeight.matchHeight({
		byRow: true,
		property: "height",
		target: null,
		remove: false
	});
}.call(this));

(function() {
	var clickOrTouch = "click or touchstart";
	$("#sign-me-up").on(clickOrTouch, function(e) {
		e.preventDefault(); // I don't want to submit the form, we want to see the animation.
		var $this;
		$this = $(this);

		$this.html('Welcome on board <span class="white text-center"><i class="fly-away fa fa-send"></i></span>');
	});

	$("#cancel").on(clickOrTouch, function(e) {
		$("#sign-me-up").html('Sign up');
	});
}.call(this));

function expand() {
	var $search = $(".search"),
		$input = $(".input");

	if ($search.hasClass("close")) {
		$search.removeClass("close");
		$input.removeClass("square");
	} else {
		$search.addClass("close");
		$input.addClass("square");
	}
	if ($search.hasClass("close")) {
		$input.focus();
	} else {
		$input.blur();
	}
}

$(function() {
	var clickOrTouch = "click touchstart";
	var $button = $("#search-button");
	$button.on(clickOrTouch, expand);
});

// Client Side Validation

function validateCredit(event, input) {
	var reg = /^\d+$/;
	if (input.val().length === 0) {
		return 2;
	}
	if (reg.test(input.val())) {
		return 1;
	}
	if (!reg.test(input.val())) {
		return 2;
	}
}

function setCreditStatus(check, input, valid) {
	if (input.val() != "") {
		var value = input.val();
	}

	if (valid === 1) {
		(check).addClass("fa-check").removeClass("fa-times");
		(check).css({
			"display": "block",
			"color": "#50788C"
		});
	} else if (valid === 3) {
		(check).addClass("fa-times").removeClass("fa-check");
		(check).css({
			"color": "#ECB517"
		});
		if (input.val().length == 0) {
			(check).css({
				"display": "none",
			});
		}
	} else if (valid === 2) {
		(check).css({
			"display": "none",
			"color": "#ECB517"
		});
	}
}

$(function() {
	$("#credit-card-number").keyup(function(event) {
		var check = $(".number-icon > i");
		var input = $("#credit-card-number");
		var vc = validateCredit(event, input);

		if (vc !== 2 && $(this).val().length === 16 || $(this).val().length === 19) {
			setCreditStatus(check, input, 1);
		} else if (vc === 2) {
			setCreditStatus(check, input, 2);
		} else if (vc === 3 || vc === 1) {
			setCreditStatus(check, input, 3);
		}
	});

	$("#credit-card-cvv").keyup(function(event) {
		var check = $(".cvv-icon > i");
		var input = $("#credit-card-cvv");
		var vc = validateCredit(event, input);

		if (vc !== 2 && $(this).val().length === 3) {
			setCreditStatus(check, input, 1);
		} else if (vc === 2) {
			setCreditStatus(check, input, 2);
		} else if (vc === 3 || vc === 1) {
			setCreditStatus(check, input, 3);
		}
	});
});

// Select

$("select").each(function() {
	var $this = $(this),
		$options = $(this).children("option").length;

	$this.addClass("select-hidden");
	$this.wrap("<div class='select'></div>");
	$this.after("<div class='select-styled'></div>");

	var $styledSelect = $this.next("div.select-styled");
	$styledSelect.text($this.children("option").eq(0).text());

	var $list = $("<ul />", {
		"class": "select-options"
	}).insertAfter($styledSelect);

	for (var i = 0; i < $options; i++) {
		$("<li />", {
			text: $this.children("option").eq(i).text(),
			rel: $this.children("option").eq(i).val()
		}).appendTo($list);
	}

	var $listItems = $list.children("li");

	$styledSelect.on("click", function(e) {
		e.stopPropagation();
		$("div.select-styled.active").each(function() {
			$(this).removeClass("active").next("ul.select-options").hide();
		});

		$(this).toggleClass("active").next("ul.select-options").toggle();
	});

	$listItems.on("click", function(e) {
		e.stopPropagation();
		$styledSelect.text($(this).text()).removeClass("active");
		$this.val($(this).attr("rel"));
		$list.hide();
	});

	$(document).on("click", function() {
		$styledSelect.removeClass("active");
		$list.hide();
	});

});

$(function() {
	var skroller = skrollr.init();
});