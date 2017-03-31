class HotspotListController {
  constructor($target, hotspots, detailController) {
    this.$target = $target
    this.hotspots = hotspots
    this.detailController = detailController
    this.render()
  }

  render(){
    HotspotView.renderListItems(this.$target.find("ul#hotspots"), this.hotspots)
  }
}
