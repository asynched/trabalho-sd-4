import { env as privateEnv } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://github.com',
})

type AccessTokenResponse = {
  access_token: string
  token_type: 'bearer'
}

export async function getAccessToken(code: string) {
  try {
    console.log('Here!')

    const { data } = await client.post<AccessTokenResponse>(
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
    console.error(err)
    return null
  }
}
