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
    display: none;
  }

  &:hover .mainMenu {
    display: flex;
  }

  .subMenu {
    display: none;
    flex-direction: row-reverse;
    padding-left: 0px;
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
  button {
    display: inline-block;
    position: relative;
    outline: none;
    user-select: none;
    width: 60px;
    height: 60px;
    text-align: center;
    background: #eee;
    color: #336699;
    border-radius: 50%;
    border: 0;
    overflow: hidden;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
  }
`;
function Menus() {
  return (
    <FloatingActionButton>
      <button className="mainButton">+</button>
      <ul className="mainMenu">
        <li>
          <button>소개</button>
        </li>
        <li className="subButton">
          <button>코스</button>
          <ul className="subMenu">
            <li>
              <button>코스1</button>
            </li>
            <li>
              <button>코스2</button>
            </li>
            <li>
              <button>코스3</button>
            </li>
          </ul>
        </li>
        <li>
          <button>432</button>
        </li>
        <li>
          <button>123</button>
        </li>
      </ul>
    </FloatingActionButton>
  );
}

export default Menus;
