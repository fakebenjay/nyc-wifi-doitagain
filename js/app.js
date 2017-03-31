$(() => {
  attachListeners();
  })

function apiCall() {
  Hotspot.localized()
  .then((hotspots) => {
    let $target = $("main")
    let $detailTarget = $("div.test")
    let detailController = new HotspotShowController($detailTarget)
    let listController = new HotspotListController($target, hotspots, detailController)
  })
}

function attachListeners() {
  $("div.test").on('click', 'button.button', (e) => {
    e.preventDefault()
    apiCall()
  })
}
