import Link from "next/link"
import styles from "./articleBar.module.scss"
interface ArticleBarProps {
  goToNextArticle: () => void
  goToPrevArticle: () => void
  collectionPermalink: string
}

const ArticleBar = (props: ArticleBarProps) => {
  const { goToNextArticle, goToPrevArticle } = props

  const marqueeText = `Get notified when our next issue drops`
  const renderMarqueeItems = () => {
    const items = []
    for (let i = 0; i < 4; i++) {
      items.push(
        <p key={`text-${i}`} aria-hidden={i !== 0 ? "true" : undefined}>
          <Link href={`/subscribe`} prefetch={false}>
            {marqueeText}
          </Link>
        </p>,
        <p key={`character-${i}`} aria-hidden="true">
          <span>&#10140;</span>
        </p>,
      )
    }
    return items
  }

  return (
    <div
      className={`article-bar border-t bottom-0 rail-border fixed w-full left-1/2 transform -translate-x-1/2 flex justify-center`}
    >
      <div className="py-1.5 px-3 flex justify-between space-x-1.5 w-full">
        <p
          className="flex-none w-[42px] h-[42px] shadow-lg rounded-sm flex items-center justify-center cursor-pointer"
          onClick={goToPrevArticle}
        >
          <svg className="w-[42px] h-[42px]" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.64645 12.6464C4.45118 12.8417 4.45118 13.1583 4.64645 13.3536L7.82843 16.5355C8.02369 16.7308 8.34027 16.7308 8.53553 16.5355C8.7308 16.3403 8.7308 16.0237 8.53553 15.8284L5.70711 13L8.53553 10.1716C8.7308 9.97631 8.7308 9.65973 8.53553 9.46447C8.34027 9.2692 8.02369 9.2692 7.82843 9.46447L4.64645 12.6464ZM23 13.5C23.2761 13.5 23.5 13.2761 23.5 13C23.5 12.7239 23.2761 12.5 23 12.5V13.5ZM5 13.5H23V12.5H5V13.5Z"
              className="fill-zinc-900 dark:fill-slate-50"
            />
          </svg>
        </p>

        <div
          className={`w-full h-[40px] shadow-lg rounded-sm flex items-center justify-center overflow-x-auto no-scrollbar`}
        >
          <div className={styles.marquee_text}>
            <div className={styles.marquee_text_track}>{renderMarqueeItems()}</div>
          </div>
        </div>
        <p
          className="flex-none w-[42px] h-[42px] shadow-lg rounded-sm flex items-center justify-center cursor-pointer"
          onClick={goToNextArticle}
        >
          <svg className="w-[42px] h-[42px]" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12.5C4.72386 12.5 4.5 12.7239 4.5 13C4.5 13.2761 4.72386 13.5 5 13.5V12.5ZM23.3536 13.3536C23.5488 13.1583 23.5488 12.8417 23.3536 12.6464L20.1716 9.46447C19.9763 9.2692 19.6597 9.2692 19.4645 9.46447C19.2692 9.65973 19.2692 9.97631 19.4645 10.1716L22.2929 13L19.4645 15.8284C19.2692 16.0237 19.2692 16.3403 19.4645 16.5355C19.6597 16.7308 19.9763 16.7308 20.1716 16.5355L23.3536 13.3536ZM5 13.5H23V12.5H5V13.5Z"
              className="fill-zinc-900 dark:fill-slate-50"
            />
          </svg>
        </p>
      </div>
    </div>
  )
}

export default ArticleBar
