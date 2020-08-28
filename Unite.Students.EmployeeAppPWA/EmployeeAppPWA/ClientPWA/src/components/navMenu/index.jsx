import React from 'react';
import styled from 'styled-components';
import Colours from 'Unite/Shared/colours';
import MenuLink from './menuLink';
import { isSafari } from 'Unite/Utils/browserUtils';

const Container = styled.nav`
  position: sticky;
  bottom: 0;
  background: ${Colours.yellowPale};
  height: 100px;
  flex: 1;
  border-top: 2px solid white;
`;

const Menu = styled.ul`
  display: flex;
  flex: 1;
  justify-content: column;
  margin: 0;
  padding: 0;
  position: relative;
  height: 100px;
`;

const Item = styled.li`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const NavMenu = (props) => {
  const pathForUsefulLinks = isSafari() ? '' : '/useful-links';

  return (
    <Container>
      <Menu>
        <Item>
          <MenuLink label="News feed" to="/" activeOnlyWhenExact={true} icon="icon-property" />
        </Item>
        <Item style={{ borderWidth: 1, }}>
          <MenuLink label="Useful links" to={pathForUsefulLinks} activeOnlyWhenExact={false} icon="icon-Useful-links" />
        </Item>
      </Menu>
    </Container>
  );
};

export default NavMenu;