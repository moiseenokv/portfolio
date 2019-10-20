const eduButton = document.querySelector('.education__eduButton');
const eduContent = document.querySelector('.education__content');

const slideLeft = document.querySelector('.projects__slider__nav__prev');  
const slideRight = document.querySelector('.projects__slider__nav__next');
const slider = document.querySelector('.projects__slider');

let offsetTouchBegin, offsetTouchEnd;

const slideActionLeft = () => {
    event.preventDefault();
    const slides = document.querySelector('.project__slider__items');
    const curSlide = document.querySelector('.project__slider__item.project__slider__item--show');
    const curSlideNumber = parseInt(curSlide.getAttribute('data-slide'));
    const slidesCount = parseInt(slides.childElementCount);

    if(curSlideNumber > 1){
        curSlide.classList.remove('project__slider__item--show');
        slides.children[curSlideNumber-1].classList.add('project__slider__item--show');
    }

    if(curSlideNumber == 1){
            curSlide.classList.remove('project__slider__item--show');
            slides.children[slidesCount-1].classList.add('project__slider__item--show');
    }
}

const slideActionRight = () => {
    const slides = document.querySelector('.project__slider__items');
    const curSlide = document.querySelector('.project__slider__item.project__slider__item--show');
    const curSlideNumber = parseInt(curSlide.getAttribute('data-slide'));

    if(curSlideNumber < slides.childElementCount){
        curSlide.classList.remove('project__slider__item--show');
        slides.children[curSlideNumber].classList.add('project__slider__item--show');
    }else{
        curSlide.classList.remove('project__slider__item--show');
        slides.children[0].classList.add('project__slider__item--show');
    }
}

const slideLeftListner = (event)=>{
    event.preventDefault();
    slideActionLeft();

}

const slideRightListner = (event)=>{
    event.preventDefault();
    slideActionRight();
}

const eduButtonListner = () => {
    eduContent.classList.toggle('education__content--hide');
}

const handleTouchStartListner = (event) =>{
    var touch = event.touches[0] || event.changedTouches[0];
    offsetTouchBegin = touch.pageX
    console.log('start', touch.pageX);
}

const handleTouchMoveListner = (event) =>{
    var touch = event.touches[0] || event.changedTouches[0];
    offsetTouchEnd = touch.pageX
}

const handleTouchEndListner = () =>{
    if((offsetTouchEnd-offsetTouchBegin)>0){
        slideActionLeft();
    }

    if((offsetTouchEnd-offsetTouchBegin)<0){
        slideActionRight();
    }
}


eduButton.addEventListener('click', eduButtonListner);

slideLeft.addEventListener('click', slideLeftListner);
slideRight.addEventListener('click', slideRightListner);

slider.addEventListener('touchstart', handleTouchStartListner, false);        
slider.addEventListener('touchmove', handleTouchMoveListner, false);
slider.addEventListener('touchend', handleTouchEndListner, false); 