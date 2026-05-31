import { Octokit } from '@octokit/rest'

function client() {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN not configured')
  return new Octokit({ auth: token })
}

function repoCoords() {
  const [owner, repo] = (process.env.PORTFOLIO_REPO ?? 'taka-2120/portfolio').split('/')
  return { owner, repo }
}

async function getCurrentContent(
  octokit: Octokit,
  owner: string,
  repo: string,
  filePath: string
): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: filePath, ref: 'main' })
    if ('content' in data && typeof data.content === 'string') {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }
    return null
  } catch {
    return null
  }
}

export async function syncToPortfolio(
  vaultFiles: { path: string; content: string }[]
): Promise<{ prUrl: string | null; synced: number }> {
  const octokit = client()
  const { owner, repo } = repoCoords()

  // Only sync files that have changed
  const changedFiles: { path: string; content: string }[] = []
  for (const file of vaultFiles) {
    const current = await getCurrentContent(octokit, owner, repo, file.path)
    if (current?.trimEnd() !== file.content.trimEnd()) {
      changedFiles.push(file)
    }
  }

  if (changedFiles.length === 0) {
    return { prUrl: null, synced: 0 }
  }

  const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' })
  const baseSha = ref.object.sha

  const branchName = `blog/sync-${Date.now()}`
  await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branchName}`, sha: baseSha })

  const { data: baseCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: baseSha })

  const treeItems = await Promise.all(
    changedFiles.map(async ({ path: filePath, content }) => {
      const { data: blob } = await octokit.git.createBlob({
        owner, repo,
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
      })
      return { path: filePath, mode: '100644' as const, type: 'blob' as const, sha: blob.sha }
    })
  )

  const { data: newTree } = await octokit.git.createTree({
    owner, repo,
    base_tree: baseCommit.tree.sha,
    tree: treeItems,
  })

  const { data: newCommit } = await octokit.git.createCommit({
    owner, repo,
    message: 'blog: sync from Obsidian',
    tree: newTree.sha,
    parents: [baseSha],
  })

  await octokit.git.updateRef({ owner, repo, ref: `heads/${branchName}`, sha: newCommit.sha })

  const { data: pr } = await octokit.pulls.create({
    owner, repo,
    title: 'blog: sync from Obsidian',
    head: branchName,
    base: 'main',
    draft: true,
    body: `Automated sync from Obsidian vault.\n\nChanged files:\n${changedFiles.map(f => `- \`${f.path}\``).join('\n')}`,
  })

  return { prUrl: pr.html_url, synced: changedFiles.length }
}
