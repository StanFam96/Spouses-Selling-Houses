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

const AGENTS_QUERY = defineQuery(`*[_type == "agent"] | order(_createdAt desc){
  _id,
  name,
  role,
  bio,
  "image": image {
    asset->{ _id, url },
    alt
  }
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

export async function getListings(): Promise<Listing[]> {
  return await sanityClient.fetch(LISTINGS_QUERY)
}

export async function getAgents(): Promise<Agent[]> {
  return await sanityClient.fetch(AGENTS_QUERY)
}

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
