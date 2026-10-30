import Link from 'next/link'

export interface LegalSection {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export interface LegalPageContent {
  tag: string
  title: string
  updatedLabel: string
  updatedDate: string
  intro: string[]
  sections: LegalSection[]
  relatedLabel?: string
  relatedLinks?: { label: string; href: string }[]
}

// Shared static layout for legal pages (privacy, cookies). Styling follows
// the site's light content pages (downloads, services).
export default function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <div className="pt-32 md:pt-44">
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44 pb-24 md:pb-32 overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-white">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #7C2D3A 1px, transparent 1px),
                linear-gradient(to bottom, #7C2D3A 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-widest text-red-800">
            {content.tag}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-4 mb-2">
            {content.title}
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            {content.updatedLabel} {content.updatedDate}
          </p>

          <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-transparent w-full max-w-md mb-10" />

          {content.intro.map((paragraph, i) => (
            <p key={i} className="text-base text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          {content.sections.map((section, i) => (
            <section key={i} className="mt-10">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, j) => (
                <p key={j} className="text-base text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-6 flex flex-col gap-2 mb-4">
                  {section.list.map((item, j) => (
                    <li key={j} className="text-base text-gray-700 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {content.relatedLinks && content.relatedLinks.length > 0 && (
            <div className="mt-14 pt-8 border-t border-gray-200">
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {content.relatedLabel}
              </span>
              <div className="flex flex-wrap gap-4 mt-3">
                {content.relatedLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-red-800 font-semibold underline hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
