<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PhFileCode, PhTerminalWindow, PhTerminal, PhPlay } from '@phosphor-icons/vue';

const activeTab = ref<'ts' | 'json' | 'sh'>('ts');

// Terminal states
const terminalLogs = ref<string[]>([
  'mahmuddevs@portfolio:~$ _ (click a script below to run)'
]);
const isRunning = ref(false);

const runCommand = async (cmd: 'dev' | 'status' | 'bio') => {
  if (isRunning.value) return;
  isRunning.value = true;

  if (cmd === 'dev') {
    terminalLogs.value = [
      'mahmuddevs@portfolio:~$ npm run dev',
      ' ',
      '  > portfolio-refresh-vue@1.0.0 dev',
      '  > vite',
      ' ',
      '  VITE v6.0.8  ready in 380 ms',
      ' ',
      '  ➜  Local:   http://localhost:5173/',
      '  ➜  Network: use --host to expose',
      '  ➜  press h + enter to show help'
    ];
  } else if (cmd === 'status') {
    terminalLogs.value = [
      'mahmuddevs@portfolio:~$ git status',
      ' ',
      '  On branch main',
      '  Your branch is up to date with \'origin/main\'.',
      ' ',
      '  Changes not staged for commit:',
      '    (use "git add <file>..." to update what will be committed)',
      '    modified:   src/components/home/Hero.vue',
      ' ',
      '  no changes added to commit (use "git add" and/or "git commit -a")'
    ];
  } else if (cmd === 'bio') {
    terminalLogs.value = [
      'mahmuddevs@portfolio:~$ cat bio.txt',
      ' ',
      '  Mahmud Rashid — Frontend Developer',
      '  ----------------------------------',
      '  • CSE Student & Web craftsman',
      '  • Obsessed with elegant UX & pixel-perfect implementation',
      '  • Passionate about Next.js, React, Vue, & Node.js development'
    ];
  }

  isRunning.value = false;
};
</script>

