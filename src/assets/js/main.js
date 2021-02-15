"use strict"

window.addEventListener("DOMContentLoaded", () => {
    let allBlocks = document.querySelector('.content').querySelectorAll('.block');
    let allClouds = document.querySelector('.content').querySelectorAll('.cloud-img');
    let allNextButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_next');
    let allPrevButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_prev');
    let indexActiveBlock = 1
    let freeWatch = false

    allBlocks.forEach((block, i) => {
        if (block.querySelector('.inner-block_tower') !== null) {
            block.querySelector('.inner-block_tower').addEventListener('click', event => {
                if (freeWatch) {
                    indexActiveBlock = i
                    chooseActiveBlock()
                    block.querySelectorAll('.change-block-btn').forEach(btn => btn.classList.remove('change-block-btn__fixed'))
                }
            })
        }
    })

    function chooseActiveBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.add('block__hide')
            if (block.querySelector('.change-block-btn_next') !== null) {
                block.querySelector('.change-block-btn_next').classList.remove('change-block-btn__fixed')
            }
            if (block.querySelector('.change-block-btn_prev') !== null) {
                block.querySelector('.change-block-btn_prev').classList.remove('change-block-btn__fixed')
            }

            if (indexActiveBlock === i) {
                block.classList.remove('block__hide')
                if (block.querySelector('.change-block-btn_next') !== null) {
                    block.querySelector('.change-block-btn_next').classList.add('change-block-btn__fixed')
                }
                if (block.querySelector('.change-block-btn_prev') !== null) {
                    block.querySelector('.change-block-btn_prev').classList.add('change-block-btn__fixed')
                }
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
        if (indexActiveBlock === allBlocks.length - 1 && !freeWatch) {
            document.body.style.overflow = 'auto';
            freeWatch = true
        } else {
            document.body.style.overflow = 'hidden';
            freeWatch = false
        }
    }

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    document.body.style.overflow = 'hidden';

    document.querySelector('.saying-block__btn').addEventListener('click', function () {
        if (!freeWatch) {
            indexActiveBlock = 1
            scrollToBlock()
            setTimeout(chooseActiveBlock, 500)
        }
    });

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

    document.querySelectorAll('.btn_subscribe').forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault()
            $('.popup-wrapper').fadeIn()
            $('.popup-wrapper').css('display', 'flex')
            document.querySelector('.popup-wrapper').querySelector('.popup-close').addEventListener('click', function () {
                $('.popup-wrapper').fadeOut()
            })
            document.querySelector('.popup-wrapper').querySelector('.btn_close-popup').addEventListener('click', function () {
                $('.popup-wrapper').fadeOut()
            })
        })
    })
})
