import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl,author, lastUpdated, source } = this.props;
    return (
      <div>
        <div className="card mb-4" style={{position : "relative"}}>
          <img src={
            imgUrl ? imgUrl : 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg'
            } className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title" > {title} 
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
               style={{zIndex : '1', right : '-30px'}}>     {source}               
              </span>  
            </h5>
            <p className="card-text mb-2" style={description !== null ? {height : '72px', overflow: 'hidden'} : {} }    >    {description}
            </p>
            {/* <p style={{lineHeight : '0px'}}>...</p> */}
            <p className="card-text mb-0">
              <small className="text-body-secondary">By {!author ? 'unknown' : author} on {new Date(lastUpdated).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark mt-3" target="_blank" rel="noreferrer">
             Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
