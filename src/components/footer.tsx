import { Link, graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent, ReactElement } from 'react'
import styled from 'styled-components'

const Content = styled.footer`
  align-items: center;
  background-color: #fff;
  border-top: solid #000 6px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 20px 12px 32px;
`

const VersionLink = styled(Link)`
  color: #000;
  display: block;
  font-size: 1.2rem;
  text-decoration: underline;
`

const Copyright = styled.p`
  font-size: 1.3rem;
  margin: 28px 0 0;
  letter-spacing: 0.04rem;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

type VersionData = {
  version: {
    edges: {
      node: {
        frontmatter: {
          title: string
        }
      }
    }[]
  }
}

const Footer: FunctionComponent = (): ReactElement => {
  const { version } = useStaticQuery<VersionData>(
    graphql`
      query {
        version: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "//versions/[^/]+.md$/" } }
          limit: 1
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  return (
    <Content>
      <VersionLink to="/list">
        {version.edges[0].node.frontmatter.title}
      </VersionLink>

      <Copyright>
        {'Copyright 2018-2019 '}
        <a href="https://haneru.dev/" rel="noopener noreferrer" target="_blank">
          Haneru Developers
        </a>
      </Copyright>
    </Content>
  )
}

export default Footer
