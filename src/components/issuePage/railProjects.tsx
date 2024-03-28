import Link from "next/link"

const RailProjects = () => {
  return (
    <div className="related rail_projects">
      <Link href="https://shop.brooklynrail.org/collections/books" target="out-rail">
        <img src="/images/banners-left/Rail-Ed-WEB.jpg" />
      </Link>

      <Link href="http://curatorialprojects.brooklynrail.org/occupy-mana" target="out-rail">
        <img src="/images/banners-left/rail_curatorial_projects_logo.png" />
      </Link>

      <Link href="https://brooklynrail.org/special/RIVER_RAIL/">
        <img src="/images/banners-left/river-rail-logo.png" />
      </Link>

      <Link href="http://miamirail.org/" target="out-rail">
        <img src="/images/banners-left/miami_rail_logo.png" />
      </Link>

      <Link href="http://thirdrailquarterly.org/" target="out-rail">
        <img src="/images/banners-left/third_rail_logo.jpg" />
      </Link>
    </div>
  )
}

export default RailProjects
