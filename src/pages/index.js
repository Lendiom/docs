import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout
      title="Welcome"
      description="Lendiom is a powerful property and loan management software."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--outline button--secondary button--lg',styles.getStarted)}
              to="https://app.lendiom.com"
            >
              Open Lendiom
            </Link>
            <Link
              className={clsx('button button--outline button--secondary button--lg',styles.getStarted)}
              to="https://pay.lendiom.com"
            >
              Open Lendiom Pay
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}

export default Home;
