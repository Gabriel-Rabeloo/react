import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Footer = styled.footer`
  background: ${primaryColor};
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 1.6rem;
  display: flex;
  padding-right: 10px;
  position: absolute;
  display: block;
  top: 94.5%;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  color: #fff;
  font-size: 15px;
  text-align: center;
  align-items: center;
  justify-content: center;

  .icon {
    color: #fff;
    margin-left: 8px;
  }
`;
