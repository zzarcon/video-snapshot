import styled, {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    font-family: Helvetica;
  }
  input {
    display: block;
  }
  img {
    width: 300px;
    border: 1px solid;
    margin: 5px;
  }
  video {
    width: 500px;
    display: block;
    margin: 10px;
    border: 3px solid;
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
`;

export const TimeWrapper = styled.div`
  display: flex;
`;