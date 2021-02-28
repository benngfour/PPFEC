import React from 'react';
import Feature from './Feature.jsx';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
`

const FeaturesList = ({ features }) => (
  <List>
    {features.map((feature, index) => <Feature key={index} feature={feature} />)}
  </List>
)

export default FeaturesList;
