import styles from "../header/header.module.scss"

interface ButtonProps {
  text: string
}

const Button = (props: ButtonProps) => {
  const { text } = props

  return (
    <>
      <button className={styles.button}>{text}</button>
    </>
  )
}

export default Button
