"use client"
import { useForm } from "react-hook-form"
import Navbar from "@/components/Navbar";

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data)

  return (<>
    <Navbar />

    {/* HERO Section */}
    <div className="text-center mt-10">
      <h1 className="text-3xl md:text-5xl font-extrabold">A URL Shortener.</h1>
      <p className="text-2xl md:text-3xl">No BS. No log-in required.</p>
    </div>

    {/* INPUT Section */}
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 justify-center items-center'>
        <input type='text' {...register("longURL")} placeholder='Enter the long URL' className='max-w-[70vw] pl-2 py-1 border border-white rounded-lg ring-1 ring-gray-900 hover:ring-gray-300 focus:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300' />
        <input type='text' {...register("keyword")} placeholder='Enter preferred URL keyword' className='max-w-[70vw] pl-2 py-1 border border-white rounded-lg ring-1 ring-gray-900 hover:ring-gray-300 focus:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300' />

        <button type="submit" className='bg-white text-black font-bold text-xl px-7 py-1 rounded-sm ring-1 ring-gray-900 hover:ring-gray-300 hover:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300'>Generate</button>
      </form>
    </div>

    {/* FOOTER Section */}
    <div className="text-white text-center py-5 mt-auto flex flex-col justify-center items-center">
      <p className=" font-bold ">&copy; ShawtY</p>
      <p>All rights reserved by Yashwanth M</p>
    </div>

  </>);
}
