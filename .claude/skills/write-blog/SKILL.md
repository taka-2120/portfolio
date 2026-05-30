---
name: write-blog
description: Write a new technical blog post for the portfolio. Works from ANY repository — useful for documenting problems or findings from another codebase as a portfolio blog article. Produces both en.mdx and ja.mdx with a personal, human-like writing style — no AI filler, no corporate buzzwords.
---

# Write Blog Skill

このスキルはポートフォリオのブログに技術記事を書く。英語（en.mdx）と日本語（ja.mdx）の両方を作成する。
**別リポジトリから呼び出した場合でも動作する。** そのリポジトリで詰まったこと・学んだことをそのままブログ記事にできる。

---

## Step 0: 準備

### 0-1. Portfolio の場所を特定する

```bash
# 現在地がportfolioか確認
ls src/content/blog/ 2>/dev/null && echo "IN_PORTFOLIO" || echo "NOT_IN_PORTFOLIO"
```

- `IN_PORTFOLIO` の場合: `PORTFOLIO_ROOT=.`
- `NOT_IN_PORTFOLIO` の場合: 以下の順で探す
  1. `ls ../portfolio/src/content/blog/ 2>/dev/null`
  2. `find /home -maxdepth 4 -type d -name "blog" -path "*/content/blog" 2>/dev/null | head -3`
  3. 見つからなければユーザーに portfolio のパスを聞く

### 0-2. 避けるべき表現リストを読む

`{PORTFOLIO_ROOT}/.claude/skills/write-blog/avoid-phrases.md` を Read して把握する。記事全体を通してそのリストを守る。

### 0-3. 別リポジトリから実行した場合の文脈整理

現在のリポジトリ（`git remote get-url origin 2>/dev/null` で確認）をユーザーに伝え、**そのリポジトリでの体験や問題をブログに書く**ことを前提に進める。

---

## Blog System

- **ファイルの場所**: `{PORTFOLIO_ROOT}/src/content/blog/{slug}/en.mdx` と `ja.mdx`
- **slug ルール**: ケバブケース、英小文字・数字・ハイフン（`-`）のみ（例: `debugging-swift-concurrency`）
- **frontmatter**:
  ```yaml
  ---
  title: "..."
  date: "YYYY-MM-DD"
  description: "..."
  tags: ["...", "..."]
  published: false
  ---
  ```
- **フォーマット**: MDX（コードブロック、見出し、太字、リンク使用可）
- `published: false` は変更しない。公開はユーザーが判断する。

---

## Step 1: 情報を集める

以下をユーザーに確認する（まとめて質問してよい）:

1. **トピック**: 何について書くか（別リポジトリから呼んだ場合はそのリポジトリでの出来事が出発点になる）
2. **実体験**: 具体的にどんなことをやったか。何でハマったか。どう解決したか
3. **ターゲット読者**: 同じ技術を使う開発者？ 初学者？
4. **含めたいコード例**: あれば教えてもらう（別リポジトリのコードを参照してよい）
5. **slug の候補**: なければ提案する

---

## Step 2: 構成を提案する

記事の見出し構成（H2 レベル）を提示し、ユーザーの確認を取る。承認されたら執筆に進む。

---

## Step 3: 執筆ガイドライン

### 人間らしい文章を書くための原則

**書き方の基本**
- 一人称で書く（英: "I", 日: 「〜した」「〜だった」）
- 一般論ではなく自分の経験を語る
- 迷い、失敗、試行錯誤を書く。うまくいった話だけでは読者に響かない
- 選択の理由を書く。「〇〇を使った」ではなく「〇〇と△△で迷って、〇〇にした理由は〜だった」
- 具体的な数字、バージョン、プロジェクト名、エラーメッセージを使う

**文体**
- 短い文と長い文を混ぜる。リズムが生まれる
- 文章の冒頭は毎回同じ形にしない
- 英語: 口語的な短縮形を使ってよい（"I'd", "it's", "that's"）
- 日本語: 「〜です」「〜ます」だけに揃えず、「〜した」「〜だった」も混ぜて自然なリズムを出す

**締め方**
- 「In conclusion」「まとめると」で始めない
- 次にやりたいことや、まだ解決していない問いで終わるのが自然
- 短くてよい。最後の段落は 2〜3 文で十分

**避けること** (Step 0-2 で読んだ `avoid-phrases.md` を参照)

---

## Step 4: ファイルを作成する

### 英語版

```
{PORTFOLIO_ROOT}/src/content/blog/{slug}/en.mdx
```

自然な英語で書く。日本語版の直訳にしない。英語として自然な表現を選ぶ。

### 日本語版

```
{PORTFOLIO_ROOT}/src/content/blog/{slug}/ja.mdx
```

英語版の構造・見出しに揃える。ただし英語の直訳ではなく、日本語として自然な表現を使う。
コードブロックのコメントは日本語にする。

---

## 完了後

ユーザーに以下を伝える:
- 作成したファイルパス（en/ja 両方）
- 記事を公開する場合は `published: false` → `true` に変更するよう案内する
- 別リポジトリから実行した場合: portfolio でコミット・プッシュが必要なことを伝える
