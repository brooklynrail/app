import { Articles } from "../../../../lib/types"

const BookshopWidget = (props: Articles) => {
  const { isbn } = props

  if (!isbn) {
    return null
  }

  return (
    <div id="bookshop-widget">
      <iframe
        scrolling="no"
        src={`https://bookshop.org/widgets/book/book/24114/${isbn}`}
        width="450"
        height="268"
      ></iframe>
    </div>
  )
}

export default BookshopWidget
