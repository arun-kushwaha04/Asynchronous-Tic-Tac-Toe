import styled from 'styled-components';

export const Wrapper = styled.div`
 background-color: #fff;
 border: 2px solid black;
 border-radius: 2rem;
 margin: 2rem auto 2rem auto;
 display: flex;
 padding: 1rem;
 flex-direction: column;
 height: 90vh;
 aspect-ratio: 0.5;
 overflow-y: auto;
 position: relative;
 ::-webkit-scrollbar {
  display: none;
 }
`;

export const Button = styled.button`
 width: 100%;
 margin: 1rem 0;
 font-size: 1rem;
 line-height: 1.2rem;
 text-align: center;
 color: white;
 min-height: 3.5rem;
 border-radius: 0.5rem;
 display: flex;
 align-items: center;
 justify-content: center;
 font-family: 'Epilogue';
 font-style: normal;
 font-weight: 700;
 cursor: pointer;
 box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.16);
 background-color: ${(props) => props.color};
 outline: none;
 border: none;
 a {
  color: inherit;
 }
`;

export const FormField = styled.div`
 width: 100%;
 display: flex;
 gap: 0.25rem;
 flex-direction: column;
 margin: 0.5rem 0rem;
`;

export const Label = styled.label`
 font-family: 'Epilogue';
 font-style: normal;
 font-weight: 700;
 font-size: 1rem;
 line-height: 1.2rem;
 color: #333333;
`;
export const Input = styled.input`
 display: flex;
 flex-direction: row;
 align-items: center;
 padding: 1em 0.75em;
 gap: 0.4rem;
 background: #e8ecec;
 border-radius: 0.5rem;
 width: 100%;
 outline: none;
 border: none;

 //text
 font-family: 'Epilogue';
 font-style: normal;
 font-weight: 400;
 font-size: 1rem;
 line-height: 1.2rem;
 color: #333333;
 opacity: 0.5;
`;

export const ToastMessage = styled.div`
 width: 100%;
 font-size: 1rem;
 line-height: 1.2rem;
 text-align: center;
 color: white;
 min-height: 4rem;
 border-radius: 0.5rem;
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: normal;
 box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.16);
 background-color: ${(props) => props.color};
 outline: none;
 border: none;
 a {
  color: inherit;
 }
`;
