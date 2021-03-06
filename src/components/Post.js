import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import sizeMe from 'react-sizeme'
import {
  kebabCase
} from 'lodash'

import {
  Waypoint
} from 'react-waypoint';
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Embed from './Embed'

import './post.scss';

class Post extends React.Component {

  render() {

    const {
      post,
      load,
      handleEnter,
    } = this.props;
    return (
            <div className="is-parent card-container" key={post.id}>
              <Waypoint
                onEnter={handleEnter}
                id={post.id}
                bottomOffset={'-700px'}

              />
              <article
                className={`blog-list-item tile is-child box ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="post-meta">
                    <div className="header">
                      <Link
                        className="title has-text-primary is-size-4"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.hideName ? null: <h4>{post.frontmatter.name}</h4>}
                      </Link>
                      {post.frontmatter.occupation && <span>{post.frontmatter.occupation}</span>}
                    </div>
                    {load && <Embed 
                          link={post.frontmatter.link}
                          source={post.frontmatter.source}
                          story={post.html}
                          slug={post.fields.slug}
                      />}
                    <ul className="taglist unstyled-list">
                    {post.frontmatter.state && <li key={post.frontmatter.state}>
                      <Link to={`/states/${kebabCase(post.frontmatter.state)}/`}>{post.frontmatter.state}</Link>
                      </li>}
                    {post.frontmatter.tags.map((tag) => 

                      (<li key={kebabCase(tag)}><Link 
                        to={`/tags/${kebabCase(tag)}/`}
                      >{tag}</Link></li>)
                    )}
                    </ul>
                  </div>
                </header>
              </article>
            </div>
        
    )
  }
}

Post.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default sizeMe({
  monitorHeight: true
})(Post)
