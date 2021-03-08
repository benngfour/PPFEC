import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const Wrapper = styled.div`
  position: absolute;
  display: table;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  max-width: 70vw;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
`;

const Expanded = styled.img`
  ${(props) => props.zoomed && 'transform: scale(2.5)'};
  display: block;
  max-height: 95vh;
  cursor: ${(props) => (props.zoomed ? 'zoom-out' : 'zoom-in')};
  // background-position-x: ${(props) => props.x};
  // background-position-y: ${(props) => props.y};
`;

const ModalLeftArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 6;
  position: absolute;
  top: 44vh;
  left: .5vw;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

const ModalRightArrow = styled.div`
  color: #e0e0e0;
  font-size: 1.75rem;
  z-index: 6;
  position: absolute;
  right: .5vw;
  top: 44vh;
  &:hover {
    color: #80ccc4;
    transform: scale(1.1);
  };
`;

class ExpandedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomed: false,
      // x: 0,
      // y: 0,
    };
    this.expanded = React.createRef();
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.arrowClickHandler = this.arrowClickHandler.bind(this);
    this.trackMouse = this.trackMouse.bind(this);
  }

  trackMouse() {
    const node = this.expanded.current;

    node.addEventListener('mousemove', (e) => {
      // console.log('hello');
      this.setState({
        x: -e.offsetX,
        y: -e.offsetY,
      });
      // node.style.setProperty('--x', `${-e.offsetX}px`);
      // node.style.setProperty('--y', `${-e.offsetY}px`);
    });
  }

  imageClickHandler(event) {
    event.stopPropagation();
    this.setState((prevState) => ({ zoomed: !prevState.zoomed }), this.trackMouse);
  }

  arrowClickHandler(event) {
    event.stopPropagation();
    this.props.clickNavHandler(event);
  }

  render() {
    return ReactDOM.createPortal(
      <Wrapper>
        {this.props.index !== 0 && <ModalLeftArrow onMouseDown={this.arrowClickHandler}><FontAwesome id="-1" name="angle-left" size="2x" /></ModalLeftArrow> }
        <Expanded
          key={this.props.id}
          src={this.props.src}
          alt={this.props.alt}
          zoomed={this.state.zoomed}
          ref={this.expanded}
          x={this.state.x}
          y={this.state.y}
          onMouseDown={(event) => this.imageClickHandler(event)}
        />
        {this.props.index !== this.props.length - 1 && <ModalRightArrow onMouseDown={this.arrowClickHandler}><FontAwesome id="1" name="angle-right" size="2x" /></ModalRightArrow> }
      </Wrapper>,
      document.getElementById('modal-root'),
    );
  }
}

export default ExpandedImage;
