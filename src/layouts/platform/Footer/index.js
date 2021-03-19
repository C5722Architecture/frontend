import { copyright } from '@platformConfig';
import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '../../components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'GYM SYSTEM',
          title: 'GYM SYSTEM',
          // href: 'https://umijs.org/zh/',
          blankTarget: true,
        },
        {
          key: 'CS5721',
          title: 'CS5721',
          // href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      // copyright={
      //   <Fragment>
      //     Copyright <Icon type="copyright" /> {copyright}
      //   </Fragment>
      // }
    />
  </Footer>
);
export default FooterView;
