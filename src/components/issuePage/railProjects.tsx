import Link from "next/link"
import Image from "next/image"

const RailProjects = () => {
  return (
    <div className="related rail_projects">
      <Link href="https://shop.brooklynrail.org/collections/books" target="out-rail">
        <Image src="/images/banners-left/Rail-Ed-WEB.jpg" width={120} height={73} alt="Rail Editions" />
      </Link>

      <Link href="http://curatorialprojects.brooklynrail.org/occupy-mana" target="out-rail">
        <Image
          src="/images/banners-left/rail_curatorial_projects_logo.png"
          width={120}
          height={81}
          alt="Rail Curatorial Projects"
        />
      </Link>

      <Link href="https://brooklynrail.org/special/RIVER_RAIL/">
        <Image src="/images/banners-left/river-rail-logo.png" width={120} height={20} alt="River Rail" />
      </Link>

      <Link href="http://miamirail.org/" target="out-rail">
        <Image src="/images/banners-left/miami_rail_logo.png" width={120} height={34} alt="Miami Rail" />
      </Link>

      <Link href="http://thirdrailquarterly.org/" target="out-rail">
        <Image src="/images/banners-left/third_rail_logo.jpg" width={120} height={87} alt="Third Rail" />
      </Link>
    </div>
  )
}

export default RailProjects
