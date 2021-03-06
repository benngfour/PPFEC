import React from 'react';
import styled from 'styled-components';

const CharacBreakDownWrapper = styled.div`
  padding: 10px 5px;
  width: 15vw;
`;

const FeedbackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CharcBarContainer = styled.div`
  height: 10px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Background = styled(BaseBox)`
  background: #e0e0e0;
  width: 100%;
`;

const TriangleScaleIcon = styled(BaseBox)`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 15px solid #80ccc4;
  left: ${({ percent }) => (percent / 100) * 15}vw;
`;

function getRange(characteristic) {
  const smallLarge = ['Size', 'Width', 'Length'];
  const splRange = ['Too small', 'Perfect', 'Too large'];
  const pgRange = ['Poor', 'Great'];
  if (smallLarge.includes(characteristic)) {
    return splRange;
  }
  return pgRange;
}

const ProductBreakDown = ({ reviewsMeta, reviews }) => {
  const characteristics = Object.keys(reviewsMeta.characteristics);
  return (
    characteristics.map((characteristic) => {
      let value;
      if (reviewsMeta.characteristics[characteristic].value !== null && reviews.length > 0) {
        value = reviewsMeta.characteristics[characteristic].value;
      } else {
        value = 0;
      }
      const charValue = ((value / 5) * 100);
      const ranges = getRange(characteristic);
      return (
        <CharacBreakDownWrapper key={reviewsMeta.characteristics[characteristic].id}>
          <div>{characteristic}</div>
          <CharcBarContainer>
            <Background />
            <TriangleScaleIcon percent={charValue} />
          </CharcBarContainer>
          <FeedbackWrapper>
            { ranges.map((range) => (
              <span key={reviewsMeta.characteristics[characteristic].id
               + reviewsMeta.characteristics[characteristic].value + range}
              >
                {range}
              </span>
            ))}
          </FeedbackWrapper>
        </CharacBreakDownWrapper>
      );
    })
  );
};

export default ProductBreakDown;
