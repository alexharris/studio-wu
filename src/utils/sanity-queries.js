import {groq} from 'next-sanity'

// Fragment for content blocks to avoid repetition
const contentBlocksFragment = groq`
  contentBlocks[]{
    _type,
    _key,
    _type == "twoColumnImage" => {
      leftImage{
        asset,
        crop,
        hotspot
      },
      leftAlt,
      rightImage{
        asset,
        crop,
        hotspot
      },
      rightAlt,
      leftImageSize,
      rightImageSize
    },
    _type == "centeredImage" => {
      image{
        asset,
        crop,
        hotspot
      },
      alt,
      maxWidth,
      imageSize
    },
    _type == "pullQuote" => {
      quote,
      attribution,
      size
    },
    _type == "imageQuoteImage" => {
      leftImage{
        asset,
        crop,
        hotspot
      },
      leftAlt,
      quote,
      attribution,
      rightImage{
        asset,
        crop,
        hotspot
      },
      rightAlt,
      layout
    },
    _type == "threeImages" => {
      leftImage{
        asset,
        crop,
        hotspot
      },
      leftAlt,
      centerImage{
        asset,
        crop,
        hotspot
      },
      centerAlt,
      rightImage{
        asset,
        crop,
        hotspot
      },
      rightAlt
    },
    _type == "quoteTwoImages" => {
      quote,
      attribution,
      leftImage{
        asset,
        crop,
        hotspot
      },
      leftAlt,
      rightImage{
        asset,
        crop,
        hotspot
      },
      rightAlt,
      layout
    },
    _type == "imageText" => {
      image{
        asset,
        crop,
        hotspot
      },
      alt,
      text,
      layout,
      imageSize
    }
  }
`

export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(orderRank){
    _id,
    title,
    slug,
    location,
    featuredImage{
      asset->{
        _id,
        url
      }
    }
  }
`

export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    location,
    featuredImage{
      asset->{
        _id,
        url
      }
    },
    ${contentBlocksFragment}
  }
`

export const getAboutPageQuery = groq`
  *[_type == "about"][0]{
    _id,
    title,
    slug,
    ${contentBlocksFragment}
  }
`

export const getContactPageQuery = groq`
  *[_type == "contact"][0]{
    _id,
    title,
    slug,
    image{
      asset->{
        _id,
        url
      }
    },
    alt
  }
`

export const getAllPressQuery = groq`
  *[_type == "press"] | order(publishedAt desc){
    _id,
    title,
    source,
    image{
      asset->{
        _id,
        url
      }
    },
    link{
      text,
      url
    },
    date
  }
`

export const getAdjacentProjectsQuery = groq`
{
  "currentProject": *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug
  },
  "allProjects": *[_type == "project"] | order(orderRank){
    _id,
    title,
    slug
  }
}`

export const getSettingsQuery = groq`
  *[_type == "settings"][0]{
    phoneNumber,
    emailAddress
  }
`
