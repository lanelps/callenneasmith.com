import React from "react";

import { Layout, Image } from "~components";

import tinderbox from "~assets/images/300px-Firemaking.gif";

const Index = () => (
  <Layout>
    <h1 className="h1">Hello world!</h1>
    <Image image={tinderbox} />
  </Layout>
);

export default Index;
