import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    width: 100%;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    margin-left: 10px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
