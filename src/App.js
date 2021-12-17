import React from "react";
import Cable from "./Dropwire";
import { UAParser } from "ua-parser-js";
import Vaxx from "./vaxx";
//import PouchDB from "pouchdb";
//import upsert from "pouchdb-upsert";
import "./styles.css";

/*class Pouch extends React.Component {
  constructor(props) {
    super(props);
    PouchDB.plugin(upsert);
    this.db = new PouchDB("nonceShopifyCertification");
  }
  async readPrivateKeys() {
    let allInfo = await this.db
      .allDocs({ include_docs: true })
      .catch((err) => console.log(err.message));
    let notes = {};
    allInfo && allInfo.rows.forEach((n) => (notes[n.doc._id] = n.doc));

    return notes;
  }

  async setPrivateKey(c) {
    if (!c._id) {
      window.alert("pouchdb needs ._id key:value");
      this.db.destroy();
    } else {
      var res = await this.db.upsert(c._id, (doc) => {
        doc = { ...c };
        return doc;
      });
      return res;
    }
  }

  deleteKeys() {
    this.db.destroy();
  }
}*/

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
    this.pcr = React.createRef();
    this.walter = React.createRef();
    this.polio = React.createRef();
    this.claims = React.createRef();
    this.jury = React.createRef();
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
    clearTimeout(this.check);
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
  /*constructor(props) {
    super(props);
    let pouch = new Pouch();
    this.state = {
      pouch
    };
  }

  componentDidMount = () => {
    if (window.location.href.startsWith("https://moldmask.co/"))
      this.state.pouch
        .readPrivateKeys()
        .then(async (nonce) => {
          const nonces = Object.values(nonce);
          if (nonces) {
            const nonceObject = nonces.find((x) => x._id === "nonce");
            this.checkPathname(nonceObject);
          }
        })
        .catch((err) => console.log(err.message));
  };
  checkPathname = (nonceObject) => {
    var pathname = window.location.pathname;
    if (pathname !== "/") {
      const nonce = pathname.split("&state=")[1].split("&shop")[0];
      const hmac = pathname.split("&hmac=")[1].split("&timestamp")[0];
      const timestamp = pathname.split("&timestamp=")[1].split("&state")[0];
      const authorization_code = pathname.split("?code=")[1].split("&hmac")[0];
      //POST https://{shop}.myshopify.com/admin/oauth/access_token
      const shop = "moldmask";
      const hostname = `https://${shop}.myshopify.com`;
      if (authorization_code) {
        if (nonce === nonceObject.nonce) {
          const api_key = "e2277fc230570bba781cad0a5dbd5570";
          fetch(
            `https://${shop}.myshopify.com/admin/oauth/access_token?` +
              `client_id=${api_key}&client_secret=${process.env.client_secret}&code=${authorization_code}`
          )
            .then(async (res) => await res.json())
            .then((result) => {
              console.log(result);

              fetch(`https://${shop}.myshopify.com/api/2021-01/graphql.json`, {
                method: "POST",
                headers: {
                  "X-Shopify-Access-Token": result.access_token,
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  query: `query {
                    products(first:2) {
                      edges {
                        node {
                          variants(first: 2) {
                            edges {
                              node {
                                id
                              }
                            }
                          }
                        }
                      }
                    }
                  }`,
                  variables: {
                    now: new Date().toISOString()
                  }
                })
              })
                .then(async (res) => await res.json())
                .then((result) => {
                  console.log(result.data);
                  this.setState({ products: result.data.products });
                  //{ edges:[ {node:{variants:{ edges:[ {node:{id}}, ] }}}, ] }
                  /**
                 * {
                    "shop": {
                      "name": "graphql",
                      "primaryDomain": {
                        "url": "https://graphql.myshopify.com",
                        "host": "graphql.myshopify.com"
                      }
                    }
                  }
                 *
                });
            })
            .catch((err) => console.log(err.message));
        } else window.alert("doesn't match");
      }
    }
  };*/
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      clearTimeout(this.check);
      const check = () => {
        if (this.props.pathname === "/") {
        } else if (this.props.pathname === "/n") {
          window.scroll(0, this.polio.current.offsetTop);
        }
      };
      check();
      this.check = setTimeout(check, 4000);
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
          fontWeight: "lighter",
          fontFamily: "'Sahitya', sans-serif",
          width: "100%",
          minHeight: "100vh",
          height: "min-content",
          backgroundColor: "rgb(200, 230, 255)"
        }}
      >
        <div
          style={{
            left: "10px",
            textAlign: "left",
            top: "0px",
            width: "90%",
            maxWidth: "600px",
            position: "relative"
          }}
        >
          <br />
          <br />
          <div style={{ position: "absolute" }}>
            {/*window.location.href === "https://moldmask.co/" && (
            <div
              style={{
                backgroundColor: "rgb(100,200,255)",
                width: "50%",
                display: "flex",
                position: "fixed",
                top: "0px",
                right: "0px"
              }}
              onClick={async () => {
                const nonce = Math.random(9);
                var resp = await this.state.pouch.setPrivateKey({
                  nonce,
                  _id: "nonce"
                });
                if (resp) {
                  // window.location.href = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect}&state=${nonce}&grant_options[]={access_mode}`;
                }
              }}
            >
              Mask Me!
            </div>
          )}
          {this.state.products && (
            <div>
              {this.state.products.map((x) => {
                return (
                  <div
                    onClick={() => {
                      const addToCart = ``;
                      fetch(
                        `https://${shop}.myshopify.com/api/2021-01/graphql.json`,
                        {
                          method: "POST",
                          headers: {
                            "X-Shopify-Access-Token": result.access_token,
                            "Content-Type": "application/json",
                            Accept: "application/json"
                          },
                          body: JSON.stringify({
                            query: `mutation {
                                      checkoutCreate(input: {
                                        lineItems: [{ variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzg3MDQ4MzI3NTc5OA==", quantity: 1 }]
                                      }) {
                                        checkout {
                                          id
                                          webUrl
                                          lineItems(first: 5) {
                                            edges {
                                              node {
                                                title
                                                quantity
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }`
                          })
                        }
                      )
                        .then(async (res) => await res.json())
                        .catch((err) => console.log(err.message));
                    }}
                  ></div>
                );
              })}
            </div>
            )*/}
            <div
              style={{
                backgroundColor: "white",
                width: "50%",
                display: "flex",
                position: "fixed",
                bottom: "0px",
                right: "0px"
              }}
            >
              <div style={{ margin: "10px", textAlign: "right" }}>
                Have a real hankering for raising hell for you and your fellows?
                Check out our always-pivoting
                <br />
                <a href="https://foiegras.life">FoieGras</a>
              </div>
              <div
                style={{
                  border: "2px solid black",
                  width: "max-content",
                  position: "relative",
                  fontSize: "10px"
                }}
              >
                TRIGGER WARNING:
                <br />
                animal abuse; farming:
              </div>
            </div>
            <div
              style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                backgroundColor: "rgb(200, 230, 255)"
              }}
            >
              <a style={{ color: "blue" }} href="https://billbiden.org">
                BillBiden
              </a>
              : does it seep into the pores?
            </div>
          </div>
          <a
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "max-content",
              padding: "0px 10px",
              fontSize: "20px",
              fontFamily: "'Pacifico', sans-serif",
              color: "rgb(230,230,255)",
              backgroundColor: "rgb(32, 22, 11)"
            }}
            href="https://humanharvest.info"
          >
            humanharvest.info
          </a>
          <h1>heat/(density) rises</h1>
          <a href="https://www.politifact.com/factchecks/2020/jun/15/facebook-posts/claim-n95-masks-cant-stop-covid-19-particles-due-s/">
            engineer says masks stop spittle
          </a>
          , but
          <div style={{ display: "flex", margin: "10px" }}>
            <table style={{ border: "1px solid" }}>
              <thead>
                <tr>
                  <th>action</th>
                  <th>fall</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>sneeze</td>
                  <td>6m</td>
                </tr>
                <tr>
                  <td>cough</td>
                  <td>2m</td>
                </tr>
                <tr>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/17542834/#:~:text=Practical">
                    <td>breathe</td>
                  </a>
                  <td>{"<"}1m</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div>
              "Scientists can only speculate because dna is injected, in an
              instant."
              <br />
              <br />
              Scientist: "Before [cells] inject dna, they don't have a channel,
              after they inject dna they have the channel,"
              <br />
              <br />I don’t think tornadoes start on land, from the atmosphere
              &nbsp;<a href="https://froth.app/hadley">Hadley</a>&nbsp;cells
            </div>
            <iframe
              style={{
                width: "200px"
              }}
              src="https://www.youtube.com/embed/Weqb9KrQ-TU"
              title="https://www.youtube.com/watch?v=Weqb9KrQ-TU&t=21s"
            ></iframe>
          </div>
          <div
            style={{
              overflow: "hidden",
              width: "100%",
              maxWidth: "500px",
              height: "400px",
              maxHeight: "50vw"
            }}
          >
            <img
              style={{
                transform: "translateY(-10vw)",
                width: "100%",
                maxWidth: "500px"
              }}
              alt="cartoon vivo insemination"
              src="https://www.dl.dropboxusercontent.com/s/2jmslkl1zf0lg3s/virus%20frontiers%20young%20minds.jpeg?dl=0"
            />
          </div>
          <br />
          and&nbsp;
          <a href="https://www.google.com/search?q=nucleoside+analogues+virus+electron+microscope+mitosis+replication">
            electron microscope only with bacteria+snapshot+mitosis
          </a>
          , to which&nbsp;
          <a href="https://www.cdc.gov/flu/weekly/overview.htm#:~:text=5.%20Mortality%20Surveillance">
            prevalence
          </a>
          &nbsp;does not cause, make.&nbsp;
          <a href="https://www.cdc.gov/flu/about/professionals/antigenic.htm">
            For virus
          </a>
          , it is &nbsp;
          <a href="https://www.pfizer.com/news/hot-topics/viral_vs_bacterial_pneumonia_understanding_the_difference">
            bacterially
          </a>
          -
          <a href="https://www.fda.gov/media/144245/download#page=42">
            prevalent
          </a>
          &nbsp;as a byproduct and&nbsp;
          <a href="https://www.cmu.edu/common-cold-project/">
            warning-mechanism
          </a>
          , of debris de-clotting operations and bacterial infection, as we know
          it "requires cell to replicate," as its only&nbsp;
          <a href="https://en.wikipedia.org/wiki/Protistology">taxonomy</a>, and
          such would be the order of innovation (evolution, in this case) that
          creates the tech stack in the end of the
          industrial-[design,discovery,maintainless-utility]-
          <a href="https://www.sparknotes.com/biology/cellreproduction/cellcycle/section2/">
            cycle
          </a>
          .&nbsp;
          <a href="https://www.cdc.gov/vaccines/acip/recs/grade/covid-19-moderna-vaccine.html#:~:text=cSeven%20serious">
            mRNA-sporing-graft
          </a>
          &nbsp;debris-
          <a href="https://www.google.com/search?q=b+cell+dysregulation+oncogensesis">
            excess
          </a>
          &nbsp;antibody b-cell&nbsp;
          <a href="https://www.fda.gov/media/144452/download#page=60">
            dysregulation
          </a>
          &nbsp;is&nbsp;
          <a href="https://www.lls.org/who-we-are/covid-19-vaccines-faq-patients-and-caregivers#:~:test=Some%20people%20receiving%20a%20COVID-19%20vaccine%20have%20reported%20swollen%20lymph%20nodes">
            expected
          </a>
          &nbsp;and&nbsp;
          <a href="https://link.springer.com/article/10.1007/s00259-021-05314-2">
            evident
          </a>
          .
          <br />
          <a
            style={{
              shapeOutside: "rect()",
              float: "right",
              width: "max-content",
              padding: "0px 10px",
              fontSize: "20px",
              fontFamily: "'Pacifico', sans-serif",
              color: "rgb(230,230,255)",
              backgroundColor: "rgb(32, 22, 11)"
            }}
            href="https://2052.live"
          >
            2052.live
          </a>
          <br />
          <button
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ c2020: !this.state.c2020 });
            }}
          >
            <h3>c2020</h3>
          </button>
          <br />
          <div style={{ display: this.state.c2020 ? "block" : "none" }}>
            Mask the mutating-vaxxers &bull; froth.app
            <br />
            <br />
            If you do not shuffle the population before you extrapolate, you can
            safely expect your significance to decrease to 0 #Statistics
            <br />
            <br />
            Visualizing probability of getting average implies that there is an
            identifiable majority...
            <br />
            <br />
            Econometrists/statisticians/calculus/poll-scientists/detectives
            depend on correlation in attributing factors to integrals, only
            based on a difference other than time can a unit-scalable-integral
            be created, otherwise it is a variable without an integral with
            measures time*sample
            <br />
            <br />
            Add debugging front-end code up the parent to that list of how
            science is rationality, but adhered to, which is based on logic and
            witness. Sort of a muddying-word science is
            <br />
            <br />
            If the axis of a population ordered by home sale price, would
            dividing each average-percentile by its sample size be enough to
            find the median? Yes.
            <br />
            <br />
            So, to assign causation of debt/cash, cash/people, income/employment
            or hoursWorked/person on home prices, I have to use the median of
            each variable-integrally, and never of “Expected-Sum.”
            <br />
            <br />
            What logistical proof do you have that masking is not a&nbsp;
            <a href="https://pubmed.ncbi.nlm.nih.gov/17542834/">
              false positive
            </a>
            ,&nbsp;
            <a href="https://www.google.com/search?q=null+hypothesis">
              null hypothesis
            </a>
            <br />
            <br />
            "Natural Immunity from having covid before," teaches Larry Kudlow.
            Actually it is more likely any immunity is from cold antibodies of
            bygone virus'. Can a virus truly be made extinct
            <br />
            <br />
            Fully vaccinated people can travel in U.S. without tests or
            quarantines, CDC says Ultimately, the guidance may do little, as
            people are already traveling extensively nationwide.
            <br />
            <br />
            It induces cold antibodies, which the virus has been claimed to
            evade...
            <br />
            <br />
            ACLU @ACLU · 3h We don't oppose the principle of requiring proof of
            vaccination in certain contexts. After all, vaccination is often
            required for school enrollment and some medical or other jobs.
            There's no reason to believe that the existing system of proof is
            deeply broken.
            <br />
            <br />
            moldmask.co, cocaine is money, purity health dpt @SaverParty · 3h
            There certainly are rights being forgone currently per medical
            exclusion. Duressful exclusion is free riding, not just for race,
            color, religion, sex and national origin. Medical force is almost
            always null hypothesis on side-effects (modern medicine, sovereign
            body).
            <br />
            <br />
            ACLU @ACLU · 3h Replying to @ACLU Rushing to develop a vaccine
            passport system could be bad for transparency, privacy, and user
            control. This is precisely what we need to prevent.
            <br />
            <br />
            moldmask.co, cocaine is money, purity health dpt @SaverParty · 3h
            ‘Duress’ and ‘disclosure’ is critical to civil rights and should be
            included in your consideration. B-cell oncogenesis of these grafts
            call for both!
            <br />
            <br />
            moldmask.co, cocaine is money, purity health dpt @SaverParty · 4h .
            @CDC Director says the graft which makes antibodies prevent you from
            carrying the virus, but only the variation they originally made it
            for? Still weigh the risk of B-cell oncogenesis @Microsoft
            <br />
            <br />
            Paul Krugman @paulkrugman · 4h Morning in America! 1/ U.S. added
            916,000 jobs in March as the recovery gained steam. The gains were
            the biggest since August. The unemployment rate fell to 6 percent.
            nytimes.com
            <br />
            <br />
            Paul Krugman @paulkrugman · 4h I'm worried, as we all should be,
            about rising infections as people get careless. But if vaccinations
            bring the pandemic under control, still the most likely case, we're
            going to be feeling pretty happy by New Year
            <br />
            <br />
            moldmask.co, cocaine is money, purity health dpt @SaverParty · 4h I
            thought vaccinations were rising
            <br />
            <br />
            Did you change the way you were testing in 2019 October? @WHO
            <br />
            <br />
            “It’s the&nbsp;
            <a href="https://www.dailymail.co.uk/sciencetech/article-9426499/Scientists-evidence-toxic-chemicals-face-masks.html">
              testing
            </a>
            ”
            <br />
            <br />
            If&nbsp;
            <a href="https://cdc.gov/tb/publications/factsheets/general/ltbiandactivetb.htm">
              asymptomatic tuberculosis
            </a>
            &nbsp;cannot spread from human to human (about 1/4 est to have
            latent TB - 2 year turnaround time) + more contagious, covid
            asymptomatic spread cannot happen as well.
            <br />
            Says covid deaths have mostly tuberculosis as well (ex-oldAge)
            <br />
            How is covid transmissible while asymptomatic; is asleep TB same as
            asymptomatic Covid & TB? Says Latent TB cannot spead, and active can
            only spread if talking close (not in same room or in line)
            <br />
            <br />
            This guy worked at Goldman Sachs.
            <div style={{ position: "relative", width: "50%" }}>
              <img
                style={{ width: "100%", height: "auto" }}
                alt="why tho"
                src="https://www.dl.dropboxusercontent.com/s/9uedp62h7994hpo/NJCovid2021Grant.jpeg?dl=0"
              />
            </div>
            I bet if bonds were&nbsp;
            <a href="https://billbiden.org">prosecuted as illegal</a>, the
            treatment would be different than “grants” with strings attached.
            Fraud in broad daylight just gets ignored #COVID19
            <br />
            <br />
            <a href="https://www.easyflowusa.com/company-tests">
              continuously aerosolized-microorganisms in 10cubicfoot
            </a>
            &nbsp;chamber air&nbsp;
            <a href="https://halosil.com/what-are-logs-and-why-do-they-matter-in-preventing-infections/#:~:text=The%20highest%20percentage%20that%20is,6%2Dlog%20kill%20rate.%E2%80%9D">
              2LOG kill
            </a>
            <br />
            <br />
            More people joined the NRA this year than people are labeled to have
            died of covid (should be "substantial part of death" with at least
            half, partial derivative) if you stopped counting months ago, covid
            exists without killing so most of those deaths are incorrect except
            for the poisoning, no animal-to-human mutation can create that
            Mar2020 death-print is too sudden and likely bad policy (also when
            fixed for age is negligable-altogether)
            <br />
            <br />
            10% of cases are symptomatic so most likely covid is not a big deal
            <br />
            <br />
            <div style={{ position: "relative", width: "50%" }}>
              <img
                style={{ width: "100%", height: "auto" }}
                alt="why tho"
                src="https://www.dl.dropboxusercontent.com/s/k1mfb87z6oycksx/ImpendingDoom.png?dl=0"
              />
            </div>
            <br />“
            <a href="https://pubmed.ncbi.nlm.nih.gov/17542834/">
              100,000 could have been saved
            </a>
            ,” they were triggered by gain of function + monoclonal antibodies
            or poisoning, masking causes the&nbsp;
            <a href="https://irp.nih.gov/blog/post/2020/09/mold-exposure-sets-stage-for-severe-flu#:~:text=New%20IRP%20research%20has%20found,dramatically%20increasing%20the%20illness's%20severity.&text=In%20order%20to%20reproduce%2C%20the,by%20humans%20and%20other%20organisms.">
              virus to be prolonged
            </a>
            <br />
            <br />
            "not a laboratory leak" - CNN
            <br />
            <br />
            We can assume most cases are not symptomatic, since most testing is
            because of a case
            <br />
            <br />
            "80-90% of people getting covid are wearing cloth masks all the
            time, that is dangerous," says Rand Paul. Not only is it dangerous
            in false-assurance but the harm is in humidity not escaping, and
            virus forming. are you not of the idea that G-d is all things and
            evolution can happen at a cellular level that quickly? you are an
            opthomologist sir
            <br />
            <br />
            <br />
            "There is going to be catastrophe," Fauci says&nbsp;
            <a href="https://www.the-scientist.com/news-opinion/nih-cancels-funding-for-bat-coronavirus-research-project-67486">
              laughingly
            </a>
            <br />
            Vaccine. (n) - to fight or train, not teach
            <br />
            DUI. (n) - performance-detractor and driving a motor vehicle
            <br />
            <br />
            You cannot force, ban or move people to do something not on an
            individual basis; you're of the choice to go visit someplace or not,
            and territories can disclude and not be a societal-free-rider if
            there are visible symptoms, or by a non-invasive temperature check
            <br />
            <br />
            "No benefit of monoclonal antibodies after visiting a hospital nest,
            have to make your own mRNA or a graft without using your own
            punches,&nbsp;
            <a href="https://www.nature.com/articles/cddis2016148">
              need to guide it
            </a>
            "
            <br />
            <br />
            There is no evidence asymptomatic have virus, where vaccine would
            help in stopping the transmission (on the skin). Only if they are
            symptomatic (thru the skin) is vaccine useful (2 weeks after). in
            the case of symptomatic, you can exclude from travel/business
            <br />
            <br />
            <div
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                backgroundColor: "rgb(50,50,50)",
                color: "rgb(200,200,200)"
              }}
            >
              <h5
                style={{
                  fontFamily: '"Pacifico", sans-serif'
                }}
              >
                Free-rider exclusion without evidence more significant that 1/
                <a href="https://www.cdc.gov/flu/about/professionals/antigenic.htm">
                  2000
                </a>
                &nbsp;for societal policy. 5m have died with this virus that has
                plausibly been around for decades unless NIH literally made it
                and pulled out is irrefutable admission of guilt
              </h5>
              <br />
              What would be evidence if not&nbsp;
              <a
                style={{ color: "rgb(150,220,255)" }}
                href="https://www.healthline.com/health-news/noninvasive-saliva-tests-for-covid-19-as-effective-as-nose-throat-swabs"
              >
                this
              </a>
              , a blood test?&nbsp;
              <a
                style={{ color: "rgb(150,220,255)" }}
                href="https://www.cochrane.org/news/how-accurate-are-routine-laboratory-tests-diagnosis-covid-19"
              >
                Unless
              </a>
              &nbsp;it is 100% accurate or with visible&nbsp;<b>evidence</b>,
              exclusion is just conjecture. If there were to be&nbsp;
              <b>symptoms or repeatable</b>&nbsp;and able to delegate decisions
              to the business (with warnings of policies) in business-place
              realm, for there to be any intervention in travel, well-controlled
              tests of logistics rather than disparate events and unexplained or
              invisible causality would forced-vaccines ever be plausible to
              travel, or deaths would have to be as numerous as when the virus
              had just been released. One thing is for sure:
              <br />
              <br />
              <h5>
                The virus if, not just coincidence people dying in hospitals had
                the common virus, was actually and not just the presumed cause
                of death, killed in a way that must have a source, a person or
                institution pulled the trigger on its spread. China presumes the
                virus was spread by the market, or was the&nbsp;
                <a
                  style={{ color: "rgb(150,220,255)" }}
                  href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(18)30006-9/fulltext"
                >
                  rubicon
                </a>
                &nbsp;for a human-contractable mutation?
              </h5>
            </div>
          </div>
          <br />
          <img
            style={{
              height: "min-content",
              width: "400px",
              maxWidth: "100%",
              float: "right"
            }}
            alt=""
            src="https://www.dl.dropboxusercontent.com/s/fcvqbu5dfp7dgwb/Screen%20Shot%202021-12-14%20at%208.54.28%20PM.png?dl=0"
          />
          “Like a chainlink fence to prevent a mosquito 26 ft sneeze. How are
          you going to get them to comply, let’s go to 1918 h1n1 virus 50m died
          and population was much smaller.” I like to wear a mask, I do not want
          to be infected with the virus. Even back then, elites didn’t want to
          comply. Do what you want but why, why is he flooding america with
          infected individuals, we don’t have to yell at eachother.”
          <br />
          <br />
          "Measels do not vary as much as covid with time"
          <br />
          <br />
          "Starting at a plateau, at a high level, then you blast off" - Dr.
          Fauci
          <br />
          <br />
          The&nbsp;
          <a href="https://www6.slac.stanford.edu/news/2020-12-18-scientists-get-most-realistic-view-yet-coronavirus-spike-protein-structure.aspx">
            Virus
          </a>
          &nbsp;is&nbsp;
          <a href="https://journals.sagepub.com/doi/pdf/10.1177/000456328101800501">
            an
          </a>
          &nbsp;endangered&nbsp;
          <a href="https://www.cdc.gov/flu/about/professionals/antigenic.htm">
            species
          </a>
          , that which we use in&nbsp;
          <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5288344/">
            our
          </a>
          &nbsp;
          <a href="https://www.memorialhealthcare.org/whats-the-difference-between-covid-19-rapid-and-prc-tests/">
            diagnosis
          </a>
          &nbsp;<a href="https://jvi.asm.org/content/77/16/8801">induces</a>{" "}
          a&nbsp;
          <a href="https://www.nih.gov/news-events/nih-research-matters/immune-cells-common-cold-may-recognize-sars-cov-2">
            reaction to cold virus too
          </a>
          <br />
          <h1>
            <a
              style={{
                color: "rgb(178, 90, 197)",
                fontFamily: '"Pacifico", sans-serif'
              }}
              href="https://irp.nih.gov/blog/post/2020/09/mold-exposure-sets-stage-for-severe-flu#:~:text=New%20IRP%20research%20has%20found,dramatically%20increasing%20the%20illness's%20severity.&text=In%20order%20to%20reproduce%2C%20the,by%20humans%20and%20other%20organisms."
            >
              moldmask
            </a>
          </h1>
          <span
            style={{
              position: "absolute",
              fontSize: "8px",
              color: "rgb(20,100,255)",
              transform: "translate(-50%,-5px)"
            }}
          >
            ween off of oxygen with fungi, grow your own&nbsp;
            <a href="https://www.cdc.gov/mmwr/volumes/70/wr/mm7003e2.htm">
              (B.1.1.7
            </a>
            !
          </span>
          <br />
          If you'll love the&nbsp;
          <a href="https://en.wikipedia.org/wiki/Joan_Hamburg">death</a>
          &nbsp;caused by masks, you'll love our other product line&nbsp;
          <a href="https://humanharvest.info">HumanHarvest</a>
          <br />
          <br />
          <div style={{ display: "inline-block" }}>
            Thanks, Wolfe Blitzer for sharing studies as fact without a control
            so us mask-sellers ignore weather systems and proof that masks&nbsp;
            <a href="https://pubmed.ncbi.nlm.nih.gov/17542834/">
              do not save lives absolutely
            </a>
            &nbsp; to sell these things, with only correlations that they do
            (which can be because of age of population or intentional poisoning)
          </div>
          <br />
          <br />
          <div
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              backgroundColor: "rgb(50,50,50)",
              color: "rgb(200,200,200)"
            }}
          >
            <i
              style={{
                fontFamily: '"Pacifico", sans-serif'
              }}
            >
              SanityCheck
            </i>
            <br />
            Epidemiologists respond with a null finding. Physicists respond with
            a&nbsp;
            <a
              style={{ color: "rgb(150,220,255)" }}
              href="https://pubmed.ncbi.nlm.nih.gov/17542834/"
            >
              positive
            </a>
            &nbsp;finding (heat rises/earth’s electrons pull, only&nbsp;
            <a
              style={{ color: "rgb(150,220,255)" }}
              href="https://www.stingraypartswasher.com/filtration-relative-particle-sizes-in-microns.html"
            >
              oxygen
            </a>
            &nbsp;exists in Brownian motion). Politifact’s epidemiologist
            consults say virus’ require hosts’&nbsp;
            <a
              style={{ color: "rgb(150,220,255)" }}
              href="https://www.politifact.com/factchecks/2020/jun/15/facebook-posts/claim-n95-masks-cant-stop-covid-19-particles-due-s/"
            >
              spittle/oils
            </a>
            &nbsp;and gestation time
          </div>
          <br />
          <a href="https://thecritic.co.uk/face-masks-make-you-stupid/">OBEY</a>
          &nbsp;(to say lockdown are required now that someone has the PCR for
          cold is laughable. The root cause of hostility towards Asians is
          lockdowns and the Duke U hostility towards lockdown orders is not
          cases of Poly-Chain Reaction to cold, it is because you do not
          understand&nbsp;
          <a href="https://en.wikipedia.org/wiki/Atmospheric_circulation">
            weather systems
          </a>
          )<br />
          <Cable
            onError={handleScollImgError}
            img={true}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.dl.dropboxusercontent.com/s/ouwismq2ln4nhze/Screen%20Shot%202021-12-16%20at%204.38.22%20PM.png?dl=0"
            }
            float="left"
            title=""
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 7]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          “Many aren’t at risk of covid, certainly not young people,” prevalence
          does not cause, make
          <br />
          <br />
          If the&nbsp;
          <a href="https://">
            financial-canibalism, rentier-colonialism & Bernie Sanders
          </a>
          &nbsp;didn't exist to&nbsp;
          <a href="https://froth.app/debt">sell us out</a>,&nbsp;the rich media
          deductible-philantropists would want to&nbsp;
          <a href="https://www.the-scientist.com/news-opinion/nih-cancels-funding-for-bat-coronavirus-research-project-67486">
            kill us
          </a>
          <br />
          <br />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            //img={true}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/ZmUozfOPquk"
            }
            float="left"
            title="Left vs Right (77WABC) - sundays 3-5pm Sliwa vs Hahn"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 6]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <Cable
            style={{ height: "440px" }}
            onError={handleScollImgError}
            //img={true}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/m-CwPBcrMYQ"
            }
            float="right"
            title="Rudy Giuliani (77WABC) - Nick Carducci, Gestation King: prevalence case as byproduct"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 5]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            “Use J&J for cannot withstand mRNA risk safely, or will not, to
            increase rates generally. Families Fighting Flu national flu
            vaccination and education Flu and covid are co-circulating, we are
            overwheltheg our hospital ecosystem. Many side effects from flu
            vaccine, However, in the context of today we also need to keep in
            mind tht vaccine equity is an issue, and other countries look to the
            U.S. for guidance of vaccines, and donations, especially as it
            pertains to uspto utility patents, beyond design and discovery.
          </div>
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            Virus don’t know geographic boundaries, and the U.S. is the leading
            debris-maker of the dead-excrement. What, do you think it didn’t
            require cell to reproduce at first?
          </div>
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            Importance of education of these adverse events is as it related s
            to vaccine decision making, to specific populations, we are talking
            about, and ultimately those are small and limited to
            contra-indications, or null hypothesis, depending on if you think it
            matters.“
          </div>
          <Cable
            style={{
              maxWidth: "600px",
              height: "400px",
              width: "100%",
              maxHeight: "50vw"
            }}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.youtube.com/embed/-spTY4y8euI"
            }
            float="left"
            title="Ford Brewer MD bacteria notions, reasonable doubt"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 4]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          thrombosis fatality rate by asymptomatic byproduct prevalence is fraud
          <Cable
            style={{
              maxWidth: "600px",
              width: "100%"
            }}
            img={true}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.dl.dropboxusercontent.com/s/dz0jtibtz3kaxo3/Screen%20Shot%202021-12-16%20at%203.32.27%20PM.png?dl=0"
            }
            float="left"
            title="CDC - "
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 3]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <br />
          overall fever and acute flaccid paralysis overtime confirms the null
          hypothesis by attenuation of only warning mechanism + byproduct,
          precalence use case.
          <br />
          <br />
          non-exclusive artifact requires all-inclusive symptomatic fever
          increase testing credential,&nbsp;
          <a href="https://humanharvest.info/testing">regime as is in Isreal</a>
          , warning mechanism control from vacuum, not with standing.
          {this.state.lastWidth && (
            <a
              style={{ color: "rgb(230,230,255)" }}
              href="https://gis.cdc.gov/grasp/fluview/fluportaldashboard.html"
            >
              <Vaxx
                lastWidth={Math.min(600, this.state.lastWidth)}
                style={{
                  transform: "translate(0,0)",
                  backgroundColor: "rgba(250,250,250,0.6)",
                  height: "200px"
                }}
              />
            </a>
          )}
          <a href="https://www.cdc.gov/flu/weekly/overview.htm#:~:text=5.%20Mortality%20Surveillance">
            "COVID-19 coded deaths were added to P&I to create the PIC
            (pneumonia, influenza, and/or COVID-19) classification."
          </a>
          <Cable
            style={{
              maxWidth: "600px",
              width: "100%"
            }}
            img={true}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.dl.dropboxusercontent.com/s/r08bu3k2cpez3t1/Screen%20Shot%202021-12-16%20at%204.10.17%20PM.png?dl=0"
            }
            float="left"
            title="CDC - Heather Scobie PhD, MPH cartoon virion"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 2]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <h2>
            in a 130 attended meeting of vaccine racketprop by the cdc, they say
            anymptomatic testing is gone without symtpomatic credential, missing
            the cause for the warning mechanism byproduct (WMB, or WMA, "Warning
            Mechanism Artifact," to emphasize non-exclusivity of byproduct, as
            opposed to just byproduct)
          </h2>
          <Cable
            style={{
              maxWidth: "600px",
              width: "100%"
            }}
            img={true}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.dl.dropboxusercontent.com/s/7faqynxn1splgd6/Screen%20Shot%202021-12-16%20at%204.19.19%20PM.png?dl=0"
            }
            float="left"
            title="CDC - Heather Scobie PhD, why are you concerned by what you see but not by what you do not?"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 1]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            "When PCR-based assays are used, confirmatory sequencing of at least
            a subset of viruses should be performed to be able to use these
            assay results as indicators of community circulation of the variants
            of concern. Before introducing a new testing method or a new assay,
            a &nbsp;
            <a href="https://www.ecdc.europa.eu/sites/default/files/documents/Methods-for-the-detection-and-identification-of-SARS-CoV-2-variants.pdf">
              validation and verification
            </a>
            &nbsp;exercise should be carried out to ensure that the laboratory
            testing system is performing adequately for the circulating viruses.
            Reporting the results to The European Surveillance System (TESSy)
            and the sequences to GISAID or other public databases should be done
            in a timely manner (ideally weekly)."
          </div>
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            “People who are let vaccinated are still getting the disease, and
            passing the disease on.” Prevalence does not cause, make.
          </div>
          <Cable
            style={{
              maxWidth: "600px",
              width: "100%"
            }}
            img={true}
            onError={handleScollImgError}
            src={
              this.state.noyoutube
                ? ""
                : "https://www.dl.dropboxusercontent.com/s/evvmqojcj9h24xf/Screen%20Shot%202021-12-16%20at%205.10.54%20PM.png?dl=0"
            }
            float="left"
            title="Chris Salcedo (Newsmax) - Ben Carson neuro"
            scrolling={this.state.scrolling}
            fwd={this["scrollImg" + 8]}
            scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
            scrollTop={this.state.scrollTop}
          />
          <div
            style={{ margin: "10px", padding: "10px", borderRadius: "15px" }}
          >
            "It will continue to mutate, as it attenuates, as it does diminish
            towards its own vivo ratio-capacity," that would be if taxonomy
            other than byproduct would make sense. Evolutionary trait, doesn’t
            require cell to replicate, or it only comes out.
          </div>
          <h2>
            <Cable
              style={{
                maxWidth: "600px",
                width: "100%"
              }}
              img={true}
              onError={handleScollImgError}
              src={
                this.state.noyoutube
                  ? ""
                  : "https://www.dl.dropboxusercontent.com/s/2xd18fdlj5d8m4o/Screen%20Shot%202021-12-17%20at%205.55.38%20PM.png?dl=0"
              }
              float="left"
              title="Chris Salcedo (Newsmax) - Vince Skaggs, 'can't receive new liver without being vaxxed'"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + 9]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
            KANSAS CITY UNIVERSITY WILL NOT GIVE THIS MAN A LIVER TRANSPLANT
            WITHOUT A VACCINATION. CAN THEY DO MATH?
            <br />
            DO YOU JUST WANT PLYABLE FOLLOWER OR GULLIBLE CLASS TO LIVE?
          </h2>
          seems like twitter just&nbsp;
          <a href="https://twitter.com/nickcarducci">bans</a>
          &nbsp;whistleblowers (that arent plants), like I know my product when
          finished will be better than yours for politics, but I am busy. Could
          you be that pathetic as that would be your motive of
          <h1>
            CENSORSHIP WITHOUT COURT-BASED-DESISTATION OF INDUSTRY VARIABLE
            MULTIPLE OF 11/12 JURY TRUTHS, MINIMAL VIABLE PRODUCT PERMITTING,
            FREE RIDER IMMUTABLE DESIGNATION OR COLLECTIVE NON-FLACCID BARGAIN,
            OR CONVICTION WITH ARRESTING OFFICER EVIDENCE & REVIEW OR RELEASE,
            WITH CONVICT INTRANET TAMPER PROOF GRID DNS AND LOGIN.GOV WITH
            OPEN-SOURCE-LICENSURE TO SOLVE THE FAUCI DOG CRISIS, 80K/YR+ MISSING
            CHILDREN AND CURRENCY-MONOPOLY OF SCRIPTS PHARMACY DEPOSITARY WITH
            INGREDIENT-LISTS AND REVIEWS, NO CRAFT BEERS SECRETS, DR. FAUCI.
            SORRY.
          </h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
