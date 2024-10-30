import styled, {css} from "styled-components";

interface ColorTagProps{
    color:string;
}

interface DoneProps{
    opravljeno:boolean;
}

export const Deadline = styled.span`
  font-size: 1rem;
  color: #888;
  margin-left: 16px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
`;
export const Container =styled.div`
    height: 60px;
    width: 70vw;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    margin: 6px 0;
    padding: 12px;
    box-sizing: border-box;
    align-items: center;
`
export const Name = styled.h2<DoneProps>`
    font-size: 18px;
    color: #444;
    margin: 0 16px 0 0;
    font-weight: 500;
    white-space: nowrap;
    
    ${props => props.opravljeno &&
    css`
        color:#bbb;
        font-weight:400;
        text-decoration: line-through;`}
`
export const Icon = styled.img`
    width: 17px;
    margin: 0 16px;
    background: white;

    &:hover{
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.2s ease-in-out;
    }
`
export const CheckField = styled.div`
    width: 50px;
    height: 100%; 
    border-right: 2px solid #eee ;
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
    flex-direction: row; /* Keep it row layout */
    align-items: center;
    justify-content: space-between;
    max-height: 100%;
    overflow: hidden;
`;

export const ListBelong = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    margin-left: 8px;
`

export const ColorTag = styled.div<ColorTagProps>` 
    height: 18px;
    width: 18px;
    border-radius: 9px;
    background: ${props => props.color};
`

export const ListName = styled.p`
    font-size: 16px;
    color: #666;
    margin-left: 8px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

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

    &:hover{
        cursor: pointer;
        background-color: rgba(127, 86, 218, 0.1);
    }
`
export const CheckFill = styled.div<DoneProps>`
    background: #7f56da;
    height: 20px;
    width: 20px;
    border-radius: 11px;
    ${props => !props.opravljeno &&
    css`display:none;`}
`
