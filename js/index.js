const isMobile = () => {
    if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
      return true;
      }
   return false;
}

const mainPage = () =>{
    const eduButton = document.querySelector('.education__eduButton');
    const eduContent = document.querySelector('.education__content');
    const slideLeft = document.querySelector('.projects__slider__nav__prev');  
    const slideRight = document.querySelector('.projects__slider__nav__next');
    const slider = document.querySelector('.projects__slider');
    const projectButton = document.getElementsByClassName('cta');

    let offsetTouchBegin, offsetTouchEnd;
    const storage = window.localStorage;
    storage.setItem('projectUrl', 'https://tender-mahavira-3d325c.netlify.com/theyalow');

    const slideActionLeft = () => {
        event.preventDefault();
        const slides = document.querySelector('.project__slider__items');
        const curSlide = document.querySelector('.project__slider__item.project__slider__item--show');
        const curSlideNumber = parseInt(curSlide.getAttribute('data-slide'));
        const slidesCount = parseInt(slides.childElementCount);

        if(curSlideNumber > 1){
            curSlide.classList.remove('project__slider__item--show');
            slides.children[curSlideNumber-2].classList.add('project__slider__item--show');
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

    const projectButtonListner = (event) =>{
        event.preventDefault();
        storage.setItem('projectUrl', event.target.href);
        window.location.href='projects.html';
    }

    eduButton.addEventListener('click', eduButtonListner);
    slideLeft.addEventListener('click', slideLeftListner);
    slideRight.addEventListener('click', slideRightListner);
    slider.addEventListener('touchstart', handleTouchStartListner, false);        
    slider.addEventListener('touchmove', handleTouchMoveListner, false);
    slider.addEventListener('touchend', handleTouchEndListner, false);
    Object.values(projectButton).map((button)=>{
        button.addEventListener('click', projectButtonListner);
    });
}

const projectPage = () => {
    const buttonBack = document.querySelector('.tools__back');
    const buttonResize = document.querySelector('.tools__resize');
    
    buttonBackListner = (event) =>{
        event.preventDefault();
        window.location.href = "index.html";
    }

    buttonResizeListner = (event) =>{
        event.preventDefault();
        const frame = document.querySelector('iframe');
        if(event.target.innerText == "Mobile"){
            frame.width = 640;
            event.target.innerText = "Desktop";
        }else{
            frame.width = 1440;
            event.target.innerText = "Mobile";
        }

        frame.height = window.innerHeight;
    }

    addEventListener("DOMContentLoaded", function() {
        const frame = document.querySelector('iframe');
        const storage = window.localStorage;
        frame.src = storage.getItem('projectUrl');
        if(isMobile()==true){
            frame.width = 640;
            frame.height = window.innerHeight;
            buttonResize.style.display = 'none';
        }else{
            frame.width = 1440;
            buttonResize.style.display = 'block';
            frame.height = window.innerHeight;
        }
        

        
    });

    buttonBack.addEventListener('click', buttonBackListner);
    buttonResize.addEventListener('click', buttonResizeListner);
}

const slider = document.querySelector('.projects__slider');
if(slider == null){
    projectPage();
}else{
    mainPage();
}
