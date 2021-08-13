import Head from "next/head";
import { GetStaticProps } from "next";
import Image from "next/image";

import girlCodingImg from "../../public/images/avatar.svg";

import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}/month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={girlCodingImg} alt="Girl Coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1JF5zyEzq5NoXcs0Xg7gXNIw");

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price.unit_amount / 100);

  const product = {
    priceId: price.id,
    amount: formattedPrice,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
