import {groq} from 'next-sanity'

export const getAllProjectsQuery = groq`
  *[_type == "project"]{
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
    contentBlocks[]{
      _type,
      _key,
      _type == "fullWidthImage" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        imageSize
      },
      _type == "twoColumnImage" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt        
      },
      _type == "centeredImage" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        maxWidth
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        size
      },
      _type == "imageQuoteImage" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        quote,
        attribution,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt,
        layout
      },
      _type == "threeImages" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        centerImage{
          asset->{
            _id,
            url
          }
        },
        centerAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt
      },
      _type == "quoteTwoImages" => {
        quote,
        attribution,
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt,
        layout
      },
      _type == "imageText" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        text,
        layout
      }
    }
  }
`

export const getAboutPageQuery = groq`
  *[_type == "about"][0]{
    _id,
    title,
    slug,
    contentBlocks[]{
      _type,
      _key,
      _type == "fullWidthImage" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt
      },
      _type == "twoColumnImage" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt        
      },
      _type == "centeredImage" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        maxWidth
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        size
      },
      _type == "imageQuoteImage" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        quote,
        attribution,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt,
        layout
      },
      _type == "threeImages" => {
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        centerImage{
          asset->{
            _id,
            url
          }
        },
        centerAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt
      },
      _type == "quoteTwoImages" => {
        quote,
        attribution,
        leftImage{
          asset->{
            _id,
            url
          }
        },
        leftAlt,
        rightImage{
          asset->{
            _id,
            url
          }
        },
        rightAlt,
        layout
      },
      _type == "imageText" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        text,
        layout
      }
    }
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
  "allProjects": *[_type == "project"] | order(_createdAt asc){
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
