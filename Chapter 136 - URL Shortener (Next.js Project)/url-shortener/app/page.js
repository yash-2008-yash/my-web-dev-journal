"use client"
import { useForm } from "react-hook-form"
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();
  const [shortURL, setShortURL] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [copyLogo, setCopyLogo] = useState("/copy-to-clipboard.png")


  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL)
    setCopied(true)
    setCopyLogo("/copied.png")

    setTimeout(() => {
      setCopied(false)
      setCopyLogo("/copy-to-clipboard.png")
    }, 2000)
  }


  const onSubmit = async (data) => {
    setErrorMessage("")
    setSuccessMessage("")

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()

    if (!result.success) {
      setErrorMessage("URL is already taken! Choose another keyword.")
      return;
    }

    setShortURL(`${process.env.NEXT_PUBLIC_HOST}/${result.keyword}`)
    setSuccessMessage("Your Short URL:")
    reset()
  }


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

        <input type='text'
          {...register("longURL", {
            required: { value: true, message: "Long URL field must be filled!" }
          })}
          placeholder='Enter the long URL'
          className='max-w-[70vw] pl-2 py-1 border border-white rounded-lg ring-1 ring-gray-900 hover:ring-gray-300 focus:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300'
        />

        <input type='text'
          {...register("keyword", {
            required: { value: true, message: "Keyword field must be filled!" }
          })}
          placeholder='Enter preferred URL keyword'
          className='max-w-[70vw] pl-2 py-1 border border-white rounded-lg ring-1 ring-gray-900 hover:ring-gray-300 focus:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300'
        />

        <button type="submit"
          disabled={isSubmitting}
          className='bg-white text-black font-bold text-xl px-7 py-1 rounded-sm ring-1 ring-gray-900 hover:ring-gray-300 hover:shadow-[0_0_20px_4px_rgba(107,114,128,0.4)] transition-all duration-300'
        >
          Generate
        </button>

        {errors.longURL &&
          <div className="text-red-600">
            WARNING: {errors.longURL.message}
          </div>
        }

        {errors.keyword &&
          <div className="text-red-600">
            WARNING: {errors.keyword.message}
          </div>
        }

        {isSubmitting &&
          <div className="text-gray-400">Loading...</div>
        }

        {successMessage &&
          <div className="text-gray-400 mt-5 text-xl text-center">
            {successMessage}
          </div>
        }

      </form>

      {shortURL &&
        <div className="flex justify-center items-center gap-5 bg-black py-4 px-7 rounded-lg w-fit mx-auto">
          <code>{shortURL}</code>

          <button onClick={handleCopy}>
            <Image src={copyLogo} width={20} height={20} alt={"Copy"} />
          </button>

        </div>
      }

      {errorMessage &&
        <div className="text-red-500 text-xl mt-5 text-center">
          {errorMessage}
        </div>
      }

    </div>

    {/* FOOTER Section */}
    <div className="text-white text-center py-5 mt-auto flex flex-col justify-center items-center">
      <p className=" font-bold ">&copy; ShawtY</p>
      <p>All rights reserved by Yashwanth M</p>
    </div>

  </>);
}
