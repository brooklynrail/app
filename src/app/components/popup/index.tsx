import React, { useState } from "react"
import Banner from "../header/banner"
import { usePopup } from "../popupProvider"
import NewsLetterSignUpForm from "../newsletterForm"

const DonatePopup = () => {
  const { showPopup, popupType, setShowPopup } = usePopup()
  const [email, setEmail] = useState("") // State to capture email
  const [formStatus, setFormStatus] = useState<string | null>(null) // Status for the form submission

  if (!showPopup || popupType !== "donate") {
    return null
  }

  const donateURL = `${process.env.NEXT_PUBLIC_BASE_URL}/donate?amt=`

  return (
    <div
      className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={() => setShowPopup(false)}
    >
      <div className="rail-header p-6 py-3 w-screen h-mobile-lg bottom-0 absolute" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-3 right-3 text-white font-medium text-4xl rounded-full hover:bg-white hover:bg-opacity-30 px-3 py-1"
          onClick={() => setShowPopup(false)}
        >
          &#x2715;
        </button>
        <div className="space-y-6">
          {/* <Banner /> */}
          <h2 className="text-6xl text-center font-light uppercase">Celebrating 24 Years</h2>
          <div className="space-y-3">
            <p className="uppercase text-2xl text-center">Help us raise $200,000 by December 31</p>
            <div className="bg-gray-200 h-9 w-desktop mx-auto">
              <div
                className="bg-lime-400 h-9 flex justify-end items-center"
                style={{ width: `${(20000 / 200000) * 100}%` }} // Replace 200000 with the actual amount raised
              >
                <span className="pr-3">$20,000</span>
              </div>
            </div>
          </div>
          <p className="uppercase text-center text-lg">
            DONATE to insure that the rail remains
            <br /> FREE and accessible to all, forever
          </p>
          <div className="flex justify-center space-x-9">
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-sm text-md uppercase hover:underline underline-offset-2 font-normal"
              onClick={() => (window.location.href = `${donateURL}25`)}
            >
              Donate $25
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-sm text-md uppercase hover:underline underline-offset-2 font-normal"
              onClick={() => (window.location.href = `${donateURL}100`)}
            >
              Donate $100
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-sm text-md uppercase hover:underline underline-offset-2 font-normal"
              onClick={() => (window.location.href = `${donateURL}250`)}
            >
              Donate $250
            </button>
          </div>

          <div className="pt-3 flex flex-row justify-center items-center relative">
            <div className="flex justify-center">
              <p className="text-lg font-medium text-blue-700 hover:underline">
                Get notified when our 🎉new website 🎉 launches later this month »
              </p>
            </div>
            {/* Add Mailchimp Email Subscription Form */}
            <div className="space-y-1">
              <NewsLetterSignUpForm />

              {/* Show form submission status */}
              {formStatus && (
                <p className={`text-xs ${formStatus === "success" ? "text-green-500" : "text-red-500"}`}>
                  {formStatus === "success" ? "Thank you for subscribing!" : "Subscription failed. Please try again."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatePopup
