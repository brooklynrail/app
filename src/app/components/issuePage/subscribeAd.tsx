import Link from "next/link"
import Image from "next/image"

const SubscribeAd = () => {
  return (
    <div className="grid-row">
      <div className="grid-col-12">
        <div style={{ margin: "25px 0px 25px 30px" }}>
          <Link href="/subscribe">
            <Image src="/images/subscribe-footer.png" alt="Subscribe" width={565} height={105} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SubscribeAd
