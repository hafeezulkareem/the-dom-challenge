"use strict";

function addTenParas() {
  const container = document.querySelector("#container");
  const start = container.children.length;

  for (let i = start + 1; i < start + 11; i++) {
    const para = document.createElement("p");
    para.setAttribute("class", "line");
    para.innerText = i;
    container.append(para);
  }
}

function onScrollWindow() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    console.log("Adding new paras...");
    addTenParas();
  }
}

window.addEventListener("scroll", onScrollWindow);
