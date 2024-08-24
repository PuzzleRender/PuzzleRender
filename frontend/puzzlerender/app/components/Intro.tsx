"use client"

import { Parallax } from 'react-parallax';

const Intro = () => {
  return (
    <div className='w-full h-[50vh]'>
      <Parallax
        blur={8}
        bgImage="/intro2.jpg"
        bgImageAlt="library"
        strength={200}
      >
        <div className='text-5xl font-bold text-center flex items-center justify-center w-full h-[50vh] text-white'>
            WELCOME <br /> TO <br />PUZZLERENDER
        </div>
      </Parallax>
    </div>
  );
}

export default Intro
