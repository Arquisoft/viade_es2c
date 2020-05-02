import styled from 'styled-components';
import {media} from "../../utils";

export const GroupWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 60px 0;
`;

export const GroupContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('img/pattern-geo.png'),
    linear-gradient(135deg, #00B020 0%, #00B020 30%, #00B020 50%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  h1 {
    color: white;
  }
`;

export const Form = styled.form`
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
     h4{
     color:#00B020 ;
   }
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const FullGridSize = styled.div`
  grid-column: span 1;
  text-align: left;
  ${media.tablet`
    grid-column: span 2;
  `}
`;

export const Input = styled.input`
  margin: 10px;
`;

export const Button = styled.button`
  margin-left: 5px;
  background-color: #00B020; 
  color: white;
  &:hover{
    transition-duration: 0.4s;
  }
`;

export const Label = styled.label`
  margin: 5px;
`;