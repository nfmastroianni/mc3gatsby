import React from "react";
import Seo from "../components/seo";
import Layout from "../components/layout";
import PageTitle from "../components/page-title";
import { HiCloud } from "react-icons/hi";

export default function Resources({ path }) {
  return (
    <>
      <Seo title='Resources' />
      <Layout>
        <header className='mb-2 sm:mb-4 lg:mb-6 flex flex-col items-center'>
          <PageTitle
            title='Resources'
            icon={
              <HiCloud className='text-3xl sm:text-5xl lg:text-6xl text-blue-700 mt-0 inline-block' />
            }
          >
            Check out some of these helpful resources.
          </PageTitle>
        </header>
      </Layout>
    </>
  );
}
