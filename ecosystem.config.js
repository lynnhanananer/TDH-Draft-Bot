module.exports = {
  apps : [{
    name   : "draftbotapp",
    script : "./index.js",
    watch : true,
    ignore_watch: ["node_modules", "src/commands"],
  }]
}
