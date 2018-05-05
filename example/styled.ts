import styled, {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    font-family: Helvetica;
    background-color: #D8D1F5;
  }
  input {
    display: block;
  }
  img {
    width: 300px;
    border: 1px solid;
    margin: 5px;
  }
  
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  .github-corner svg {
    fill:#70B7FD; color:#fff; position: absolute; top: 0; border: 0; right: 0;
  }
`;

export const Preview = styled.img`
  width: 300px;
  border-radius: 3px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const PreviewWrapper = styled.div`
  margin-top: 10px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  
  button {
    margin-right: 20px;
  }
`;

export const VideoPreview = styled.video`
  width: 100%;
  height: 100%;
`;

export const AppWrapper = styled.div`
  background-color: white;
  width: 800px;
  margin: 50px auto;
  padding: 15px;
  border-radius: 3px;
`;

export const VideoWrapper = styled.div`
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #D8D1F5;
  border-radius: 3px;
  overflow: hidden;
  background-color: #FCFAFE;
`;

export const PlayIconWrapper = styled.div`
  border: 6px solid #67386F;
  border-radius: 100%;
  padding: 35px;
  color: #67386F;
  background: #363458;
  cursor: pointer;
  transition: all .4s;

  &:hover {
    background: #67386F;
    border: 6px solid #363458;
    color: #363458;
    box-shadow: 0px 0px 15px 0px black inset;
  }
`;