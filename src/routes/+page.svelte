<script>
  import { env } from '$env/dynamic/public'
</script>

<h1>Welcome!</h1>
<p>Sign up with Github</p>
<a
  href={`https://github.com/login/oauth/authorize?client_id=${env.PUBLIC_GITHUB_OAUTH_CLIENT_ID}`}
  >Sign up</a
>
