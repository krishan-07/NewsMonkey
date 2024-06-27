import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div>
        <div className="card mb-3">
          <img src={imgUrl?imgUrl : 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg'} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title" style={{height : '52px', overflow: 'hidden'}}>{title}</h5>
            <p className="card-text" style={{height : '78px', overflow: 'hidden'}}>{description}</p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">
             Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
