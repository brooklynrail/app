import { useAdVisibility } from "@/app/hooks/adVisibilityContext"

interface ArticleBarProps {
  goToNextArticle: () => void
  goToPrevArticle: () => void
}

const ArticleBar = (props: ArticleBarProps) => {
  const { goToNextArticle, goToPrevArticle } = props
  const { isAdVisible } = useAdVisibility()

  const bottom = isAdVisible ? "bottom-36" : "bottom-9"
  return (
    <div className={`fixed ${bottom} left-1/2 transform -translate-x-1/2 flex justify-center`}>
      <div className="flex space-x-3">
        <p
          className="w-9 h-9 bg-pink-100 shadow-lg rounded-full flex items-center justify-center cursor-pointer"
          onClick={goToPrevArticle}
        >
          <svg
            className="relative -left-0.5"
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 1L2 11L13 21" stroke="black" strokeWidth="2" />
          </svg>
        </p>
        <p className="w-36 h-9 bg-pink-100 shadow-lg rounded-full flex items-center justify-center"></p>
        <p
          className="w-9 h-9 bg-pink-100 shadow-lg rounded-full flex items-center justify-center cursor-pointer"
          onClick={goToNextArticle}
        >
          <svg
            className="relative left-0.5"
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 21L12 11L1 0.999999" stroke="black" strokeWidth="2" />
          </svg>
        </p>
      </div>
    </div>
  )
}

export default ArticleBar
