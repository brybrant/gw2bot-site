<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <h1>GW2Bot Commands</h1>
        <p><strong>Type <code>/</code> to see a full list of commands</strong></p>
        <p>Use <code>&#11134; Tab</code> to autocomplete commands with options</p>
      </header>

      <div class="flexbox">
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnOne(commands.main)" :key="command.name" :command="command" />
          </ul>
        </div>
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnTwo(commands.main)" :key="command.name" :command="command" />
          </ul>
        </div>
      </div>
      <hr>
      <h2 class="h3">
        Notifiers
      </h2>
      <div class="flexbox">
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnOne(commands.notifiers)" :key="command.name" :command="command" />
          </ul>
        </div>
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnTwo(commands.notifiers)" :key="command.name" :command="command" />
          </ul>
        </div>
      </div>
      <hr>
      <h2 class="h3">
        Meta &amp; Stats
      </h2>
      <div class="flexbox">
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnOne(commands.meta)" :key="command.name" :command="command" />
          </ul>
        </div>
        <div class="flexbox__item commands-column">
          <ul class="commands-list">
            <CommandComponent v-for="command in columnTwo(commands.meta)" :key="command.name" :command="command" />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script scoped>
import CommandComponent from '@/components/command'
import commands from '@/static/commandsData'

export default {
  name: 'CommandsPage',
  components: {
    CommandComponent
  },
  data () {
    return {
      commands
    }
  },
  head () {
    return {
      title: 'Commands | GW2Bot'
    }
  },
  methods: {
    columnOne (commands) {
      return commands.filter(function (command, index) {
        return index < Math.round(commands.length / 2)
      })
    },
    columnTwo (commands) {
      return commands.filter(function (command, index) {
        return index >= Math.round(commands.length / 2)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.commands-column {
  width: 100%;
  @include media-query('gt-800') {
    width: 50%;
  }
}
.commands-list {
  padding: 0;
  list-style: none;
  text-align: center;
}
</style>
