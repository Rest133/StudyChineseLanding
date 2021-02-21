"use strict"

window.addEventListener("DOMContentLoaded", () => {
    let allBlocks = document.querySelector('.content').querySelectorAll('.block');
    let allNextButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_next');
    let allPrevButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_prev');
    let indexActiveBlock = 1
    let freeWatch = false

    allBlocks.forEach((block, i) => {
        if (block.querySelector('.inner-block_tower') !== null) {
            block.querySelector('.popup-close__mobile').addEventListener('click', function () {
                block.classList.remove('block_active-mobile')
                allBlocks.forEach(currentBlock => {
                    currentBlock.classList.remove('block_hide')
                })
            })

            block.querySelector('.inner-block_tower').addEventListener('click', event => {
                if (freeWatch) {
                    indexActiveBlock = i
                    chooseActiveBlock()
                    block.querySelectorAll('.change-block-btn').forEach(btn => btn.classList.remove('change-block-btn__fixed'))
                }
                if (window.matchMedia('(max-width: 767px)').matches) {
                    indexActiveBlock = i
                    chooseActiveMobileBlock()
                    scrollToBlockMobile()
                }
            })
        }
    })

    function chooseActiveMobileBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.remove('block_active-mobile')
            block.classList.add('block_hide')
            if (indexActiveBlock === i) {
                block.classList.add('block_active-mobile')
                block.classList.remove('block_hide')
            }
            if (block.querySelector('.inner-block__pagination')!==null) {
                block.querySelector('.inner-block__pagination').parentNode.insertBefore(block.querySelector('.inner-block__pagination'),block.querySelector('.inner-block__row'))
            }
        })
    }

    function chooseActiveBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.add('block_hide')
            if (block.querySelector('.change-block-btn_next') !== null) {
                block.querySelector('.change-block-btn_next').classList.remove('change-block-btn__fixed')
            }
            if (block.querySelector('.change-block-btn_prev') !== null) {
                block.querySelector('.change-block-btn_prev').classList.remove('change-block-btn__fixed')
            }

            if (indexActiveBlock === i) {
                block.classList.remove('block_hide')
                if (block.querySelector('.change-block-btn_next') !== null) {
                    block.querySelector('.change-block-btn_next').classList.add('change-block-btn__fixed')
                }
                if (block.querySelector('.change-block-btn_prev') !== null) {
                    block.querySelector('.change-block-btn_prev').classList.add('change-block-btn__fixed')
                }
            }
        })
    }

    function scrollToBlockMobile() {
        $('html, body').animate({
            scrollTop: $(allBlocks[indexActiveBlock]).offset().top - 50
        }, {
            duration: 1000,
            easing: 'swing'
        });
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

    if (window.matchMedia('(min-width: 768px)').matches) document.body.style.overflow = 'hidden';

    document.querySelector('.saying-block__btn').addEventListener('click', function () {
        if (!freeWatch && window.matchMedia('(min-width: 768px)').matches) {
            indexActiveBlock = 1
            scrollToBlock()
            setTimeout(chooseActiveBlock, 500)
        } else {
            $('html, body').animate({
                scrollTop: $(allBlocks[1]).offset().top - 120
            }, {
                duration: 1000,
                easing: 'swing'
            });
        }
    });

    allNextButtons.forEach((btn, i) => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            btn.textContent = allBlocks[i + 2].querySelector('.inner-block__title').textContent
            btn.addEventListener('click', function () {
                indexActiveBlock++
                chooseActiveMobileBlock()
                scrollToBlockMobile()
            })
        } else {
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
        }
    })

    allPrevButtons.forEach((btn, i) => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            btn.textContent = allBlocks[i + 1].querySelector('.inner-block__title').textContent
            btn.addEventListener('click', function () {
                indexActiveBlock--
                chooseActiveMobileBlock()
                scrollToBlockMobile()
            })
        } else {
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
        }
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
