---
name: write-blog
description: Write a new technical blog post for this portfolio. Use when asked to write, draft, or create a new blog article. Produces both en.mdx and ja.mdx with a personal, human-like writing style — no AI filler, no corporate buzzwords.
---

# Write Blog Skill

このスキルはポートフォリオのブログに技術記事を書く。英語（en.mdx）と日本語（ja.mdx）の両方を作成する。

## 最初にやること

まず `.claude/skills/write-blog/avoid-phrases.md` を Read して、避けるべき表現のリストを把握する。記事全体を通してそのリストを守る。

---

## Blog System

- **ファイルの場所**: `src/content/blog/{slug}/en.mdx` と `ja.mdx`
- **slug ルール**: ケバブケース、英小文字と数字のみ（例: `debugging-swift-concurrency`）
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

1. **トピック**: 何について書くか
2. **実体験**: 具体的にどんなことをやったか。何でハマったか。どう解決したか
3. **ターゲット読者**: 同じ技術を使う開発者? 初学者?
4. **含めたいコード例**: あれば教えてもらう
5. **slug の候補**: なければ提案する

---

## Step 2: 構成を提案する

記事の見出し構成（H2 レベル）を提示し、ユーザーの確認を取る。承認されたら執筆に進む。

---

## Step 3: 執筆ガイドライン

### 人間らしい文章を書くための原則

**書き方の基本**
- 一人称で書く（英: "I", 日: 「私は」「〜した」「〜だった」）
- 一般論ではなく自分の経験を語る。「SwiftUI は便利だ」ではなく「SwiftUI に乗り換えて、状態管理で最初は混乱した」
- 迷い、失敗、試行錯誤を書く。うまくいった話だけでは読者に響かない
- 選択の理由を書く。「Next.js を選んだ」ではなく「UIKit でも書けたが、SwiftUI の宣言的な書き方が自分の思考に合っていた」
- 具体的な数字、バージョン、プロジェクト名を使う

**文体**
- 短い文と長い文を混ぜる。リズムが生まれる
- 文章の冒頭は毎回同じ形にしない（「〜は」「〜が」を交互に使うなど）
- 英語: 口語的な短縮形を使ってよい（"I'd", "it's", "that's"）
- 日本語: 「〜です」「〜ます」だけに揃えず、「〜した」「〜だった」も混ぜて自然なリズムを出す

**締め方**
- 「In conclusion」「まとめると」で始めない
- 次にやりたいことや、まだ解決していない問いで終わるのが自然
- 短くてよい。最後の段落は 2〜3 文で十分

**避けること** (`avoid-phrases.md` を参照すること)

---

## Step 4: ファイルを作成する

### 英語版 (en.mdx)

```
src/content/blog/{slug}/en.mdx
```

自然な英語で書く。日本語版の直訳にしない。英語として自然な表現を選ぶ。

### 日本語版 (ja.mdx)

```
src/content/blog/{slug}/ja.mdx
```

英語版の構造・見出しに揃える。ただし英語の直訳ではなく、日本語として自然な表現を使う。
コードブロックのコメントは日本語にする。

---

## 完了後

ユーザーに以下を伝える:
- 作成したファイルパス（en/ja 両方）
- 記事を公開する場合は `published: false` → `true` に変更するよう案内する
