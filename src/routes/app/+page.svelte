<script lang="ts">
  import { Role } from '@/domain/auth'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<h1>Hello, {data.user.name}!</h1>
<p>What is up?</p>

<img
  src={data.user.avatar}
  alt={data.user.username}
  height="32"
  width="32"
  style="border-radius: 999px;"
/>

<br /><br />
<button>Sign out</button>

{#if data.user.role === Role.STUDENT}
  <div>
    <h1>Grade</h1>
    <form method="POST">
      <input
        type="number"
        min="0"
        max="4"
        value={data.user.grade}
        name="grade"
      />
      <button>Save grade</button>
    </form>
  </div>
{/if}

{#if data.user.role === Role.TEACHER}
  <div>
    <h1>Grades</h1>
    <p>See all grades listed below</p>
    <ul>
      {#each data.grades || [] as grade}
        <li>
          <p>Student: {grade.name}</p>
          <p>Grade: <input value={grade.grade} disabled /></p>
        </li>
      {/each}
    </ul>
  </div>
{/if}
