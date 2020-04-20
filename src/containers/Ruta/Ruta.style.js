import styled from 'styled-components';
import {media} from "../../utils";

export const RouteContainer = styled.div`
  background-color: white;
  width: 100%;
  flex: 1 0 auto;
`;

export const Form = styled.div`
  overflow: auto;
  max-height: 85vh;
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
  h1{
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-image: url('img/pattern-geo.png'),
      linear-gradient(135deg, #00B020 0%, #00B020 30%, #00B020 50%);
    background-repeat: repeat, no-repeat;
    padding: 5px;
  }
  h4{
    color: #00B020;
    margin-bottom: 0px;
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
  margin: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 0px;
  }
`;