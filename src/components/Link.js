import React, { useMemo } from 'react';
import styled from 'styled-components';

const Link = ({ name, url, ImgComp }) => {
  return useMemo(() => {
    return (
      <CustomAtag href={url} target="_blank">
        <LinkItem>
          <ImgComp style={{ fontSize: '44px' }} />
          <p>{name}</p>
        </LinkItem>
      </CustomAtag>
    );
  }, [name, url, ImgComp]);
};

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomAtag = styled.a`
  text-decoration: none;
  color: black;
`;

export default Link;
