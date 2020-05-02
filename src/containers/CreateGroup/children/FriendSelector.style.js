import styled from 'styled-components';

export const FriendSelectorWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
`

export const FriendSelectorContainer = styled.div`
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
  overflow:hidden; 
  overflow-y:scroll;
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
`

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  h1 {
    color: #00B020;
  }

`;