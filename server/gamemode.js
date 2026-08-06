// This file is loaded after the server systems and after server.clear().
// Keep client-side synchronization registrations here, not in a System.
mp.makeProperty("mongoPlayerLevel", {
  isVisibleByOwner: true,
  isVisibleByNeighbors: false,
  updateOwner: "ctx.sp.Game.setPlayerLevel(ctx.value || 1)",
  updateNeighbor: "",
});

mp.makeEventSource("_onMongoPlayerLevel", `
  ctx.sp.on("update", () => {
    const level = ctx.sp.Game.getPlayer().getLevel();
    if (ctx.state.level !== level) {
      ctx.state.level = level;
      ctx.sendEvent(level);
    }
  });
`);
