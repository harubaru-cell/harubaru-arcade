# Harubaru Arcade

個人制作のブラウザゲームを一覧にするポータルです。各作品の「プレイする」から、その作品専用のGitHub Pagesに移動できます。[ポータルを開く](https://harubaru-cell.github.io/harubaru-arcade/)

## 新しいゲームを追加する

1. 新しいゲーム専用のGitHubリポジトリを作成し、ゲームをそのリポジトリのGitHub Pagesに公開します。作品のページを開き、実際にプレイできることを確認します。
2. 画像を載せる場合は、作品のスクリーンショットをこのポータルの `assets/` に追加します。横長のWebP・PNG・JPEGが使えます。中央を基準に切り抜いて表示します。
3. このポータルの [games.json](./games.json) を開き、配列に作品を1件追加します。必須項目は `title`、`description`、`url` の3つです。`url` には、ゲームを遊べる公開ページのHTTPS URLを指定します。
4. 変更を `main` にコミットします。GitHub上の鉛筆アイコンからも編集できます。反映後、ポータルの「プレイする」から新作を開けることを確認します。

作品1件の記入例です。追加するときは、前の作品の閉じ波かっこ `}` との間にカンマを入れ、最後の項目の後ろにはカンマを付けません。

```json
{
  "title": "作品のタイトル",
  "description": "遊び方や見どころを1〜2文で紹介します。",
  "url": "https://harubaru-cell.github.io/your-new-game/",
  "genre": "パズル",
  "devices": ["PC", "スマホ"],
  "cover": "./assets/your-new-game.webp",
  "coverAlt": "パズルの盤面を写したプレイ画面",
  "repository": "https://github.com/harubaru-cell/your-new-game"
}
```

`genre`、`devices`、`cover`、`coverAlt`、`repository` は任意です。対応端末は実際に遊べるものだけ記載します。画像を省略するとカードには共通の背景が表示されます。

## 修正・並べ替え・掲載終了

- **タイトルや説明の修正**は、対象作品の `title` や `description` を編集します。公開先を変えたときは `url` を更新します。
- **並べ替え**は、配列内の作品の順番を入れ替えます。上から順に表示されます。
- **掲載終了**は、対象作品のオブジェクトを配列から削除します。ゲーム本体のリポジトリと公開ページはそのまま利用できます。掲載数をゼロにする場合は `[]` にします。

## 構成と公開設定

| ファイル | 用途 |
| --- | --- |
| `games.json` | 作品一覧と表示順 |
| `assets/` | ポータル用の作品画像 |
| `index.html`、`style.css`、`catalog.js` | ページ構造、デザイン、一覧の表示 |

このリポジトリは静的ファイルをそのまま配信します。GitHubの **Settings → Pages → Build and deployment** で **Deploy from a branch**、**main**、**/ (root)** を選びます。ビルドやパッケージのインストールは不要です。公開の進行状況はリポジトリの **Actions** から確認できます。

手元で確認する場合は、Python 3のある環境で、このREADMEと同じディレクトリから次のコマンドを実行し、ブラウザで [ローカルプレビュー](http://127.0.0.1:8000/) を開いてください。

```sh
python -m http.server 8000 --bind 127.0.0.1
```
