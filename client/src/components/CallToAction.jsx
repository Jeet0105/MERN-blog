import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center border border-teal-500 rounded-tl-3xl rounded-br-3xl py-2">
        <div className="flex flex-col items-center md:items-start gap-3">
            <h2 className="text-xl">Want to learn more about javascript?</h2>
            <p className="text-gray-500">Check out our javascript Projects</p>
            <Button gradientDuoTone="purpleToPink" className="w-full">Learn More</Button>
        </div>
        <div className="p-7">
            <img src="https://tse1.mm.bing.net/th?id=OIP.BMXxh0nGocZLZfbY8m17UwAAAA&pid=Api&P=0&h=220" />
        </div>
    </div>
  )
}
