import Link from "next/link"

export enum ButtonType {
  Donate = "bg-red-600 text-white",
  Subscribe = "bg-white text-black",
}

interface ButtonProps {
  text: string
  link: string
  type: ButtonType
}

const Button = (props: ButtonProps) => {
  const { text, link, type } = props

  return (
    <Link href={link}>
      <button
        className={`${type} font-medium shadow-xl text-xs tablet:text-sm tablet-lg:text-md desktop:text-lg desktop-lg:text-xl px-2.5 py-1.5 tablet:px-3.5 tablet:py-2 desktop:px-6 desktop:py-3 rounded uppercase hover:underline underline-offset-4`}
      >
        {text}
      </button>
    </Link>
  )
}

export default Button