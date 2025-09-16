import {groq} from 'next-sanity'

export const getAllProjectsQuery = groq`
  *[_type == "project"]{
    _id,
    title,
    location,
    featuredImage{
      asset->{
        _id,
        url
      }
    }
  }
`
