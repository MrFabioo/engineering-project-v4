import React from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import eiffel from './img/eiffel.jpg';
import mallorca from './img/mallorca.jpg';
import sphinx from './img/sphinx.jpg';
// import './react-carusel.css';

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export const Carusel = () => {
  return (
    <div className='2xl:mx-auto 2xl:container flex justify-center'>
      <div className='2xl:px-20 px-6 py-12 w-full lg:w-4/5'>
        {/* Carousel for Small-Sized Screen */}
        <CarouselProvider
          className='relative block sm:hidden'
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={3}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className='js-flickity flex justify-center items-center'>
            <ButtonBack
              role='button'
              aria-label='slide backward'
              className='w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer'
              id='prev'
            >
              <svg
                width={8}
                height={14}
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 1L1 7L7 13'
                  stroke='black'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </ButtonBack>
            <Slider>
              <Slide index={0}>
                <div className='gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={eiffel}
                      alt='sitting area'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Francja
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={eiffel}
                      alt='sitting area'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Francja
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={1}>
                <div className='gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={mallorca}
                      alt='chairs'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Majorka
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={mallorca}
                      alt='chairs'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Majorka
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide index={2}>
                <div className='gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={sphinx}
                      alt='chair'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Egipt
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={sphinx}
                      alt='chair'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Egipt
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
            </Slider>
            <ButtonNext
              role='button'
              aria-label='slide forward'
              className='w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
              id='next'
            >
              <svg
                width={8}
                height={14}
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L7 7L1 13'
                  stroke='black'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for Medium and Large-Sized Screen */}
        <CarouselProvider
          className='relative hidden sm:block'
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={3}
          visibleSlides={1}
          step={1}
          infinite={true}
          currentSlide={1}
        >
          <div className='js-flickity flex justify-center items-center'>
            <ButtonBack
              role='button'
              aria-label='slide backward'
              className='w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer'
              id='prev'
            >
              <svg
                width={8}
                height={14}
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7 1L1 7L7 13'
                  stroke='black'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </ButtonBack>
            <Slider className='carousel__sliderLarge'>
              <Slide className='carousel__inner-slideLarge' index={0}>
                <div className='gallery-cell w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={eiffel}
                      alt='sitting area'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Francja
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={eiffel}
                      alt='sitting area'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Francja
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide className='carousel__inner-slideLarge' index={1}>
                <div className='gallery-cell w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={mallorca}
                      alt='chairs'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Majorka
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={mallorca}
                      alt='chairs'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Majorka
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide className='carousel__inner-slideLarge' index={2}>
                <div className='gallery-cell w-full h-full'>
                  <div className='relative w-full h-full lg:block hidden'>
                    <img
                      src={sphinx}
                      alt='chair'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Egipt
                      </h1>
                    </div>
                  </div>
                  <div className='relative w-full h-full lg:hidden'>
                    <img
                      src={sphinx}
                      alt='chair'
                      className='object-center object-cover w-full h-full'
                    />
                    <div className='pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0'>
                      <h1 className='text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white'>
                        Egipt
                      </h1>
                    </div>
                  </div>
                </div>
              </Slide>
            </Slider>
            <ButtonNext
              role='button'
              aria-label='slide forward'
              className='w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
              id='next'
            >
              <svg
                width={8}
                height={14}
                viewBox='0 0 8 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L7 7L1 13'
                  stroke='black'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
};
