const onPageLoad = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  let [meta, photos] = await Promise.all([
    axios.get('https://photo-and-souvenir.herokuapp.com/meta').then(data => data.data),
    axios.get(`https://photo-and-souvenir.herokuapp.com/photos?categoryName=${params.category}`).then(data => data.data)
  ]);
  meta = meta.data;
  photos = photos.data;

  document.getElementById('title').innerText = meta.title[0];
  document.getElementById('oneLinerIntro').innerText = meta.oneLinerIntro[0];
  document.getElementById('portfolioTitle').innerText = meta.portfolioTitle[0];

  let subCategories = photos.map(photo => photo.subCategory).filter(subCategory => subCategory);
  subCategories = [...new Set(subCategories)].sort();
  console.log(subCategories)
  console.log(photos)

  document.getElementById('portfolio-flters').innerHTML = [
    // '<li data-filter="*" class="filter-active">All</li>',
    ...subCategories.map(sc => {
      return `
        <li data-filter=".filter-${sc.replace(/ /g, '').replace(/[^\w\s]/gi, '')}">${sc}</li>
      `;
    })].join('');

  document.getElementById('portfolio-container').innerHTML = photos.map(photo => {
    const { subCategory, url, filename } = photo;
    return `
      <div class="col-lg-4 col-md-6 portfolio-item filter-${subCategory.replace(/ /g, '').replace(/[^\w\s]/gi, '')}">
        <div class="portfolio-wrap">
          <img src="${url}" class="img-fluid" alt="">
          <div class="portfolio-info">
            <h4>${filename}</h4>
            <p>${subCategory}</p>
            <div class="portfolio-links">
              <a href="${url}" data-gallery="portfolioGallery"
                class="portfolio-lightbox" title="${filename}"><i class="bx bx-plus"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    console.log(portfolioContainer)
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        console.log('CLICKED')
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  return true
}

onPageLoad()
