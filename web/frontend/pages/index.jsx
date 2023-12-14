import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { Logo, Bg, pic1, pic2, pic3, pic4 } from "../assets";
import "./index.css";
import { ProductsCard } from "../components";
import { useAuthenticatedFetch } from "../hooks";
import { useState } from "react";

export default function HomePage() {
  // const { t } = useTranslation();
  // console.log("t", t);

  // const [a, b] = useState('');
  const [spin, setSpin] = useState(false);
  const [enableText, setEnableText] = useState("Enable 3D/AR Metafield");

  const fetch = useAuthenticatedFetch();

  async function createMetafield() {
    setSpin(true);
    const response = await fetch("/api/product/createMetafield");
    console.log("response", response);
    if (response.ok) {
      setSpin(false);
      setEnableText("Enabled 3D/AR Metafield");
    } else {
      setSpin(false);
      setEnableText("Enable 3D/AR Metafield");
    }
  }
  return (
    <>
      <div className="container">
        <div className="containerTwo">
          <div className="section">
            <img src={Logo} alt="Bigsurmoon" className="img" />
            <h1>Connect Bigsurmoon</h1>
            <p>To get started, you need to connect your Bigsurmoon account</p>
            <button onClick={createMetafield}>
              {spin ? <Spinner size="small" /> : enableText}{" "}
            </button>

            <h2>Set up your store</h2>
            <p>Once Bigsurmoon is connected, you can set up your store!</p>
            <div className="box">
              <div className="boxSectionOne">
                <img src={Bg} alt="Bg" />
                <div className="boxSectionOneDiv">
                  <img src={pic1} alt="picOne" />
                </div>
              </div>
              <div className="boxSectionTwo">
                <h1>1. Add the experience to a product</h1>
                <p>
                  To see the 3D preview on your product pages, you need to link
                  Bigsurmoon 3D/AR experiences to your related products. To do
                  so, simply go to the product page, choose a product. Under
                  Metafield section, Under product page paste your URL from
                  Bigsurmoon dashboard.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="boxSectionOne">
                <img src={Bg} alt="Bg" />
                <div className="boxSectionOneDiv">
                  <img src={pic2} alt="pictwo" />
                </div>
              </div>
              <div className="boxSectionTwo">
                <h1>2. Add Block to your theme</h1>
                <p>
                  You can add blocks on all your product page. To add 3D/AR
                  viewer On your product page, simply select Online store, Under
                  Themes section, click on Add Block, select 3D/AR Embed.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="boxSectionOne">
                <img src={Bg} alt="Bg" />
                <div className="boxSectionOneDiv">
                  <img src={pic3} alt="picthree" />
                </div>
              </div>
              <div className="boxSectionTwo">
                <h1>3. Set up your block</h1>
                <p>
                  Set up your preferred size of the 3D/AR experience block on
                  desktop and mobile. The preview of the viewer is automatically
                  updating at every step helping you find the perfect layout.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="boxSectionOne">
                <img src={Bg} alt="Bg" />
                <div className="boxSectionOneDiv">
                  <img src={pic4} alt="picFour" />
                </div>
              </div>
              <div className="boxSectionTwo">
                <h1>4. Arrange, hide or remove blocks</h1>
                <p>
                  At any time from the Editor section of your product page you
                  can:
                </p>
                <li>
                  Reorder the blocks using the handles icon and dragging them
                </li>
                <li>
                  Delete the blocks using the bin icon included in the actions
                </li>
                <li>
                  Hide/show the blocks using the eye icon from the same actions
                  menu
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Page narrowWidth>
        <TitleBar title={t("HomePage.title")} primaryAction={null} />
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Stack
                wrap={false}
                spacing="extraTight"
                distribution="trailing"
                alignment="center"
              >
                <Stack.Item fill>
                  <TextContainer spacing="loose">
                    <Text as="h2" variant="headingMd">
                      {t("HomePage.heading")}
                    </Text>
                    <p>
                      <Trans
                        i18nKey="HomePage.yourAppIsReadyToExplore"
                        components={{
                          PolarisLink: (
                            <Link url="https://polaris.shopify.com/" external />
                          ),
                          AdminApiLink: (
                            <Link
                              url="https://shopify.dev/api/admin-graphql"
                              external
                            />
                          ),
                          AppBridgeLink: (
                            <Link
                              url="https://shopify.dev/apps/tools/app-bridge"
                              external
                            />
                          ),
                        }}
                      />
                    </p>
                    <p>{t("HomePage.startPopulatingYourApp")}</p>
                    <p>
                      <Trans
                        i18nKey="HomePage.learnMore"
                        components={{
                          ShopifyTutorialLink: (
                            <Link
                              url="https://shopify.dev/apps/getting-started/add-functionality"
                              external
                            />
                          ),
                        }}
                      />
                    </p>
                  </TextContainer>
                </Stack.Item>
                <Stack.Item>
                  <div style={{ padding: "0 20px" }}>
                    <Image
                      source={trophyImage}
                      alt={t("HomePage.trophyAltText")}
                      width={120}
                    />
                  </div>
                </Stack.Item>
              </Stack>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <ProductsCard />
          </Layout.Section>
        </Layout>
      </Page> */}
    </>
  );
}
