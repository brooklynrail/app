import Link from "next/link"
import styles from "../header/header.module.scss"

interface ButtonProps {
  text: string
  permalink: string
}

const Button = (props: ButtonProps) => {
  const { text, permalink } = props

  return (
    <Link href={permalink}>
      <button className={styles.button}>{text}</button>
    </Link>
  )
}

export default Button