<template>
  <div class="relative w-full max-w-lg lg:max-w-xl mx-auto group">
    <!-- Pulsating Gradient Orbs -->
    <div
      class="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-[80px] animate-pulse pointer-events-none duration-4000">
    </div>
    <div
      class="absolute -bottom-10 -right-10 w-72 h-72 bg-accent/25 rounded-full blur-[80px] animate-pulse pointer-events-none duration-4000 delay-1000">
    </div>

    <!-- Main Glassmorphic Container -->
    <div
      class="relative overflow-hidden w-full bg-secondary/50 dark:bg-secondary/40 backdrop-blur-xl border border-border/10 dark:border-white/5 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-primary/5 dark:hover:shadow-primary/10">

      <!-- Window Title Bar -->
      <div
        class="flex items-center justify-between px-4 py-3 bg-secondary/80 dark:bg-secondary/60 border-b border-border/10 dark:border-white/5">
        <!-- Control Dots -->
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
          <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
        </div>
        <!-- Filename / Mode -->
        <span class="text-xs font-mono text-foreground/45 dark:text-foreground/40 select-none">
          editor // {{ activeTab === 'ts' ? 'mahmud.ts' : activeTab === 'json' ? 'skills.json' : 'terminal.sh' }}
        </span>
        <!-- Window Indicator -->
        <span class="w-3 h-3"></span>
      </div>

      <!-- Tab File Explorer bar -->
      <div
        class="flex overflow-x-auto bg-secondary/30 dark:bg-secondary/20 border-b border-border/10 dark:border-white/5 text-xs font-mono">
        <!-- Tab 1: mahmud.ts -->
        <button @click="activeTab = 'ts'"
          :class="activeTab === 'ts' ? 'bg-secondary/85 dark:bg-secondary/60 text-primary border-r border-border/10 dark:border-white/5 font-semibold' : 'text-foreground/50 hover:text-foreground hover:bg-secondary/10'"
          class="flex items-center gap-2 px-4 py-2.5 transition-all cursor-pointer shrink-0 whitespace-nowrap">
          <PhFileCode :size="14" class="text-sky-400" />
          <span>mahmud.ts</span>
        </button>

        <!-- Tab 2: skills.json -->
        <button @click="activeTab = 'json'"
          :class="activeTab === 'json' ? 'bg-secondary/85 dark:bg-secondary/60 text-primary border-x border-border/10 dark:border-white/5 font-semibold' : 'text-foreground/50 hover:text-foreground hover:bg-secondary/10'"
          class="flex items-center gap-2 px-4 py-2.5 transition-all cursor-pointer shrink-0 whitespace-nowrap">
          <PhFileCode :size="14" class="text-yellow-400" />
          <span>skills.json</span>
        </button>

        <!-- Tab 3: terminal.sh -->
        <button @click="activeTab = 'sh'"
          :class="activeTab === 'sh' ? 'bg-secondary/85 dark:bg-secondary/60 text-primary border-l border-border/10 dark:border-white/5 font-semibold' : 'text-foreground/50 hover:text-foreground hover:bg-secondary/10'"
          class="flex items-center gap-2 px-4 py-2.5 transition-all cursor-pointer shrink-0 whitespace-nowrap">
          <PhTerminalWindow :size="14" class="text-emerald-400" />
          <span>terminal.sh</span>
        </button>
      </div>

      <!-- Code Window / Output Pane -->
      <div
        class="p-6 h-90 overflow-y-auto font-mono text-[11px] sm:text-xs leading-relaxed text-foreground/85 select-text">

        <!-- Tab 1 Code: mahmud.ts -->
        <div v-if="activeTab === 'ts'" class="space-y-1">
          <div><span class="text-purple-400 dark:text-purple-300">const</span> <span
              class="text-blue-400 dark:text-blue-300">developer</span> = {</div>
          <div class="pl-4"><span class="text-foreground/60">name:</span> <span
              class="text-emerald-400 dark:text-emerald-300">"Mahmud Rashid"</span>,</div>
          <div class="pl-4"><span class="text-foreground/60">role:</span> <span
              class="text-emerald-400 dark:text-emerald-300">"Frontend Developer"</span>,</div>
          <div class="pl-4">
            <span class="text-foreground/60">passion:</span>
            <span class="text-emerald-400 dark:text-emerald-300">
              "Crafting modern & pixel-perfect experiences"
            </span>,
          </div>
          <div class="pl-4">
            <span class="text-foreground/60">techStack:</span> [
          </div>
          <div class="pl-8">
            <span class="text-emerald-400 dark:text-emerald-300">"Vue.js"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"React"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"Next.js"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"Tailwind CSS"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"Express"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"MongoDB"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"PostgreSQL"</span>
          </div>
          <div class="pl-4">],</div>
          <div class="pl-4"><span class="text-foreground/60">coffeeToCode:</span> (<span
              class="text-orange-400 dark:text-orange-300">coffee</span>) =&gt; {</div>
          <div class="pl-8"><span class="text-purple-400 dark:text-purple-300">return</span> <span
              class="text-emerald-400 dark:text-emerald-300">"☕ ➔ 💻"</span>;</div>
          <div class="pl-4">}</div>
          <div>};</div>
        </div>

        <!-- Tab 2 Code: skills.json -->
        <div v-if="activeTab === 'json'" class="space-y-1 text-yellow-500/90 dark:text-yellow-400/90">
          <div>{</div>
          <div class="pl-4"><span class="text-blue-400 dark:text-blue-300">"frontend"</span>: [</div>
          <div class="pl-8"><span class="text-emerald-400 dark:text-emerald-300">"Vue.js"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"React"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"Next.js"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"Tailwind"</span></div>
          <div class="pl-4">],</div>
          <div class="pl-4"><span class="text-blue-400 dark:text-blue-300">"backend"</span>: [</div>
          <div class="pl-8">
            <span class="text-emerald-400 dark:text-emerald-300">
              "Node.js"
            </span>,
            <span class="text-emerald-400 dark:text-emerald-300">"Express"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"MongoDB"</span>,
            <span class="text-emerald-400 dark:text-emerald-300">"PostgreSQL"</span>
          </div>
          <div class="pl-4">],</div>
          <div class="pl-4"><span class="text-blue-400 dark:text-blue-300">"additional"</span>: {</div>
          <div class="pl-8"><span class="text-blue-400 dark:text-blue-300">"languages"</span>: [<span
              class="text-emerald-400 dark:text-emerald-300">"TypeScript"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"JavaScript"</span>],</div>
          <div class="pl-8"><span class="text-blue-400 dark:text-blue-300">"tools"</span>: [<span
              class="text-emerald-400 dark:text-emerald-300">"Git"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"Vite"</span>, <span
              class="text-emerald-400 dark:text-emerald-300">"Docker"</span>]</div>
          <div class="pl-4">}</div>
          <div>}</div>
        </div>

        <!-- Tab 3 Code: terminal.sh -->
        <div v-if="activeTab === 'sh'" class="flex flex-col h-full justify-between">
          <!-- Terminal Shell Output Log -->
          <div class="space-y-1.5 overflow-y-auto flex-1 pr-2">
            <div v-for="(log, idx) in terminalLogs" :key="idx"
              class="text-foreground/90 dark:text-foreground/80 font-mono">
              {{ log }}
            </div>
          </div>

          <!-- Command Interactive Buttons -->
          <div class="mt-4 pt-3 border-t border-border/10 dark:border-white/5 flex flex-wrap items-center gap-2">
            <span class="text-[10px] text-foreground/40 font-mono mr-1">scripts:</span>

            <button @click="runCommand('dev')"
              class="flex items-center gap-1 px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary hover:bg-primary/20 transition-all cursor-pointer">
              <PhPlay :size="10" />
              <span>npm run dev</span>
            </button>

            <button @click="runCommand('status')"
              class="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary/50 border border-border/20 text-[10px] font-semibold hover:bg-secondary transition-all cursor-pointer">
              <PhPlay :size="10" />
              <span>git status</span>
            </button>

            <button @click="runCommand('bio')"
              class="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary/50 border border-border/20 text-[10px] font-semibold hover:bg-secondary transition-all cursor-pointer">
              <PhPlay :size="10" />
              <span>cat bio.txt</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar adjustments */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}
</style>
