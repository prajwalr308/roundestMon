import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center"> which pokemon is rounder ?</div>
      <div className='p-2'></div>
      <div className="border rounded p-8 flex justify-between max-w-2xl"> 
        <div className="w-16 h-16 bg-red-200"></div>
        <div className='p-8'>vs</div>
        <div className='w-16 h-16 bg-red-200'></div>

      </div>
      <div></div>
    </div>
  )
}

export default Home
