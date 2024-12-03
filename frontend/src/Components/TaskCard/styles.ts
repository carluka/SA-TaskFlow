import styled, { css } from "styled-components";

interface ColorTagProps {
  color: string;
}

interface DoneProps {
  opravljeno: boolean;
}

export const Deadline = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-left: 8px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
`;

export const Container = styled.div<DoneProps>`
  height: auto;
  width: 70vw;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  margin: 10px 0;
  padding: 12px;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid #eee;
  transition: opacity 0.3s ease;

  ${props => props.opravljeno &&
    css`
      opacity: 0.3;
    `}
`;

export const Name = styled.h2<DoneProps>`
  font-size: 18px;
  color: #444;
  font-weight: 500;
  margin: 0;
  width: 290px; /* Fixed width for task title */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${props => props.opravljeno &&
    css`
      color: #bbb;
      font-weight: 400;
    `}
`;

export const Icon = styled.img`
  width: 17px;
  margin: 0 12px;
  background: white;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
    opacity: 0.8; /* More subtle hover effect */
  }
`;

export const CheckField = styled.div`
  width: 50px;
  height: 100%;
  border-right: 2px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

export const Description = styled.div`
  flex-grow: 1;
  padding: 6px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
  max-height: 100%;
  overflow: hidden;
`;

export const ListBelong = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

export const ColorTag = styled.div<ColorTagProps>`
  height: 18px;
  width: 18px;
  border-radius: 9px;
  background: ${props => props.color};
`;

export const ListName = styled.p`
  font-size: 16px;
  color: #666;
  margin-left: 8px;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 600px; /* Limit width for ellipsis */
`;

export const CheckboxRing = styled.div`
  background: white;
  height: 20px;
  width: 20px;
  border: 2px solid #7f56da;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(127, 86, 218, 0.1);
  }
`;

export const CheckFill = styled.div<DoneProps>`
  background: #7f56da;
  height: 21px;
  width: 21px;
  border-radius: 11px;
  ${props => !props.opravljeno && css`display: none;`}
`;
