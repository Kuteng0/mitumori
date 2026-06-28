# mitumori

農産品・農副産品の中間商が、日本のTikTokライブ販売を行う取引先向けに、売上、仕入原価、控除費用、補助金、見込利益、見積書を計算する静的Webアプリです。

## 機能

- 複数商品、複数規格、数量、販売単価、仕入単価の一括計算
- 農産品・農副産品の商品マスターと規格マスターの追加、編集、削除
- TikTok手数料、決済手数料、送料、梱包費、補助、協賛金などの控除・補助計算
- 金額、売上比率、数量単価、任意式による計算
- 標準テンプレート、カスタムテンプレート保存、複製、削除
- 正式見積書フィールド、見積書の直接編集、A4印刷向けPDF出力
- iPhone優先のレスポンシブUI、PWAキャッシュ対応

## Cloudflare Pages

ビルド不要の静的サイトです。Cloudflare Pagesでは以下でデプロイできます。

- Build command: 空欄
- Build output directory: `/`

GitHubにアップロード後、Cloudflare Pagesでこのリポジトリを接続してください。

## Wranglerで直接デプロイ

Cloudflareにログイン済みの環境では以下で直接公開できます。

```bash
wrangler pages project create mitumori
wrangler pages deploy . --project-name mitumori --branch main
```

PowerShellで `wrangler.ps1` がブロックされる場合は `wrangler.cmd` を使ってください。
