import { env as privateEnv } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import axios from 'axios'

const githubApiClient = axios.create({
  baseURL: 'https://api.github.com',
})

const githubClient = axios.create({
  baseURL: 'https://github.com',
})

type AccessTokenResponse = {
  access_token: string
  token_type: 'bearer'
}

export type UserResponse = {
  id: number
  name: string
  login: string
  avatar_url?: string
  url: string
  html_url: string
}

async function getAccessToken(code: string) {
  try {
    const { data } = await githubClient.post<AccessTokenResponse>(
      '/login/oauth/access_token',
      {},
      {
        headers: {
          Accept: 'application/json',
        },
        params: {
          client_id: publicEnv.PUBLIC_GITHUB_OAUTH_CLIENT_ID,
          client_secret: privateEnv.GITHUB_OAUTH_CLIENT_SECRET,
          code: code,
        },
      },
    )

    return data.access_token
  } catch (err) {
    return null
  }
}

export async function getUserProfileFromCode(code: string) {
  try {
    const token = await getAccessToken(code)

    if (!token) {
      return null
    }

    const { data } = await githubApiClient.get<UserResponse>('/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    })

    return data
  } catch (err) {
    return null
  }
}
