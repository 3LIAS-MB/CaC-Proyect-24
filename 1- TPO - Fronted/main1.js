document.addEventListener('DOMContentLoaded', () => {
  const elementosCarousel = document.querySelectorAll('.carousel')
    .Carousel.init(elementosCarousel, {
      duration: 20,
      dist: -80,
      shift: 5,
      padding: 5,
      numVisible: 4,
      indicators: true,
      noWrap: false
    })
})
