# 動物100診断 - 改善点TODO

## 高優先度（本番環境では必須）

### データ永続化
- [x] 統計API（`/api/stats`）をNeon（PostgreSQL）に移行
  - 開発環境ではメモリフォールバック、本番ではNeon使用

### テスト
- [x] テストフレームワーク導入（vitest + React Testing Library）
- [x] `calculateAnimalScore`関数のユニットテスト
- [x] 動物データ（`animals.ts`）の整合性テスト
- [ ] APIルートの統合テスト

### エラーハンドリング
- [x] 統計API失敗時のユーザーフィードバック追加（`app/page.tsx`）
- [x] APIレスポンスのエラーハンドリング統一

### セキュリティ
- [x] `next.config.ts`にセキュリティヘッダー追加（X-Frame-Options、X-Content-Type-Options等）
- [x] OG画像APIのパラメータバリデーション強化（XSS対策）
- [ ] ユーザー入力（名前）のサーバーサイドバリデーション追加
- [ ] 環境変数のスキーマ定義（`zod-env`等）

---

## 中優先度

### コード品質
- [ ] TypeScript型定義の厳密化
  - `app/animal/page.tsx`の`MyResult`型改善
  - APIレスポンス型の定義
- [ ] マジックナンバーの定数化
  - 名前の最大文字数（20）
  - グリッド列数
  - プログレスバー計算式
- [ ] zodによるスキーマバリデーション導入

### パフォーマンス
- [ ] 動物データのJSON外部化（バンドルサイズ削減）
- [ ] OG画像のキャッシュ戦略実装
- [ ] APIコールの最適化（バッチ処理検討）

### UI/UX
- [ ] ダークモード完全対応
  - 現状: `prefers-color-scheme`対応あるがUI全体がライトモード前提
- [ ] ローディング状態の可視化
  - 統計情報取得中のスケルトン/スピナー
  - ページ遷移時のローディング表示

### 開発体験
- [x] `package.json`にスクリプト追加（`test`, `test:run`, `type-check`）
- [ ] Prettier導入
- [ ] Pre-commit hooks設定（lint-staged + husky）

---

## 低優先度（ユーザー体験向上）

### アクセシビリティ
- [ ] `AnimalIcon`コンポーネントに`role="img"`と`aria-label`追加
- [ ] キーボードナビゲーション対応
- [ ] フォーカス状態の可視化改善

### SEO
- [ ] 構造化マークアップ（schema.org）追加
- [ ] sitemap.xml生成
- [ ] robots.txt最適化

### 機能追加
- [ ] PWA化（service worker、manifest.json）
- [ ] 診断履歴機能（localStorage活用）
- [ ] 結果の比較機能
- [ ] 動物データのフィルタリング/検索機能

### 分析・監視
- [ ] Google Analytics統合
- [ ] Sentry（エラー監視）統合
- [ ] パフォーマンスモニタリング

### ドキュメント
- [ ] 診断ロジック（スコア計算）の説明追加
- [ ] トレイトマッピングの設計根拠記載
- [ ] API仕様書作成
- [ ] データ更新手順書

### データ品質
- [ ] 存在しない動物への相性参照を修正（ビーバー、サメ、シャチ等）

---

## 完了済み

- [x] 診断結果の多様性向上（スコア計算ロジック改善）
- [x] OG画像に日本語フォント対応
- [x] Noto Color Emojiへの完全統一
- [x] 95種類の動物データ完成
- [x] 統計情報表示機能
- [x] 「自分の結果に戻る」ボタン追加
- [x] docsフォルダの整理・README作成
- [x] 統計APIをNeon（PostgreSQL）に移行（本番環境用）
- [x] テストフレームワーク導入（vitest）
- [x] エラーハンドリング強化
- [x] セキュリティヘッダー追加
- [x] OG画像APIの入力サニタイズ
- [x] 重複動物データ（owl）の削除

---

## 現状の完成度

| 観点 | 評価 | 課題 |
|------|------|------|
| 機能実装 | ★★★★★ | 診断・表示・共有すべて実装済み |
| コード品質 | ★★★★☆ | テスト導入済み、型定義は改善余地あり |
| セキュリティ | ★★★★☆ | 基本対策済み、環境変数管理は要改善 |
| パフォーマンス | ★★★★☆ | キャッシング戦略が必要 |
| スケーラビリティ | ★★★★☆ | Neon PostgreSQL対応済み |
| ドキュメント | ★★★☆☆ | 基本説明のみ |
| UX/UI | ★★★★☆ | エラー表示改善済み、ローディング状態は要改善 |

## Neon PostgreSQL設定手順

本番環境でNeonを使用するには：

1. [Neon Console](https://console.neon.tech/)でプロジェクトを作成
2. データベースの接続文字列をコピー
3. Vercelダッシュボードでプロジェクトを開く
4. Settings → Environment Variables で環境変数を追加：
   - `DATABASE_URL`: Neonの接続文字列（`postgresql://...`）
5. 再デプロイで有効化

または、VercelのMarketplaceからNeonを追加する場合：
1. Vercelダッシュボードで Storage → Browse Marketplace → Neon を選択
2. 接続すると `DATABASE_URL` が自動設定される
3. 再デプロイで有効化
