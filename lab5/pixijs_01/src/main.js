const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0xc9c9c9
});
document.body.appendChild(app.view);

// creating a rectangle
const rect = new PIXI.Graphics();
rect.beginFill(0xFF0000);

const rect_width  = 200;
const rect_height = 100;

rect.drawRect(0, 0, rect_width, rect_height);
rect.endFill();
rect.x = (app.screen.width) / 2;
rect.y = (app.screen.height) / 2;
rect.pivot.set(
  rect_width / 2,
  rect_height/ 2
);
app.stage.addChild(rect);

app.ticker.add((delta) => {
  rect.rotation += 0.01 * delta;
});