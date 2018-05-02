AFRAME.registerComponent("render-enabled", {
  schema: { type: "boolean", default: true },
  init() {
    const _this = this;
    this.renderEnabled = this.data;

    this.el.render = function render() {
      if (!this.clock) {
        return;
      }

      const delta = this.clock.getDelta() * 1000;
      const renderer = this.renderer;
      this.time = this.clock.elapsedTime * 1000;

      if (!_this.renderEnabled) {
        renderer.animate(null);
        return;
      }

      if (this.isPlaying) {
        this.tick(this.time, delta);
      }

      renderer.animate(this.render);
      renderer.render(this.object3D, this.camera, this.renderTarget);

      if (this.isPlaying) {
        this.tock(this.time, delta);
      }
    }.bind(this.el);
  },
  update() {
    this.renderEnabled = this.data;

    if (this.renderEnabled) {
      this.el.render();
    }
  },
  remove() {
    this.el.renderer.dispose();
  }
});
