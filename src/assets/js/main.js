"use strict"

window.addEventListener("DOMContentLoaded", () => {
    let allBlocks = document.querySelector('.content').querySelectorAll('.block');
    let allNextButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_next');
    let allPrevButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_prev');
    let indexActiveBlock = 1

    function chooseActiveBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.add('block__hide')
            if (i === indexActiveBlock) {
                block.classList.remove('block__hide')
            }
        })
    }

    function scrollToBlock(xOffset = 0) {
        $('html, body').animate({
            scrollTop: $(allBlocks[indexActiveBlock]).offset().top + xOffset
        }, {
            duration: 1000,
            easing: 'swing'
        });
    }

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    document.body.style.overflow = 'hidden';

    document.querySelector('.saying-block__btn').addEventListener('click', function () {
        scrollToBlock()
        setTimeout(function () {
            allNextButtons.forEach(btn => btn.classList.add('change-block-btn__fixed'))
            allPrevButtons.forEach(btn => btn.classList.add('change-block-btn__fixed'))
        }, 500)
    })

    chooseActiveBlock()

    allNextButtons.forEach((btn, i) => {
        btn.textContent = allBlocks[i + 2].querySelector('.inner-block__title').textContent
        btn.addEventListener('click', function () {
            if (indexActiveBlock < allBlocks.length - 1) indexActiveBlock++
            chooseActiveBlock()
            if (indexActiveBlock < 5) {
                scrollToBlock(-150)
            } else {
                scrollToBlock(-230)
            }
        })
    })

    allPrevButtons.forEach((btn, i) => {
        btn.textContent = allBlocks[i + 1].querySelector('.inner-block__title').textContent
        btn.addEventListener('click', function () {
            if (indexActiveBlock > 1) indexActiveBlock--
            chooseActiveBlock()
            if (indexActiveBlock === 1) {
                scrollToBlock(0)
            } else if (indexActiveBlock < 5) {
                scrollToBlock(-150)
            } else {
                scrollToBlock(-230)
            }
        })
    })
})