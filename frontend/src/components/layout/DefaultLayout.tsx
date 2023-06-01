import { useEffect } from 'react';
import { tCustomConfirm } from '../../app/general/types';
import { scrollToElement } from '../../app/general/middlewares';
import Loading from './general/Loading';
import CustomConfirm from './general/CustomConfirm';
import Header from './header/Header';
import Footer from './footer/Footer';
import JumpTop from './general/JumpTop';

type tProps = {
  children: JSX.Element;
  loading?: boolean;
  customConfirm?: tCustomConfirm;
};

const DefaultLayout: React.FC<tProps> = (props) => {
  useEffect(() => {
    // scroll top in case of page change
    scrollToElement();
  }, []);

  return (
    <>
      {props.loading && <Loading />}
      {props.customConfirm && <CustomConfirm {...props.customConfirm} />}
      <Header />
      <main className="layout-positioner">{props.children}</main>
      <Footer />
      <JumpTop />
    </>
  );
};

export default DefaultLayout;
