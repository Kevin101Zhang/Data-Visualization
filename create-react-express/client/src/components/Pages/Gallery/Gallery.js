import React from "react";
// import { Container, Header } from "semantic-ui-react";
import GalleryFile from "../../GalleryFile/GalleryFile";
import GalleryData from "../Gallery/GalleryData";
import _ from "lodash";
import axios from "axios";
import moment from "moment";
import "./GallerySpinner.css";

const ToolStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%"
};

const TextFieldStyles = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%"
};

const TextFieldContainerStyle = {
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  justifyContent: "center"
};

// Note name is the X axis grid x,y,z... are the values must be named this way
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      data: [],
      height: 1000,
      width: 4000,
      TheTempSource: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  UncheckAll() {
    var checkBoxes = document.getElementsByTagName("input");
    for (var i = 0; i < checkBoxes.length; i++) {
      if (checkBoxes[i].type === "checkbox") {
        checkBoxes[i].checked = false;
      }
    }
    this.setState({
      filter: []
    });
  }

  updateGalleryData(chartName, data, height, width) {
    GalleryData[chartName].data = data;

    console.log(chartName);
    console.log(data);
    console.log(height);
    console.log(width);
  }

  handleReset(e) {
    e.preventDefault();
    console.log("hello");

    document.getElementById("RedditContentType").classList.add("HideMe");
    document.getElementById("RedditField1").classList.add("HideMe");
    document.getElementById("RedditField2").classList.add("HideMe");
    document.getElementById("StackOverflowContentType").classList.add("HideMe");
    document.getElementById("StackOverflowField1").classList.add("HideMe");
    document.getElementById("StackOverflowField2").classList.add("HideMe");
    document.getElementById("YearID").classList.add("HideMe");
    document.getElementById("StaticTIME").classList.add("HideMe");
    document.getElementById("SubmitQueryButton").classList.add("HideMe");
    document.getElementById("ResetSource").classList.add("HideMe");
    document.getElementById("SubmitSelect").classList.remove("HideMe");
    
    //Color Renewal
    document.getElementById("Source").style.backgroundColor ="#f8f8f8";
    document.getElementById("YearID").style.backgroundColor ="#f8f8f8";
    document.getElementById("StaticTIME").style.backgroundColor ="#f8f8f8";

    //Enable Source
    document.getElementById("Source").classList.remove("disable");

  }

  handleSelect(e) {
    e.preventDefault();

    var Source = document.getElementById("Source");
    var SelectedSource = Source.options[Source.selectedIndex].value;

    document.getElementById("SubmitSelect").classList.add("HideMe");
    if (SelectedSource === "fh-bigquery.reddit_") {
      document.getElementById("RedditContentType").classList.remove("HideMe");
      document.getElementById("RedditField1").classList.remove("HideMe");
      document.getElementById("RedditField2").classList.remove("HideMe");
      document.getElementById("StaticTIME").classList.remove("HideMe");
      document.getElementById("YearID").classList.remove("HideMe");
      document.getElementById("SubmitQueryButton").classList.remove("HideMe");

      this.setState({
        TheTempSource: 1
      });
    } else if (SelectedSource === "bigquery-public-data.stackoverflow.") {
      document.getElementById("StackOverflowContentType").classList.remove("HideMe");
      document.getElementById("StackOverflowField1").classList.remove("HideMe");
      document.getElementById("StackOverflowField2").classList.remove("HideMe");
      document.getElementById("StaticTIME").classList.remove("HideMe");
      document.getElementById("YearID").classList.remove("HideMe");
      document.getElementById("SubmitQueryButton").classList.remove("HideMe");

      this.setState({
        TheTempSource: 2
      });
    }
    document.getElementById("Source").classList.add("disable");
    document.getElementById("ResetSource").classList.remove("HideMe");
  }

  handleSubmit(e) {
    e.preventDefault();
    this.UncheckAll();
    //
    console.log(this.state.TheTempSource);
    if (this.state.TheTempSource === 1) {
      var ContentType = document.getElementsByClassName("ContentType")[0];
      console.log(ContentType);
      var SelectedContentType =
        ContentType.options[ContentType.selectedIndex].value;
      //This Above is the Content1 VALUE;

      var Content1 = document.getElementsByClassName("Field1")[0];
      var SelectedContent1 = Content1.options[Content1.selectedIndex].value;
      //This Above is the Content1 VALUE;

      var Content2 = document.getElementsByClassName("Field2")[0];
      var SelectedContent2 = Content2.options[Content2.selectedIndex].value;
      //This Above is the Content2 VALUE;

      var Year = document.getElementsByClassName("Year")[0];
      var SelectedYear = Year.options[Year.selectedIndex].value;
      //This Above is the Year VALUE;
    } else if (this.state.TheTempSource === 2) {
      var ContentType = document.getElementsByClassName("ContentType")[1];
      console.log(ContentType);
      var SelectedContentType =
        ContentType.options[ContentType.selectedIndex].value;
      //This Above is the Content1 VALUE;

      var Content1 = document.getElementsByClassName("Field1")[1];
      var SelectedContent1 = Content1.options[Content1.selectedIndex].value;
      //This Above is the Content1 VALUE;

      var Content2 = document.getElementsByClassName("Field2")[1];
      var SelectedContent2 = Content2.options[Content2.selectedIndex].value;
      //This Above is the Content2 VALUE;
    }

    var Source = document.getElementById("Source");
    var SelectedSource = Source.options[Source.selectedIndex].value;
    //This Above is the SOURCE VALUE;

    var StaticTIME = document.getElementsByClassName("StaticTIME")[0];
    var SelectedTIME = StaticTIME.options[StaticTIME.selectedIndex].value;
    //XAXIS ex. Page1 Page2 Page3

    var Year = document.getElementsByClassName("Year")[0];
    var SelectedYear = Year.options[Year.selectedIndex].value;
    //This Above is the Year VALUE;

    var SubmitQueryButton = document.getElementById("SubmitQueryButton");

    console.log(
      SelectedSource,
      SelectedContentType,
      StaticTIME,
      SelectedContent1,
      SelectedContent2,
      SelectedYear
    );

    //CSS CHECKER
    SelectedSource === ""
      ? (Source.style.backgroundColor = "#f8d7da")
      : (Source.style.backgroundColor = "#d8e9d2");
    SelectedContentType === ""
      ? (ContentType.style.backgroundColor = "#f8d7da")
      : (ContentType.style.backgroundColor = "#d8e9d2");
    SelectedContent1 === ""
      ? (Content1.style.backgroundColor = "#f8d7da")
      : (Content1.style.backgroundColor = "#d8e9d2");
    SelectedContent2 === ""
      ? (Content2.style.backgroundColor = "#f8d7da")
      : (Content2.style.backgroundColor = "#d8e9d2");
    SelectedTIME === ""
      ? (StaticTIME.style.backgroundColor = "#f8d7da")
      : (StaticTIME.style.backgroundColor = "#d8e9d2");
    SelectedYear === ""
      ? (Year.style.backgroundColor = "#f8d7da")
      : (Year.style.backgroundColor = "#d8e9d2");

    //Returns NULL
    if (
      SelectedContent1 === "" ||
      SelectedContent2 === "" ||
      SelectedSource === "" ||
      SelectedContentType === "" ||
      SelectedYear === ""
    ) {
      return null;
    }

    //IF SAME CONTENT
    if (SelectedContent2 === SelectedContent1) {
      Content1.style.backgroundColor = "#f8d7da";
      Content2.style.backgroundColor = "#f8d7da";
      return null;
    }

    //Giving This To Backend
    var queryInfo = {
      Source: SelectedSource,
      ContentType: SelectedContentType,
      XAxis: SelectedTIME,
      Content1: SelectedContent1,
      Content2: SelectedContent2,
      Year: SelectedYear
    };

    SubmitQueryButton.classList.add("spinner");
    document.getElementById("DisableEffect").classList.add("disable");
    // Hit backend query route (/routes/index.js) and send query params inside queryInfo object
    axios
      .post(
        "/api/give",
        { queryInfo },
        {
          timeout: 10000
        }
      )
      .catch(error => {
        if (error.code === "ECONNABORTED") return "timeout";
      })
      .then(res => {
        if (res === "timeout") {
          document.getElementById("NoQueryFound").style.display = "block";
        } else {
          document.getElementById("DisableFirst").classList.remove("disable");
          document.getElementById("NoQueryFound").style.display = "none";

          var info = res.data[0];
          console.log(info);
          var testArr = [...info];
          console.log(testArr);
          for (let i = 0; i < testArr.length; i++) {
            testArr[i].created_utc = moment
              .unix(testArr[i].created_utc)
              .format("MM/DD");
          }
          console.log(testArr);
          this.setState({
            data: testArr
          });
        }
        SubmitQueryButton.classList.remove("spinner");
        document.getElementById("DisableEffect").classList.remove("disable");
      });
  }

  handleChange(e) {
    // console.log(e.target);
    this.updateGalleryData(
      e.target.name,
      this.state.data,
      this.state.height,
      this.state.width
    );

    //Array Checker for Filter
    if (e.target.checked && this.state.filter.indexOf(e.target.name) === -1) {
      var currentState = this.state.filter;
      currentState.push(e.target.name);

      this.setState({
        filter: currentState
      });
    } else if (
      !e.target.checked &&
      this.state.filter.indexOf(e.target.name) !== -1
    ) {
      console.log(this.state.filter.indexOf(e.target.name));

      const currentState = this.state.filter.filter(
        filter => filter !== e.target.name
      );
      console.log(currentState);
      this.setState({
        filter: currentState
      });
    }
  }

  render() {
    // Filter Method
    var GraphComponent = _.map(GalleryData, (value, key) => {
      if (this.state.filter.indexOf(value.type) !== -1) {
        return (
          <GalleryFile
            chart={value.chart()}
            fileData={this.state.data}
            key={key}
            handleChange={this.handleChange}
          />
        );
      }
    });

    let unique = [...new Set(_.map(GalleryData, item => item.type))];
    console.log(unique);

    return (
      <div>
        <div className="ui segment">
          <div id="DisableEffect" className="ui two column very relaxed grid">
            <div className="column">
              <h4 className="ui center aligned grid">Sources</h4>
              <hr />
              <div style={TextFieldContainerStyle}>
                <p>
                  <select
                    id="Source"
                    class="ui dropdown"
                    style={TextFieldStyles}
                  >
                    {/* DATA SOURCE DROP DOWNS */}
                    <option value="">Source</option>
                    <option value="fh-bigquery.reddit_">Reddit</option>
                    <option value="bigquery-public-data.stackoverflow.">
                      StackOverflow
                    </option>
                  </select>
                </p>

                <p>
                  <select
                    id="RedditContentType"
                    class="ui dropdown ContentType HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT TYPE DROP DOWNS */}
                    <option value="">Type</option>
                    <option value="comments">Comments</option>
                    <option value="posts">Post</option>
                  </select>

                  <select
                    id="StackOverflowContentType"
                    class="ui dropdown ContentType HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT TYPE DROP DOWNS */}
                    <option value="">Type</option>
                    <option value="comments">Comments</option>
                    <option value="stackoverflow_posts">Post</option>
                  </select>
                </p>

                <p>
                  <select
                    id="StaticTIME"
                    class="ui dropdown StaticTIME HideMe"
                    style={TextFieldStyles}
                  >
                    {/* STATIC DATE TIME DROP DOWN */}
                    <option value="created_utc">Time</option>
                  </select>
                </p>

                <p>
                  <select
                    id="RedditField1"
                    class="ui dropdown Field1 HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT-1 DROPDOWN [PUT TEXT DATA HERE] */}
                    <option value="">Content</option>
                    {/* SHARED DATA KEYS */}
                    <option value="score">Score</option>
                    {/* REDDIT DATA KEYS*/}
                    <option value="ups">Upvotes</option>
                    <option value="downs">Downvotes</option>
                    <option value="subreddit">Subreddit</option>
                    <option value="author">Author</option>
                    <option value="body">Comment Text</option>
                  </select>

                  <select
                    id="StackOverflowField1"
                    class="ui dropdown Field1 HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT-1 DROPDOWN [PUT TEXT DATA HERE] */}
                    <option value="">Content</option>
                    {/* SHARED DATA KEYS */}
                    <option value="score">Score</option>
                    {/* STACK DATA KEYS */}
                    <option value="view_count">Post Views</option>
                    <option value="favorite_count">Post Favs</option>
                    <option value="answer_count">Post Answers</option>
                    <option value="comment_count">
                      Post Comments
                    </option>
                    <option value="last_activity_date">
                      Post Date
                    </option>
                    <option value="title">Post title</option>
                    <option value="body">Post body</option>
                    <option value="tags">Post tags</option>
                    <option value="text">Comment Text</option>
                  </select>
                </p>

                <p>
                  <select
                    id="RedditField2"
                    class="ui dropdown Field2 HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT-1 DROPDOWN [PUT TEXT DATA HERE] */}
                    <option value="">Content</option>
                    {/* SHARED DATA KEYS */}
                    <option value="score">Score</option>
                    {/* REDDIT DATA KEYS*/}
                    <option value="ups">Upvotes</option>
                    <option value="downs">Downvotes</option>
                    <option value="subreddit">Subreddit</option>
                    <option value="author">Author</option>
                    <option value="body">Comment Text</option>
                  </select>

                  <select
                    id="StackOverflowField2"
                    class="ui dropdown Field2 HideMe"
                    style={TextFieldStyles}
                  >
                    {/* CONTENT-1 DROPDOWN [PUT TEXT DATA HERE] */}
                    <option value="">Content</option>
                    {/* SHARED DATA KEYS */}
                    <option value="score">Score</option>
                    {/* STACK DATA KEYS */}
                    <option value="view_count">Post Views</option>
                    <option value="favorite_count">Post Favs</option>
                    <option value="answer_count">Post Answers</option>
                    <option value="comment_count">
                      Post Comments
                    </option>
                    <option value="last_activity_date">
                      Post Date
                    </option>
                    <option value="title">Post Title</option>
                    <option value="body">Post Body</option>
                    <option value="tags">Post Tags</option>
                    <option value="text">Comment Text</option>
                  </select>
                </p>

                <p>
                  <select
                    id="YearID"
                    class="ui dropdown HideMe Year"
                    style={TextFieldStyles}
                  >
                    {/* YEAR DROPDOWN */}
                    <option value="">Year</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                  </select>
                </p>
              </div>
              <section style={TextFieldContainerStyle}>
                <button
                  id="SubmitSelect"
                  onClick={this.handleSelect}
                  class="ui button"
                  // style={TextFieldStyles}
                  type="submit"
                >
                  I Want This Source!
                </button>

                <button
                  id="SubmitQueryButton"
                  onClick={this.handleSubmit}
                  class="ui button HideMe"
                  // style={TextFieldStyles}
                  type="submit"
                >
                  Submit
                </button>

                <button
                  id="ResetSource"
                  onClick={this.handleReset}
                  class="ui button HideMe"
                  // style={TextFieldStyles}
                  type="submit"
                >
                  Reset Source
                </button>

              </section>
              <small id="NoQueryFound">
                Sorry No Query Was Found [ •́ ‸ •̀ ]{" "}
              </small>
            </div>

            <div id="DisableFirst" className="column disable">
              <div>
                <h4 className="ui center aligned grid">Tools</h4>
                <hr />
                {unique.map((checkers, i) => {
                  return (
                    <label style={ToolStyles}>
                      <input
                        type="checkbox"
                        key={i}
                        name={checkers}
                        onClick={this.handleChange}
                      />
                      {checkers}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="ui vertical divider">and</div>
        </div>

        <div>{GraphComponent}</div>
      </div>
    );
  }
}

export default Gallery;
