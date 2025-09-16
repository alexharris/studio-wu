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
    }
  }
`
