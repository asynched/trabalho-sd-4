<script lang="ts">
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'

  let seconds = 3

  onMount(() => {
    const interval = setInterval(() => {
      seconds--
      if (seconds === 0) {
        clearInterval(interval)
        goto('/home')
      }
    }, 1000)
  })
</script>

<h1>
  You'll be redirected to the home page in {seconds} seconds.
</h1>
