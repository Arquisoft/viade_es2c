import styled from 'styled-components';
import {media} from '../../utils';

export const SelectorWrapper = styled.section`
  width: 100%;
  background-image: url('img/pattern-geo.png'),
    radial-gradient(#00B010, #00B010, #005F11);
    // linear-gradient(25deg, #C5D8DF 40%, #C5D8DF 50%, #00B020 100%);
  background-repeat: repeat, no-repeat;
    
  padding: 50px 0;

  h3 {
    color: #666666;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
`;

export const SelectorCard = styled.div`
  background-color: #fff;
  margin: 30px auto;

  max-width: 80% !important;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: center;
  
   button {
    margin-left: 8px;
  }
`;

export const SelectorOption = styled.div`
  height: 100%;
  text-align: center;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  h1,
  img {
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
  }

  ${media.tablet`
    width: 50%;
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color:#D0D0D0;
      top:0;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 30px 20px;
  h1 {
    color: #00B020;
  }
`;

export const SelectorContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;