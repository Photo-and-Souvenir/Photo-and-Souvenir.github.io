const onPageLoad = async () => {
   let [meta, categories] = await Promise.all([
      axios.get('https://photo-and-souvenir.herokuapp.com/meta').then(data => data.data),
      axios.get('https://photo-and-souvenir.herokuapp.com/categories').then(data => data.data)
   ]);

   meta = meta.data;

   document.getElementById('title').innerText = meta.title[0];
   document.getElementById('oneLinerIntro').innerText = meta.oneLinerIntro[0];

   document.getElementById('aboutTitle').innerText = meta.aboutTitle[0];
   document.getElementById('yourName').innerText = meta.yourName[0];
   document.getElementById('aboutText').innerHTML = meta.aboutText[0];

   document.getElementById('galleryTitle').innerText = meta.galleryTitle[0];
   document.getElementById('categories').innerHTML = categories.map(({ category, count, subCatrgory }) => {
      return `
         <a href="photos.html?category=${category}#portfolio" class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
            <div class="icon"><i class='bx bx-photo-album'></i></div>
            <h4 style="color: #fff;">${category}</h4>
            <p>
               ${count} Photos 
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            </div>
         </a>
      `;
   }).join('');

   document.getElementById('contactTitle').innerText = meta.contactTitle[0];
   document.getElementById('address').innerText = meta.address[0];
   document.getElementById('email').innerText = meta.email[0];
   document.getElementById('contactNumber').innerText = meta.contactNumber[0];

   return true
}

onPageLoad()
