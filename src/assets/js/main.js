"use strict"

window.addEventListener("DOMContentLoaded", () => {
    let allBlocks = document.querySelector('.content').querySelectorAll('.block');
    let allChangeButtons = document.querySelector('.content').querySelectorAll('.change-block-btn');
    let indexActiveBlock = 1

    function chooseActiveBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.add('block__hide')
            if (i === indexActiveBlock) {
                block.classList.remove('block__hide')
            }
        })
    }

    function scrollToBlock(targetBlock) {
        $('html, body').animate({
            scrollTop: $(targetBlock).offset().top
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
        scrollToBlock(allBlocks[1])
    })

    chooseActiveBlock()

    allChangeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            indexActiveBlock++
            chooseActiveBlock()
            scrollToBlock(allBlocks[indexActiveBlock])
        })
    })
})