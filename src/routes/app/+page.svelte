<script lang="ts">
  import { Role } from '@/domain/auth'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="py-8 flex flex-col max-w-screen-sm mx-auto">
  <h1 class="text-4xl font-bold tracking-tighter">Olá, {data.user.name}!</h1>
  <p class="mb-8">Bem vindo</p>

  <div class="mb-8 flex justify-between items-start">
    <div class="flex gap-2 items-start">
      <img
        src={data.user.avatar}
        alt={data.user.username}
        height="48"
        width="48"
        class="rounded-full"
      />
      <div>
        <p>{data.user.name}</p>
        <p class="text-zinc-800">@{data.user.username}</p>
      </div>
    </div>
    <form method="POST" action="?/signOut">
      <button
        class="flex gap-1 py-2 px-8 border border-red-600 text-red-600 rounded transition ease-in-out hover:bg-red-600 hover:text-white"
      >
        <span>Sair</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </form>
  </div>

  {#if data.user.role === Role.STUDENT}
    <div>
      <h1 class="mb-2 text-3xl font-bold tracking-tighter">Altere sua nota</h1>
      <form class="flex flex-col gap-4" method="POST" action="?/update">
        <div class="flex flex-col gap-2 w-full">
          <label for="grade"> Nota </label>
          <input
            type="number"
            min="0"
            max="4"
            value={data.user.grade}
            id="grade"
            name="grade"
            class="py-2 px-4 border bg-transparent rounded appearance-none outline-none w-full transition ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          class="py-2 px-4 border rounded transition ease-in-out hover:text-white hover:bg-blue-600"
          >Salvar</button
        >
      </form>
    </div>
  {/if}

  {#if data.user.role === Role.TEACHER}
    <div>
      <h1 class="text-4xl font-bold tracking-tighter">Notas</h1>
      <p class="mb-4">Veja as notas listadas abaixo</p>
      <ul>
        {#each data.studentGrades || [] as student (student.userId)}
          <li class="flex gap-2 p-4 border rounded-lg shadow-lg">
            <img
              src={student.avatar}
              alt={student.name}
              width="48"
              height="48"
              class="rounded-full"
            />
            <div>
              <p>{student.name}</p>
              <p>Nota: {student.grade}</p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
