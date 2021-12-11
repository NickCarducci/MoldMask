import React from "react";
import Cable from "./Dropwire";
import { UAParser } from "ua-parser-js";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    console.log(name);
    this.state = {
      browser: name,
      scrollTop: 0,
      ios: name.includes("Safari"),
      iosNoPhoto: name.includes("Safari")
    };
    for (let i = 0; i < 220; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.refresh);
    window.addEventListener("scroll", this.handleScroll);
    this.refresh(true);
  };
  componentWillUnmount = () => {
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (e) => {
    if (!this.state.offScroll) {
      const scrollTop = window.scrollY;
      this.setState(
        {
          scrolling: true,
          scrollTop
        },
        () => {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.setState({
              scrolling: false
            });
          }, 900);
        }
      );
    }
  };
  refresh = (first) => {
    const width = this.state.ios ? window.screen.availWidth : window.innerWidth;
    if (first || Math.abs(this.state.lastWidth - width) > 0) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setState({
          lastWidth: width,
          width,
          availableHeight: this.state.ios
            ? window.screen.availHeight - 20
            : window.innerHeight
        });
      }, 600);
    }
  };
  render() {
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ serviceCancelingImages: true });
      }
    };
    return (
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          fontFamily: "sans-serif",
          textAlign: "center",
          backgroundColor: "rgb(225, 100, 170)"
        }}
      >
        <iframe
          style={{
            shapeOutside: "rect()",
            float: "right",
            width: "200px",
            maxWidth: "80%",
            border: 0
          }}
          src="https://www.youtube.com/embed/nKvUf7F4Xn4"
          title="YouTube video player"
        />
        <img
          style={{
            shapeOutside: "rect()",
            float: "left",
            width: "200px",
            maxWidth: "80%",
            border: 0
          }}
          src="https://www.dl.dropboxusercontent.com/s/t5ueazsx7ikk4ia/magnetboi.jpg?dl=0"
          alt="https://www.dl.dropboxusercontent.com/s/t5ueazsx7ikk4ia/magnetboi.jpg?dl=0"
        ></img>
        What's the problem? combustion of cardbon binds CO2, ice cores count
        carbon. light speed squared cross multiplies and cancels out. the&nbsp;
        <a href="https://micro-theory.com">law of gravity</a>
        <h2>
          <a href="https://magnate.mobi">generators</a>, splash,{" "}
          <a href="https://magnate.auto">model</a>
        </h2>
        It is just a tarus again, accelerate, mount or just clip whole iridium
        wrap on to ...radius exxacltly in thickness
        <br />
        <a
          style={{ wordBreak: "break-word" }}
          href="https://www.academia.edu/45132997/Written_for_National_Science_Foundation_Project_Pitch"
        >
          https://www.academia.edu/45132997/Written_for_National_Science_Foundation_Project_Pitch
        </a>
        <br />
        <br />
        <img
          alt="plagerism, exclusion and monopoly by Government"
          style={{
            height: "auto",
            shapeOutside: "rect()",
            float: "right",
            width: "400px",
            maxWidth: "80%",
            border: 0
          }}
          src="https://www.dl.dropboxusercontent.com/s/vica68gl2199r9j/Screen%20Shot%202021-03-23%20at%201.53.40%20PM.png?dl=0"
        />
        [mass(electrons_compositi)xlightspeedScales; light is the loss of
        electrons but most are exchanged as they move through the air. the point
        of the equation was to describe gravity but that is the&nbsp;
        <a href="https://pubs.acs.org/doi/10.1021/ac051323m">electron</a>. Do we
        know where electrons come from?&nbsp;
        <a href="https://pubs.rsc.org/en/content/articlelanding/2019/sc/c8sc04500c">
          the Protons themselves
        </a>
        ?]
        <br />
        <Cable
          onError={handleScollImgError}
          src={
            this.state.iosNoPhoto
              ? ""
              : "https://drive.google.com/file/d/1ajwlrpVVX1PbqgpoBVnv7kdEZJAlaPgq/preview"
          }
          float="left"
          title="Save the Nation (Newsmax) - Myron bell on the energy industry"
          scrolling={this.state.scrolling}
          fwd={this["scrollImg" + 4]}
          scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
          scrollTop={this.state.scrollTop}
        />
        <h2>
          demand as exclusively labor, corporate profits like net loss bonds and
          gini without home nor bond prices
        </h2>
        “Making it more expensive by crowding out,” only can be from
        intermediate-goods, competing with consumers of suppliers of other
        industries. competing with consumers cannot make it more expensive when
        discerning between apples and oranges, it is a whole new greenfield
        <br />
        <br />
        <Cable
          onError={handleScollImgError}
          src={
            this.state.iosNoPhoto
              ? ""
              : "https://drive.google.com/file/d/1bJOuFiP6jv_D5kv7Jiq-jVjdhaS0l8OE/preview"
          }
          float="left"
          title="Stinchfield (Newsmax) - Kelli Ward on Musk free rider immutable support delete function"
          scrolling={this.state.scrolling}
          fwd={this["scrollImg" + 3]}
          scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
          scrollTop={this.state.scrollTop}
        />
        we know people in debt do not need to compound interest and launder
        third party beneficiary donee claimable and launder employees and
        consumers
        <br />
        <br />
        <Cable
          onError={handleScollImgError}
          src={
            this.state.iosNoPhoto
              ? ""
              : "https://drive.google.com/file/d/1kaCwWn6nDz9VQyGm2Ppbu1Re5DZoOYXp/preview"
          }
          float="right"
          title="The Count (Newsmax) - left insistence on industry discretion before willing customers"
          scrolling={this.state.scrolling}
          fwd={this["scrollImg" + 2]}
          scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
          scrollTop={this.state.scrollTop}
        />
        Isn’t lithium ion battery source in the ground? You are comparing carbon
        binding to mining & battery-making, because we have no lithium mines?
        Just use magnate.company, or is NSF not malfeasant in saying it is not
        transformative nor original?
        <br />
        <Cable
          style={{ width: "400px", height: "270px" }}
          onError={handleScollImgError}
          src={
            this.state.iosNoPhoto
              ? ""
              : "https://drive.google.com/file/d/1ESzXvW6FEsyssNn-S9Dfg5npIERkMv8E/preview"
          }
          float="left"
          title="The Count (Newsmax) - electric vehiicles"
          scrolling={this.state.scrolling}
          fwd={this["scrollImg" + 1]}
          scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
          scrollTop={this.state.scrollTop}
        />
        <a
          style={{
            shapeOutside: "rect()",
            float: "left",
            width: "max-content",
            padding: "0px 10px",
            fontSize: "20px",
            fontFamily: "'Pacifico', sans-serif",
            color: "rgb(230,230,255)",
            backgroundColor: "rgb(32, 22, 11)"
          }}
          href="https://carducci.sh"
        >
          carducci.sh
        </a>
        <a
          style={{
            shapeOutside: "rect()",
            float: "left",
            width: "max-content",
            padding: "0px 10px",
            fontSize: "20px",
            fontFamily: "'Pacifico', sans-serif",
            color: "rgb(230,230,255)",
            backgroundColor: "rgb(32, 22, 11)"
          }}
          href="https://carducci.us"
        >
          carducci.us
        </a>
      </div>
    );
  }
}
