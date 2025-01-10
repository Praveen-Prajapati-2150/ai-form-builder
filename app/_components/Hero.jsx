'use client';
import React, { useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const getRandomLightColor = () => {
    const letters = 'BCDEF';
    const color =
      '#' +
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    return color;
  };

  console.log(getRandomLightColor());
  console.log({ isHovered });

  return (
    <section className="bg-gray-50 ">
      <div className="mx-auto lg:flex flex h-[90vh] w-full ">
        {/* <div
          // className={`absolute flex flex-wrap ${isHovered ? 'bg-red-200' : ''}`}
          className="absolute flex flex-wrap"
        >
          {Array.from({ length: 105 }).map((_, index) => (
            <div
              className={`
                 border h-[100px] w-[100px] rounded-lg flex-grow               
                transition-all duration-300 ease-in-out text-gray-500 hover:text-blue-500 hover:duration-1000;
                 `}
            />
          ))}
        </div> */}
        <div
          className="flex items-center justify-center flex-col mx-auto max-w-xl text-center"
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-3xl w-full text-center font-extrabold sm:text-5xl">
            Create your Form
            <strong className="font-extrabold text-primary sm:block">
              In Seconds Not in Hours
            </strong>
          </h1>

          <p className="mt-4 h-auto sm:text-xl/relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="#"
            >
              + Create AI Form
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
