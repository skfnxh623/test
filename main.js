$(function () {
    let $slideShow = $('.slideShow'),
        $slides = $slideShow.find('.slides'),
        $slide = $slides.find('a'),
        $indicator = $slideShow.find('.indicator'),
        nav = $slideShow.find('.arrow');
    SlideCount = $slide.length,
        $indicatorHtml = '',
        currentIndex = 0,
        duration = 300,
        easing = 'easeInOutExpo',
        interval = 3000;


    $slide.each(function (i) {

        // 각 슬라이더를 가로로 배열 
        var newLeft = i * 100 + '%';
        $(this).css({ left: newLeft });

        // 인디케이터를 슬라이더 수만큼 만듦 
        $indicatorHtml += '<a href="">' + (i + 1) + '</a>';
        $indicator.html($indicatorHtml);
        console.log(currentIndex);
    });

    // 슬라이더를 움직이는 함수 
    function goToSlide(index) {
        $slides.stop().animate({ left: -100 * index + '%' }
            , duration);
        currentIndex = index;
    }

    //indicator 이동하기

    $indicator.find('a').click(function (e) {
        e.preventDefault(); // 'a' 태그 고유의 EVENT를 막는 함수 *안막으면 동작하지 않음
        var idx = $(this).index();
        goToSlide(idx);
    });

    //nav button 코딩 * hasClass() : 괄호안에 클래스를 가지고 있는지 검사

    nav.find('a').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('prev')) {
            console.log(currentIndex);
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                return;
            }
        } else {
            console.log(currentIndex);
            if (currentIndex < 2) {
                goToSlide(currentIndex + 1);
            } else {
                return;
            }
        }
    });


    var timer = setInterval(slideMove, interval);

    function slideMove() {
        var slideMovement = (currentIndex + 1) % SlideCount;
        var slideMovementWidth = slideMovement * 100;
        $slides.animate({ left: '-' + slideMovementWidth + '%' });
        currentIndex = slideMovement;
    }



    $slideShow.mouseenter(function () {
        timer = clearInterval(timer);
    });

    $slideShow.mouseleave(function () {
        timer = setInterval(slideMove, interval);
    });

});