import React from "react";
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
  render() {
    return (
      <div
        style={{
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
          More people joined the NRA this year than people are labeled to have
          died of covid (should be "substantial part of death" with at least
          half, partial derivative) if you stopped counting months ago, covid
          exists without killing so most of those deaths are incorrect except
          for the poisoning, no animal-to-human mutation can create that Mar2020
          death-print is too sudden and likely bad policy (also when fixed for
          age is negligable-altogether)
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
          ,” they were triggered by gain of function + monoclonal antibodies or
          poisoning, masking causes the&nbsp;
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
          "80-90% of people getting covid are wearing cloth masks all the time,
          that is dangerous," says Rand Paul. Not only is it dangerous in
          false-assurance but the harm is in humidity not escaping, and virus
          forming. are you not of the idea that G-d is all things and evolution
          can happen at a cellular level that quickly? you are an opthomologist
          sir
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
          and territories can disclude and not be a societal-free-rider if there
          are visible symptoms, or by a non-invasive temperature check
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
          There is no evidence asymptomatic have virus, where vaccine would help
          in stopping the transmission (on the skin). Only if they are
          symptomatic (thru the skin) is vaccine useful (2 weeks after). in the
          case of symptomatic, you can exclude from travel/business
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
              plausibly been around for decades unless NIH literally made it and
              pulled out is irrefutable admission of guilt
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
            <b>symptoms or repeatable</b>&nbsp;and able to delegate decisions to
            the business (with warnings of policies) in business-place realm,
            for there to be any intervention in travel, well-controlled tests of
            logistics rather than disparate events and unexplained or invisible
            causality would forced-vaccines ever be plausible to travel, or
            deaths would have to be as numerous as when the virus had just been
            released. One thing is for sure:
            <br />
            <br />
            <h5>
              The virus if, not just coincidence people dying in hospitals had
              the common virus, was actually and not just the presumed cause of
              death, killed in a way that must have a source, a person or
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
          )
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
