import { sanityClient } from 'sanity:client'
import { defineQuery } from 'groq'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const LISTINGS_QUERY = defineQuery(`*[_type == "listing" && status == "available"] | order(price asc){
  _id,
  address,
  price,
  beds,
  baths,
  sqft,
  description,
  status,
  "image": image {
    asset->{ _id, url },
    alt
  }
}`)

const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  heroTitle,
  heroSubtitle,
  agents[]->{
    _id,
    name,
    role,
    bio,
    "image": image {
      asset->{ _id, url },
      alt
    }
  },
  quoteTitle,
  quoteText
}`)

export interface Listing {
  _id: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  description: string | null
  status: 'available' | 'sold'
  image: {
    asset: { _id: string; url: string }
    alt: string | null
  } | null
}

export interface Agent {
  _id: string
  name: string
  role: string
  bio: string | null
  image: {
    asset: { _id: string; url: string }
    alt: string | null
  } | null
}

export interface AboutPage {
  heroTitle: string
  heroSubtitle: string | null
  agents: Agent[]
  quoteTitle: string | null
  quoteText: string | null
}

export async function getListings(): Promise<Listing[]> {
  return await sanityClient.fetch(LISTINGS_QUERY)
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return await sanityClient.fetch(ABOUT_PAGE_QUERY)
}

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
