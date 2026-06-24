import { sanityClient } from 'sanity:client'
import { defineQuery } from 'groq'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const IMAGE_PROJECTION = `asset->{ _id, url }, alt`

const LISTINGS_QUERY = defineQuery(`*[_type == "listing"] | order(price asc){
  _id,
  address,
  price,
  beds,
  baths,
  sqft,
  description,
  status,
  "images": coalesce(images[]{ ${IMAGE_PROJECTION} }, [image { ${IMAGE_PROJECTION} }])
}`)

const LISTING_QUERY = defineQuery(`*[_type == "listing" && _id == $id][0]{
  _id,
  address,
  price,
  beds,
  baths,
  sqft,
  description,
  status,
  "images": coalesce(images[]{ ${IMAGE_PROJECTION} }, [image { ${IMAGE_PROJECTION} }])
}`)

const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"]{
  _id,
  name,
  town,
  quote,
  "image": image {
    asset->{ _id, url },
    alt
  }
}`)

const AGENTS_QUERY = defineQuery(`*[_type == "agent"] | order(order asc){
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
  status: 'available' | 'pending' | 'sold'
  images: Array<{
    asset: { _id: string; url: string }
    alt: string | null
  }> | null
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

export interface Testimonial {
  _id: string
  name: string
  town: string | null
  quote: string | null
  image: {
    asset: { _id: string; url: string }
    alt: string | null
  } | null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return await sanityClient.fetch(TESTIMONIALS_QUERY)
}

export async function getListings(): Promise<Listing[]> {
  return await sanityClient.fetch(LISTINGS_QUERY)
}

export async function getListing(id: string): Promise<Listing | null> {
  return await sanityClient.fetch(LISTING_QUERY, { id })
}

export async function getAgents(): Promise<Agent[]> {
  return await sanityClient.fetch(AGENTS_QUERY)
}

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
