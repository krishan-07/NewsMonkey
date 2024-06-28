import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultTypes = {
    country: "in",
    pageSize: 15,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
    document.title = `NewMonkey - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updatePage() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30)
    const data = await fetch(url);
    const parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updatePage();
  };

  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updatePage();
  };

  componentDidMount() {
    this.updatePage();
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page  + 1}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: this.state.page + 1
    });
  };

  render() {
    return (
      <div>
        <h1 className="my-5 text-center">
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((obj,index) => {
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
                    disabled={this.state.page <= 1}
                    className="page-link"
                    onClick={this.handlePrevClick}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button
                    disabled={
                      this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)
                    }
                    className="page-link"
                    onClick={this.handleNextClick}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav> */}
      </div>
    );
  }
}
