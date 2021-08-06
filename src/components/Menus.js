import React from "react";
import styled from "styled-components";

const FloatingActionButton = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  display: flex;
  flex-direction: column-reverse;
  place-items: flex-end;

  .mainMenu {
    padding-left: 0px;
    flex-direction: column-reverse;
    place-items: flex-end;
    display:none;
  }

  &:hover .mainMenu {
    display: flex;
    
  }

  .subMenu {
    flex-direction: row-reverse;
    padding-left: 0px;
    display: none;
  }

  .subButton:hover .subMenu {
    display: flex;
  }

  .subButton {
    flex-direction: row-reverse;
    display: flex;
  }
  li {
    list-style: none;
  }
`;
const CustomButton = styled.button`
  background: ${(props) => props.color || "#eee"};
  &.hover {
    background: lighten(${(props) => props.color || "#eee"}, 10%);
  }
  &.active {
    background: darken(${(props) => props.color || "#eee"}, 10%);
  }

  display: inline-block;
  position: relative;
  outline: none;
  user-select: none;
  width: 60px;
  height: 60px;
  text-align: center;
  //background: #eee;
  color: white;
  border-radius: 50%;
  border: 0;
  overflow: hidden;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;
function Menus() {
  return (
    <FloatingActionButton>
      <CustomButton color="#19464D" className="mainButton">
        +
      </CustomButton>
      <ul className="mainMenu">
        <li>
          <CustomButton color="#2D7A86">소개</CustomButton>
        </li>
        <li className="subButton">
          <CustomButton color="#40AFBF">코스</CustomButton>
          <ul className="subMenu">
            <li>
              <CustomButton>코스1</CustomButton>
            </li>
            <li>
              <CustomButton>코스2</CustomButton>
            </li>
            <li>
              <CustomButton>코스3</CustomButton>
            </li>
          </ul>
        </li>
        <li>
          <CustomButton color="#79C7D2">메뉴1</CustomButton>
        </li>
        <li>
          <CustomButton color="#B3DFE5">메뉴2</CustomButton>
        </li>
      </ul>
    </FloatingActionButton>
  );
}

export default Menus;
