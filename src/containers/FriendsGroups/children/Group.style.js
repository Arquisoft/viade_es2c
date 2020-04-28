import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background-image: url('/img/pattern-geo.png'), radial-gradient(#00B010, #00B010, #005F11);
  background-repeat: repeat;
  padding: 60px 0;
`
export const GroupContainer = styled.div`
box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
background-color: white;
max-width: 900px;
margin: 0 20px;
width: 100%;
flex: 1 0 auto;
ul {
  list-style: none;
  padding: 0;
  font-size: 2em;
}
ul img {
  width: 10vh;
  height: 10vh;
  float: left; 
  margin: 15px 15px 15px 0px;
}
li {
  padding: 5px 10px;
  background-color: #EEEEEE;
  border: 1px solid #DDDDDD;
}
h2{
    font-size: 1.8em;
}
`

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding: 30px 20px;
  h1 {
    color: #00B020;
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