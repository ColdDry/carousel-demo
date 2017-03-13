/**
 * Created by XJX on 2017/3/13.
 */
// import {carouselModel} from 'carousel.js';

var carouselFrame, container, carouselPD, scrollUnit = 0, paused = false;
var autoPlay, smoothＭove

var materials = [
    {content: 'A', background: '#2392CE'},
    {content: 'B', background: '#A81D22'},
    {content: 'C', background: '#000000'},
    {content: 'D', background: '#e7208d'},
    {content: 'E', background: '#6e6d73'}
]

var CM;

document.body.onload = function () {
    console.log('onLoad!')
    onInit()
}

var onInit = function () {
    container = document.querySelector('.container');
    carouselFrame = document.querySelector('.carousel-frame')
    carouselPD = document.querySelector('.carousel-page-dot')
    container.style.width = materials.length * 100 + 'vw'
    carouselPD.style.marginLeft = window.screen.width - materials.length * 20
    materials.forEach(function (item, count) {
        container.innerHTML += ('<div class="carousel-card" id="c' + count + '">' + item.content + '</div>');
        carouselPD.innerHTML += ('<div class="dot" id="d' + count + '"></div>')
        document.querySelectorAll('.carousel-card')[count].style.background = item.background;
    })
    scrollUnit = container.getBoundingClientRect().width / materials.length
    carouselFrame.addEventListener('touchstart', handleTouchStart);
    carouselFrame.addEventListener('touchend', handleTouchEnd);
    switchPageDot(0);
    autoPlayCarousel()
}

var autoPlayCarousel = function () {
    autoPlay = setInterval(autoFunction, 2500);
}

var handleTouchStart = function (e) {
    clearInterval(smoothＭove)
    clearInterval(autoPlay)
    console.log('handleTouchStart:' + carouselFrame.scrollLeft)

}

var handleTouchEnd = function (e) {
    console.log('handleTouchEnd:' + carouselFrame.scrollLeft)
    var count = 1;
    var endX = Math.round(carouselFrame.scrollLeft / scrollUnit) * scrollUnit
    var unit = (endX - carouselFrame.scrollLeft) / 10
    console.log('unit:' + unit)
    var smoothＭove2 = setInterval(function () {
        console.log('move2:' + carouselFrame.scrollLeft)
        if (count == 10) {
            carouselFrame.scrollLeft = endX;
            switchPageDot(endX / scrollUnit);
            console.log('handleTouchEnd2:' + carouselFrame.scrollLeft)
            clearInterval(smoothＭove2)
        } else {
            carouselFrame.scrollLeft += unit
        }
        count++
    }, 30)
    autoPlay = setInterval(autoFunction, 2500);
}

var autoFunction = function () {
    var endX, unit;
    if (carouselFrame.scrollLeft == scrollUnit * (materials.length - 1)) {
        carouselFrame.scrollLeft = 0;
        switchPageDot(0)
    } else {
        endX = carouselFrame.scrollLeft + scrollUnit;
        unit = (endX - carouselFrame.scrollLeft) / 5;
        var count = 1;
        smoothＭove = setInterval(function () {
            if (count == 5) {
                console.log('autoFunction:' + carouselFrame.scrollLeft)
                carouselFrame.scrollLeft = endX
                switchPageDot(endX / scrollUnit)
                clearInterval(smoothＭove)
            } else {
                carouselFrame.scrollLeft += unit
            }
            count++;
        }, 100)
    }
    if (carouselFrame.scrollLeft == scrollUnit * (materials.length - 1)) {
        clearInterval(autoPlay)
        autoPlay = setInterval(autoFunction, 2500)
    }
}

var switchPageDot = function (c) {
// console.log('switchPageDot:'+c)
    document.querySelectorAll('.dot').forEach(function (item, index) {
        if (index == c) {
            item.style.background = '#ff3005'
        } else {
            item.style.background = 'rgba(211, 211, 211, 0.54)'
        }
    })
}

