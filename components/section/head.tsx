"use client"
import parse from "html-react-parser"
import SearchField from "../search/searchField"
import { LayoutMode } from "./default"
import styles from "./section.module.scss"

interface SectionHeadProps {
  title: string
  permalink: string
  description?: string | null
  sponsor?: string | null
  hasMultipleLayouts: boolean
  layoutMode: LayoutMode
  setLayoutMode: (mode: LayoutMode) => void
}

const SectionHead = (props: SectionHeadProps) => {
  const { title, description, sponsor, hasMultipleLayouts, layoutMode, setLayoutMode } = props

  // Functions to toggle between layout modes
  const handleGridView = () => hasMultipleLayouts && setLayoutMode(LayoutMode.Grid)
  const handleListView = () => hasMultipleLayouts && setLayoutMode(LayoutMode.List)

  return (
    <>
      <div className="px-3 tablet:px-6 sticky top-11 tablet-lg:top-13 z-10 section-head">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="col-span-4 tablet-lg:col-span-12">
            <div className="flex justify-between items-center space-x-6 py-3 pb-1.5 tablet:pb-3 tablet:pt-6">
              <div className="space-y-1 tablet:w-2/3 desktop:w-1/2">
                <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
              </div>
              <div className="flex space-x-3">
                {hasMultipleLayouts && (
                  <div className="flex space-x-3">
                    <button onClick={handleGridView} className="">
                      <BlockIcon active={layoutMode === LayoutMode.Grid} />
                    </button>
                    <button onClick={handleListView} className="">
                      <ListIcon active={layoutMode === LayoutMode.List} />
                    </button>
                  </div>
                )}
                <div className="hidden tablet-lg:block w-72 desktop:w-96">
                  <SearchField />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(description || sponsor) && (
        <div className="p-3 tablet:px-6">
          {description && <div className={styles.description}>{parse(description)}</div>}
          {sponsor && <div className={styles.sponsor}>{parse(sponsor)}</div>}
        </div>
      )}
    </>
  )
}

interface IconProps {
  active: boolean
}

const BlockIcon = ({ active }: IconProps) => {
  const fill = active ? "#18181B" : "white"
  const stroke = active ? "white" : "#18181B"
  return (
    <svg
      className={`shadow-lg`}
      width="42"
      height="43"
      viewBox="0 0 42 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.589355" width="42" height="42" rx="2" fill={fill} />
      <path
        d="M17.6667 6.58936H6V18.256H17.6667V6.58936Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 6.58936H24.3333V18.256H36V6.58936Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 24.9227H24.3333V36.5894H36V24.9227Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6667 24.9227H6V36.5894H17.6667V24.9227Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ListIcon = ({ active }: IconProps) => {
  const fill = active ? "#18181B" : "white"
  const stroke = active ? "white" : "#18181B"
  return (
    <svg
      className="shadow-lg"
      width="42"
      height="43"
      viewBox="0 0 42 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.589355" width="42" height="42" rx="2" fill={fill} />
      <path
        d="M14.3333 12.5894H36M14.3333 21.5894H36M14.3333 30.5894H36M6 12.5894H6.01667M6 21.5894H6.01667M6 30.5894H6.01667"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SectionHead
