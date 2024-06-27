import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
  }

  handleNextClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a7b708f6704942528384ae820c27e038&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    });
  };

  handlePrevClick = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a7b708f6704942528384ae820c27e038&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false
    });

  };

  async componentDidMount() {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a7b708f6704942528384ae820c27e038&pageSize=${this.props.pageSize}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="my-4 text-center">NewsMonkey - Top Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
              {!this.state.loading && this.state.articles.map((obj) => {
                return (
                  <div className="col-md-4" key={obj.url}>
                    <NewsItem
                      title={obj.title}
                      description={obj.description}
                      imgUrl={obj.urlToImage}
                      newsUrl={obj.url}
                    />
                  </div>
                );
              })}
            </div>
            <nav aria-label="Page navigation example" className=" my-4">
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
            </nav>
        </div>
      </div>
    );
  }
}
