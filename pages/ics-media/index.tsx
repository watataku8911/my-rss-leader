import Head from "next/head";
import styles from "../../styles/Home.module.css";

import Header from "../../compornents/Header/Header";
import Card from "../../compornents/Card/Card";
import Footer from "../../compornents/Footer/Footer";
import { useEffect, useState, ComponentProps } from "react";

type Response = {
  feed: Feed;
  items: Items[];
  status: string;
};

type Feed = {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  url: string;
};

type Items = {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: Enclosure;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
};

type Enclosure = {
  link: string;
  type: string;
};

export default function Home() {
  const [lists, setLists] = useState<Items[]>([]);

  const stringCutTitle = (title: string): string => {
    const max_length: number = 30; //文字数上限
    let modStr: string = ""; //カット後の文字列

    if (title.length > max_length) {
      modStr = title.substr(0, max_length) + "...";
      return modStr;
    } else {
      return title;
    }
  };

  const stringCutDescription = (description: string): string => {
    const STRING: string = description;
    const MAX_LENGTH: number = 50; //文字数上限
    let modStr: string = ""; //カット後の文字列

    if (STRING.length > MAX_LENGTH) {
      modStr = STRING.substr(0, MAX_LENGTH) + "...";
      return modStr;
    } else {
      return STRING;
    }
  };

  const getZenn = async (): Promise<Items[]> => {
    const endpoint: string = "https://api.rss2json.com/v1/api.json";
    const feed_url: string = "https://ics.media/feed/atom.xml";

    const resp: globalThis.Response = await fetch(
      `${endpoint}?rss_url=${feed_url}`
    );
    const data: Response = await resp.json();

    const items: Items[] = data.items;
    return items;
  };

  useEffect(() => {
    const icsFeed: Promise<Items[]> = getZenn();
    icsFeed.then((datalist) => {
      setLists(datalist);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>my-rss-leader｜ics.media</title>
        <meta
          name="description"
          content="ics.mediaさんの記事データを取得してみました。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <h1>ics.media</h1>

      <main className={styles.main}>
        {lists.map((item: ComponentProps<typeof Card>, index: number) => {
          return (
            <Card
              link={item.link}
              title={stringCutTitle(item.title)}
              description={stringCutDescription(item.description)}
              key={index}
            />
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
