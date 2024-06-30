import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{ 

  const[articles, setArticles] = useState([])
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)
 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updatePage = async() => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30)
    const data = await fetch(url);
    const parsedData = await data.json();
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }

  const handleNextClick = async () => {
    setPage(page + 1)
    updatePage();
  };

  const handlePrevClick = async () => {
    setPage(page + 1)
    updatePage();
  };

  useEffect(() => {
    document.title = `NewMonkey - ${capitalizeFirstLetter(props.category)}`
    updatePage();
    //eslint-disable-next-line
  }, [])


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page  + 1}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setPage(page + 1)
  };

  return (
    <div>
      <h1 className="text-center" style={{margin : '5.4rem 0 2rem 0'}}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
        Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((obj,index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={obj.title}
                    description={obj.description}
                    imgUrl={obj.urlToImage}
                    newsUrl={obj.url}
                    author={obj.author}
                    lastUpdated={obj.publishedAt}
                    source={obj.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <nav aria-label="Page navigation example" className=" my-4">
            <ul className="pagination justify-content-center">
              <li className="page-item ">
                <button
                  disabled={ page <= 1}
                  className="page-link"
                  onClick={handlePrevClick}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  disabled={
                     page >= Math.ceil(totalResults / props.pageSize)
                  }
                  className="page-link"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav> */}
    </div>
  );
}

export default News

News.defaultTypes = {
  country: "in",
  pageSize: 15,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};