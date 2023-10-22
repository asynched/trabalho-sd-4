<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  let seconds = 3

  onMount(() => {
    const interval = setInterval(() => {
      seconds--

      if (seconds === 0) {
        clearInterval(interval)
        goto('/app')
      }
    }, 1000)
  })
</script>

<div class="grid place-items-center w-full h-screen">
  <div class="text-center">
    <h1 class="mb-2 text-4xl font-bold tracking-tighter">Sucesso</h1>
    <p>Você será redirecionado para a<br />aplicação em {seconds} segundos.</p>
  </div>
</div>
