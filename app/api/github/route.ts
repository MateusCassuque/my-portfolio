import { NextResponse } from 'next/server'

export async function GET() {
  const username = 'MateusCassuque' // Substitua pelo seu username
  const token = process.env.GITHUB_TOKEN // Opcional, para mais requisições

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      headers: token ? {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      } : {}
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos')
    }

    const repos = await response.json()

    // Filtre e formate os dados conforme necessário
    const filteredRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at
    }))

    return NextResponse.json(filteredRepos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}