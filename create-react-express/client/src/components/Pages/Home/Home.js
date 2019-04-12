import PropTypes from "prop-types";
import React, { Component } from "react";
import DivGif1 from "./Images/DivGif1.gif"
import BigQuery from "./Images/BigQuery.png"
// import FooterGif from "./Images/FooterGif.gif"
import "semantic-ui-css/semantic.min.css";
import "./Home.css";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";


const Home = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Data Analytics"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="We Supply Information. You Draw Conclusions"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button href="/search" primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

Home.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};


  render() {
    const { children } = this.props;
    // const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Home />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Home mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              What are we known for?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
             We compiled a very large array of data from the internet and allow our users to explore this data by experimenting with a multitude of graphs.
             Therefore, the users themselves draw their own conclusions through pure data analytics.
            </p>
            <Header as="h3" style={{ fontSize: "2em" }}>
             Statistically Accurate?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Yes that's right, you thought it was the stuff of dreams, but even
              monkeys can analyze data successfully with us! We included many statistical formulas 
              based off what researchers use themselves!
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Image
              bordered
              rounded
              size="large"
              src={DivGif1}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button href="/statistics" size="huge">Check Them Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "0em" }} vertical>
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
            Surprisingly Easy To Use!
            </Header>
            <p style={{ fontSize: "1.33em" }}>
             Just ask yourself what you want to compare and we'll do the rest!
            </p>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
            <Header as="h3" style={{ fontSize: "2em" }}>
             Google Big Query!  <Image size="small" middle aligned src={BigQuery} />
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              
              Most of our data is supplied by Google Big Query Itself.
              It provides massively large datasets working in conjunction with Google Storage.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: "2em" }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Instead of focusing on content creation and hard work, we have learned
          how to master the art of researching nothing by providing massive amounts for the
          user to draw their own conclusions. We simply generate graphs and information.
          Happy Data Analyzing!
        </p>
        <Button as="a" href="/about" size="large">
          About Us
        </Button>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: "3em 0em", textTransform: "uppercase" }}
        >
          <p>Case Studies</p>
        </Divider>

        <Header as="h3" style={{ fontSize: "2em" }}>
          Check Out Some Interesting conclusions drawn!
        </Header>
        <p style={{ fontSize: "1.33em" }}>
          Yes I know you probably disregarded the earlier boasts as we the creators did little to nothing.
          But check out some amazing informational statistics our users discovered!
        </p>
        <Button as="a" href="/popular" size="large">
         Popular Discoveries
        </Button>
      </Container>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Links" />
              <List link inverted>
                <List.Item as="a" href="#root">Back to Top</List.Item>
                <List.Item as="a" href="/popular">Popular</List.Item>
                <List.Item as="a" href="/search">Search</List.Item>
                <List.Item as="a" href="/statistics">Statistics</List.Item>
                <List.Item as="a" href="/about">About</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7} >
              <Header as="h4" inverted>
                Wow You Reached The End~
              </Header>
              <p>
               Wow! You Reached the end of our page. New content is consistently being added weekly.
               This includes graphs, more massive quantities of data and more!

               Don't forget to like, comment and subscribe :^)
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
