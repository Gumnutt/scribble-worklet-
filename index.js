registerPaint(
  "svg-in-css",
  class {
    static get inputProperties() {
      return ["--svg-viewbox", "--svg-path", "--svg-fill", "--svg-stroke", "--svg-stroke-width"]
    }
    paint(ctx, geom, props) {
      console.log("running paint")
      let viewbox = String(props.get("--svg-viewbox")).trim() || "0 0 100 100"
      viewbox = viewbox.split(" ").map(Number)
      let path = String(props.get("--svg-path")).trim() || 'path("M0,0")'
      // get only SVG path values :(
      // = everything between quotes
      let search = /['"`]([^'"`]+)/
      path = path.match(search)[1].trim()
      let fill = String(props.get("--svg-fill"))
      let stroke = String(props.get("--svg-stroke"))
      let strokeWidth = String(props.get("--svg-stroke-width"))
      // adapt viewbox to canvas
      ctx.scale(geom.width / viewbox[2], geom.height / viewbox[3])
      ctx.translate(-viewbox[0], -viewbox[1])
      let path2D = new Path2D(path)
      ctx.fillStyle = fill
      ctx.fill(path2D)
      ctx.strokeStyle = stroke
      ctx.lineWidth = strokeWidth
      ctx.stroke(path2D)
    }
  },
)
