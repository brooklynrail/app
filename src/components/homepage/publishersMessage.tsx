import { HomepageProps } from "@/pages"
import PromoThumb from "../promo/thumb"

const PublishersMessage = (props: HomepageProps) => {
  const { currentIssue, publishersMessage, dateSlug } = props

  return (
    <div className="collection">
      <h3>From the Publisher & Artistic Director</h3>
      <PromoThumb article={publishersMessage[0]} dateSlug={dateSlug} showImage={false} showSection={false} />
    </div>
  )
}

export default PublishersMessage
