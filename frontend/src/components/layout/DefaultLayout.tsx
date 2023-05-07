import { useEffect } from 'react';
import { scrollToElement } from '../../app/general/middlewares';
import Header from './header/Header';
import Loading from './general/Loading';
import Footer from './footer/Footer';
import JumpTop from './general/JumpTop';

type tProps = {
  children: JSX.Element;
  loading?: boolean;
};

const DefaultLayout = (props: tProps) => {
  useEffect(() => {
    // scroll top in case of page change
    scrollToElement();
  }, []);

  return (
    <>
      {props.loading && <Loading />}
      <Header />
      <main className="layout-positioner">{props.children}</main>
      <Footer />
      <JumpTop />
    </>
  );
};

export default DefaultLayout;
