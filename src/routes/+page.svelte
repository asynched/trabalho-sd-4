<script>
  import { env } from '$env/dynamic/public'
</script>

<svelte:head>
  <title>Login | Trabalho SD</title>
</svelte:head>

<div class="w-full h-screen grid place-items-center">
  <div class="flex flex-col items-center">
    <h1 class="mb-2 text-4xl font-bold tracking-tighter">Bem-vindo!</h1>
    <p class="mb-8">Realize o seu login com o GitHub</p>
    <a
      class="py-2 px-8 rounded border flex justify-center items-center gap-1 transition ease-in-out hover:shadow-md"
      href={`https://github.com/login/oauth/authorize?client_id=${env.PUBLIC_GITHUB_OAUTH_CLIENT_ID}`}
    >
      <span> Login </span>
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        height="24"
        width="24"
        alt="GitHub logo"
      />
    </a>
  </div>
</div>
