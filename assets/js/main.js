"use strict"

window.addEventListener("DOMContentLoaded", () => {
    let allBlocks = document.querySelector('.content').querySelectorAll('.block');
    let allNextButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_next');
    let allPrevButtons = document.querySelector('.content').querySelectorAll('.change-block-btn_prev');
    let indexActiveBlock = 1

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    allBlocks.forEach((block, i) => {
        if (block.querySelector('.inner-block_tower') !== null) {
            block.querySelector('.popup-close__mobile').addEventListener('click', function () {
                block.classList.remove('block_active-mobile')
                allBlocks.forEach(currentBlock => {
                    currentBlock.classList.remove('block_hide')
                })
            })

            block.querySelector('.inner-block_tower').addEventListener('click', event => {
                if (window.matchMedia('(min-width: 768px)').matches) {
                    indexActiveBlock = i
                    chooseActiveBlock()
                }

                if (window.matchMedia('(max-width: 767px)').matches) {
                    indexActiveBlock = i
                    chooseActiveMobileBlock()
                    scrollToBlock(-50)
                }
            })
            createSliderInBlocks(block)
        }
    })

    function createSliderInBlocks(block) {
        let allSlides = block.querySelectorAll('.inner-block__slide')

        if (allSlides !== null && allSlides.length > 1) {
            let currentPagination = createPagination(block, allSlides.length),
                allPaginationButtons = currentPagination.querySelectorAll('.inner-block__pagination-button')

            allPaginationButtons[0].classList.add('inner-block__pagination-button_active')

            allSlides.forEach((slide, i) => {
                if (!allPaginationButtons[i].classList.contains('inner-block__pagination-button_active')) {
                    slide.classList.add('inner-block__slide_hide')
                }
            })

            allPaginationButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    allSlides.forEach((slide, i) => {
                        if (!allPaginationButtons[i].classList.contains('inner-block__pagination-button_active')) {
                            slide.style.animation = 'hide 3s'
                            slide.classList.add('inner-block__slide_hide')
                        } else {
                            slide.style.animation = 'show 3s'
                            slide.classList.remove('inner-block__slide_hide')
                        }
                    })
                })
            })

        }
    }

    function createPagination(parentBlock, length) {
        let paginationInnerHTML = '',
            pagination = parentBlock.querySelector('.inner-block__pagination'),
            allPaginationButtons
        for (let i = 0; i < length; i++) {
            paginationInnerHTML += '<button class="inner-block__pagination-button"/>'
        }

        pagination.innerHTML = paginationInnerHTML

        allPaginationButtons = pagination.querySelectorAll('.inner-block__pagination-button')

        allPaginationButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                allPaginationButtons.forEach(button => {
                    button.classList.remove('inner-block__pagination-button_active')
                })
                btn.classList.add('inner-block__pagination-button_active')
            })
        })

        return pagination
    }

    function chooseActiveMobileBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.remove('block_active-mobile')
            block.classList.add('block_hide')
            if (indexActiveBlock === i) {
                block.classList.add('block_active-mobile')
                block.classList.remove('block_hide')
            }
            if (block.querySelector('.inner-block__pagination') !== null) {
                block.querySelector('.inner-block__pagination').parentNode.insertBefore(block.querySelector('.inner-block__pagination'), block.querySelector('.inner-block__row'))
            }
        })
    }

    function chooseActiveBlock() {
        allBlocks.forEach((block, i) => {
            block.classList.add('block_hide')

            if (indexActiveBlock === i) {
                block.classList.remove('block_hide')
                if (block.querySelector('.change-block-btn_next') !== null) {
                    block.querySelector('.change-block-btn_next').classList.add('change-block-btn__absolute')
                }
                if (block.querySelector('.change-block-btn_prev') !== null) {
                    block.querySelector('.change-block-btn_prev').classList.add('change-block-btn__absolute')
                }
                if (block.querySelector('.tower-inner-image') !== null) {
                    block.querySelector('.tower-inner-image').style.opacity = 1
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
    }

    function firstScroll() {
        if (window.matchMedia('(min-width: 768px)').matches) {
            indexActiveBlock = 9
            chooseActiveBlock()
            document.body.style.overflow = 'hidden'
        }

        $('html, body').animate({
            scrollTop: $(allBlocks[9]).offset().top - 250
        }, {
            duration: 7000,
            easing: 'swing'
        });

        document.body.style.overflow = 'auto'
    }

    window.addEventListener('scroll', firstScroll, {once: true})

    document.querySelector('.saying-block__btn').addEventListener('click', () => {
        window.removeEventListener('scroll', firstScroll)
        firstScroll()
    }, {once: true});

    allNextButtons.forEach((btn, i) => {
        if (window.matchMedia('(max-width: 767px)').matches) {
            btn.textContent = allBlocks[i + 2].querySelector('.inner-block__title').textContent
            btn.addEventListener('click', function () {
                indexActiveBlock++
                chooseActiveMobileBlock()
                scrollToBlock(-50)
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
                scrollToBlock(-50)
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
