import Link from "next/link"

const OldNav = () => {
  return (
    <nav className="w-full tablet-lg:w-auto !mx-0">
      <ul className="flex w-full tablet-lg:justify-end items-center text-xs tablet:text-sm uppercase font-medium justify-between tablet:space-x-4 text-red-500 dark:text-slate-100">
        <li>
          <Link href="/about" title="About">
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link href="https://brooklynrail.org/events" title="Events">
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link href="https://mailchi.mp/brooklynrail/join/" title="Subscribe to our newsletter">
            <span>Newsletter</span>
          </Link>
        </li>
        <li>
          <Link href="https://shop.brooklynrail.org/products/subscription" title="Subscribe">
            <span>Subscribe</span>
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://shop.brooklynrail.org" title="Shop">
            <span>Shop</span>
          </Link>
        </li>
        <li className="bg-red-500 dark:bg-slate-100 px-4 py-2 rounded-sm text-white dark:text-zinc-900">
          <Link className="hover:text-white dark:hover:text-zinc-900" href="/donate" title="Donate">
            <span>Donate</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default OldNav
