/**
 * Created by XJX on 2017/3/13.
 */

export const carouselModel = function (container, carouselFrame, carouselPD, materials) {
    return {
        scrollUnit: 0,
        autoPlay: null,
        smoothＭove: null,
        init: function () {
            container.style.width = materials.length * 100 + 'vw'
            carouselPD.style.marginLeft = window.screen.width - materials.length * 20
            materials.forEach(function (item, count) {
                container.innerHTML += ('<div class="carousel-card" id="c' + count + '">' + item.content + '</div>');
                carouselPD.innerHTML += ('<div class="dot" id="d' + count + '"></div>')
                document.querySelectorAll('.carousel-card')[count].style.background = item.background;
            })
            this.scrollUnit = container.getBoundingClientRect().width / materials.length
            carouselFrame.addEventListener('touchstart', this.handleTouchStart);
            carouselFrame.addEventListener('touchend', this.handleTouchEnd);
            this.switchPageDot(0)
            this.autoPlayCarousel()
        },
        switchPageDot: function (c) {
            document.querySelectorAll('.dot').forEach(function (item, index) {
                if (index == c) {
                    item.style.background = '#ff3005'
                } else {
                    item.style.background = 'rgba(211, 211, 211, 0.54)'
                }
            })
        },
        autoPlayCarousel: function () {
            this.autoPlay = setInterval(autoFunction, 2500);
        },
        handleTouchStart: function (e) {
            clearInterval(this.smoothＭove)
            clearInterval(this.autoPlay)
            console.log('handleTouchStart:' + carouselFrame.scrollLeft)
        },
        handleTouchEnd: function (e) {
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
            this.autoPlay = setInterval(this.autoFunction, 2500);
        },
        autoFunction: function () {
            var endX, unit;
            if (carouselFrame.scrollLeft == scrollUnit * (materials.length - 1)) {
                carouselFrame.scrollLeft = 0;
                switchPageDot(0)
            } else {
                endX = carouselFrame.scrollLeft + scrollUnit;
                unit = (endX - carouselFrame.scrollLeft) / 5;
                var count = 1;
                this.smoothＭove = setInterval(function () {
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
                clearInterval(this.autoPlay)
                this.autoPlay = setInterval(autoFunction, 2500)
            }
        }
    }
}