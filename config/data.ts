interface Blog {
  id: number
  date: string
  slug: string
  name: string
  shortDescription: string
  longDescription?: string
  image: string
}

const blogs: Blog[] = [
  {
    id: 1,
    date: "25 February 2025",
    slug: "the-future-of-work-why-integrating-coworking-spaces-into-office-buildings-is-a-game-changer",
    name: "The Future of Work: Why Integrating Coworking Spaces into Office Buildings is a Game Changer",
    shortDescription: "How coworking spaces in office buildings can enhance collaboration, flexibility, and cost-efficiency.",
    image: "/images/future-of-office.webp"
  },
  {
    id: 2,
    date: "01 July 2025",
    slug: "understanding-the-shift-in-office-leasing-trends",
    name: "Understanding the Shift in Office Leasing Trends: What It Means for Landlords",
    shortDescription: "These shifts aren't limited to coworking alone. Conventional leases, which used to lock tenants in for 5+ years, are also being affected.",
    image: "/images/office-trends.jpg"
  },
  {
    id: 3,
    date: "18 August 2025",
    slug: "five-key-considerations-when-creating-productive-and-flexible-office-space",
    name: "5 Key Considerations When Creating Productive and Flexible Office Space",
    shortDescription: "When creating productive and flexible office space, there are five major areas that must be carefully considered: people, culture, space, technical requirements, and time frame.",
    image: "/images/blog-three.jpeg"
  },
  {
    id: 4,
    date: "25 November 2025",
    slug: "tackling-noise-in-open-plan-offices-with-purpose-built-phone-booths",
    name: "Tackling Noise in Open-Plan Offices: The Smart Solution with Phone Booths",
    shortDescription: "How purpose-built phone booths can improve focus, comfort, and productivity in open-plan offices.",
    image: "/images/blogFour.jpg"
  }
]

export default blogs
export type { Blog }
