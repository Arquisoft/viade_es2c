import styled from 'styled-components';
import {media} from "../../utils";

export const RouteWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 60px 0;
`;

export const RouteContainer = styled.div`
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
  p {
    color: white;
  }
  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
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

export const TextArea = styled.textarea`
  margin: 5px;
`;

export const RoutePhoto = styled.div`
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

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 0px;
  }
`;