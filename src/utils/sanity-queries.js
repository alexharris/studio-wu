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
        caption
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
        caption,
        maxWidth
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        size
      },
      _type == "imageQuote" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        quote,
        attribution,
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
        alt,
        caption
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
        caption,
        maxWidth
      },
      _type == "pullQuote" => {
        quote,
        attribution,
        size
      },
      _type == "imageQuote" => {
        image{
          asset->{
            _id,
            url
          }
        },
        alt,
        quote,
        attribution,
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
