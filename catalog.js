"use strict";

const games = document.getElementById("games");
const count = document.getElementById("count");
const statusLine = document.getElementById("status");
const template = document.getElementById("game-template");

function webLink(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function card(game, url) {
  const item = template.content.firstElementChild.cloneNode(true);
  const cover = item.querySelector(".cover");
  if (game.cover) {
    const img = document.createElement("img");
    img.alt = game.coverAlt || "";
    img.addEventListener("error", () => img.remove(), {once: true});
    img.src = game.cover;
    cover.append(img);
  }
  const meta = item.querySelector(".meta");
  if (game.genre) {
    const genre = document.createElement("span");
    genre.className = "genre";
    genre.textContent = game.genre;
    meta.append(genre);
  }
  if (Array.isArray(game.devices) && game.devices.length) {
    const devices = document.createElement("span");
    devices.textContent = game.devices.join(" / ");
    meta.append(devices);
  }
  item.querySelector("h3").textContent = game.title;
  item.querySelector(".description").textContent = game.description;
  const play = item.querySelector(".play");
  play.href = url;
  play.setAttribute("aria-label", game.title + " をプレイする");
  const repo = webLink(game.repository);
  if (repo) {
    const link = document.createElement("a");
    link.className = "source";
    link.href = repo;
    link.textContent = "ソースコード";
    link.setAttribute("aria-label", game.title + " のソースコード");
    item.querySelector(".actions").append(link);
  }
  return item;
}

async function loadCatalog() {
  let message = "";
  try {
    const response = await fetch("./games.json", {cache: "no-cache"});
    if (!response.ok) throw new Error("Catalog unavailable");
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error("Invalid catalog");
    const list = document.createDocumentFragment();
    for (const game of entries) {
      const url = webLink(game?.url);
      if (url && typeof game.title === "string" && game.title.trim() && typeof game.description === "string") {
        list.append(card(game, url));
      }
    }
    const total = list.childElementCount;
    games.replaceChildren(list);
    count.textContent = total + "作品";
    count.hidden = false;
    if (!total) message = "現在、公開中のゲームはありません。";
  } catch {
    message = "ゲーム一覧を読み込めませんでした。ページを再読み込みしてください。";
  }
  statusLine.textContent = message;
  statusLine.hidden = !message;
}

loadCatalog();
