<template>
  <div>
    
    <div id="gallery" class="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>
  </div>
</template>

<script>

export default {
  mounted() {
    console.log('1. Mounted hook triggered');
    // Load the FlexPhotoGallery plugin after jQuery is loaded
    this.initializeFlexPhotoGallery();
  },
  methods: {
    initializeFlexPhotoGallery() {
      console.log('2. initializeFlexPhotoGallery method called');
      
      (function($) {
        $.fn.flexPhotoGallery = function(options) {
          console.log('3. flexPhotoGallery plugin initialized');

          var settings = $.extend({
            imageArray: [],
            isViewImageOnClick: true
          }, options);

          console.log('4. Settings applied');

          return this.each(function() {
            console.log('5. Applying settings to each element');

            $(this).css({ 'overflow': 'auto' });
            $(this).html(getRenderedImageDOM(settings.imageArray));
            $('body').append(getRenderedModalBody());

            if (settings.isViewImageOnClick) {
              console.log('6. Adding event listeners');
              
              $('.gallery-item').addClass('hover-pointer');

              $('.gallery-item').on('click', function() {
                console.log('7. Gallery item clicked');
                renderImageOnModal(this);
              });

              $('.modal-close-button').on('click', function() {
                console.log('8. Close button clicked');
                $('#modal-container').addClass('out');
                $('body').removeClass('modal-active');
                $('.modal-img').attr('src', '');
              });

              $('.modal-prev-button').on('click', function() {
                console.log('9. Previous button clicked');
                renderImageOnModal($('.active-image-on-modal').parent().prev().children('.gallery-item'));
              });

              $('.modal-next-button').on('click', function() {
                console.log('10. Next button clicked');
                renderImageOnModal($('.active-image-on-modal').parent().next().children('.gallery-item'));
              });
            }
          });

          function renderImageOnModal(element) {
            console.log('11. renderImageOnModal called');

            var index = $('.gallery-item').index(element);
            console.log('12. Image index:', index);

            if (index <= 0) {
              $('.modal-prev-button').hide();
            } else {
              $('.modal-prev-button').show();
            }

            if (index >= $('.gallery-item').length - 1) {
              $('.modal-next-button').hide();
            } else {
              $('.modal-next-button').show();
            }

            $('.active-image-on-modal').removeClass('active-image-on-modal');
            $(element).addClass('active-image-on-modal');
            $('#modal-container').removeClass().addClass('blowup');
            $('body').addClass('modal-active');
            $('.modal-img').attr('src', $(element).attr('src'));
          }

          function getRenderedImageDOM(imageArray) {
            console.log('13. getRenderedImageDOM called');

            var i = 0;
            var renderedHTML = '';
            imageArray.forEach(function(item) {
              console.log('14. Rendering image', item.url);
              renderedHTML += `
                <div class='img-wrapper img-wrapper-ind-${i}' style='width: ${item.width * 240 / item.height}px; flex-grow: ${item.width * 200 / item.height}'>
                  <img class='gallery-item' src='${item.url}' alt='' />
                  <i class='gallery-item-i' style='padding-bottom: ${item.height / item.width * 100}%'></i>
                </div>`;
              i++;
            });
            return getSectionTemplate(renderedHTML);
          }

          function getSectionTemplate(item) {
            console.log('15. getSectionTemplate called');
            return `<section id='images-section'>${item}</section>`;
          }

          function getRenderedModalBody() {
            console.log('16. getRenderedModalBody called');
            return `
              <div id="modal-container">
                <div class="modal-background">
                  <div class="modal-close-button"><span>+</span></div>
                  <div class="modal-prev-button"><span>&#8249;</span></div>
                  <div class="modal-next-button"><span>&#8250;</span></div>
                  <div class="modal">
                    <div class="modal-img-wrapper"><img class="modal-img" /></div>
                    <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                      <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                    </svg>
                  </div>
                </div>
              </div>`;
          }
        };
      }(jQuery));

      console.log('17. Plugin initialization complete');

      // Initialize the plugin with the image array
      const imageArray = [
        { url: "https://th.bing.com/th/id/OIP.fJRUYfDdFzAm3LknrvWPggHaE8?rs=1&pid=ImgDetMain", width: 200, height: 200 },
        { url: "https://source.unsplash.com/323x449/?cat", width: 323, height: 449 },
        { url: "https://source.unsplash.com/1200x635/?dog", width: 1200, height: 635 },
        { url: "https://source.unsplash.com/1600x1200/?bird", width: 1600, height: 1200 },
        { url: "https://source.unsplash.com/183x275/?woman", width: 183, height: 275 },
        { url: "https://source.unsplash.com/620x370/?gym", width: 620, height: 370 },
        { url: "https://source.unsplash.com/183x275/?fitness", width: 183, height: 275 },
        { url: "https://th.bing.com/th/id/OIP.fJRUYfDdFzAm3LknrvWPggHaE8?rs=1&pid=ImgDetMain", width: 960, height: 639 },
        { url: "https://source.unsplash.com/1600x1000/?water", width: 1600, height: 1067 },
        { url: "https://source.unsplash.com/640x426/?girl", width: 640, height: 426 },
        { url: "https://th.bing.com/th/id/OIP.fJRUYfDdFzAm3LknrvWPggHaE8?rs=1&pid=ImgDetMain", width: 1600, height: 1100 }
      ];

      console.log('18. Image array initialized');

      $('#gallery').flexPhotoGallery({
        imageArray: imageArray,
        isViewImageOnClick: true
      });

      console.log('19. flexPhotoGallery called on #gallery');
    }
  }
};




</script>

<style scoped>

#images-section {
  display: flex;
  flex-wrap: wrap;
}
#images-section::after {
  content: '';
  flex-grow: 999999999;
}

div.img-wrapper {
  background-color: transparent;
  position: relative;
  margin: 2px;
}
i.gallery-item-i {
  display: block;
}
img.gallery-item {
  position: absolute;
  top: 0;
  width: 100%;
  vertical-align: bottom;
}

/* Photo Viewer Modal */
#modal-container {
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 1;
}

#modal-container.blowup {
  z-index: 1;
  transform: scale(1);
}
#modal-container.blowup .modal-background {
  background: rgba(0, 0, 0, 0.7);
}
#modal-container.blowup .modal-background .modal {
  animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
#modal-container.blowup + .content {
  z-index: 1;
  animation: blowUpContent 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
#modal-container.blowup.out {
  animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
#modal-container.blowup.out .modal-background {
  animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
#modal-container.blowup.out .modal-background .modal {
  animation: blowUpModalTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}
#modal-container.blowup.out + .content {
  animation: blowUpContentTwo 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

#modal-container .modal-background {
  display: table-cell;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  vertical-align: middle;
}
#modal-container .modal-background .modal {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50px; 
  padding: 5px;
  margin: 5px;
  display: flex;
  vertical-align: middle;
  align-items: center;
  font-weight: 300;
  max-height: 70%;
  max-width: 80%;
  position: absolute;
  top: 15%;
  left: 10%;
  bottom: 15%;
  right: 10%;
  margin: auto;
}

#modal-container .modal-background .modal .modal-img-wrapper {
  display: contents;
}

.modal-close-button {
  color: #fff;
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 11px;
  background: rgba(207, 47, 47, 0.7);
  cursor: pointer;
  z-index: 1;
  border-radius: 25px;
  font-weight: bold;
  transition: 0.2s ease;
  user-select: none;
}

.modal-close-button:hover {
  background: rgb(207, 47, 47);
}
.modal-close-button span {
  display: block;
  transform: rotate(45deg) !important;
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
}
img.modal-img {
  max-width: 100%;
  max-height: 100%;
  border: 5px solid #fff;
  margin: auto;
  background-color: #fff;
}
.hover-pointer {
  cursor: pointer;
}

.modal-prev-button, .modal-next-button {
  cursor: pointer;
  position: absolute;
  width: auto;
  padding: 11px 20px;
  color: #000;
  font-weight: bold;
  font-size: 25px;
  transition: 0.6s ease;
  user-select: none;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  margin-top: -25px;
}
.modal-prev-button:hover, .modal-next-button:hover {
  background-color: #fff;
  color: #000;
}

.modal-prev-button {
  left: 5px;
}
.modal-next-button {
  right: 5px;
}

@media only screen and (max-width: 767px) {
  .modal-prev-button, .modal-next-button {
    bottom: 5px;
    top: auto;
    padding: 0px 10px;
    padding-bottom: 3px;
    font-size: 20px;
  }
  .modal-close-button {
    padding: 0px 6px;
    padding-right: 7px;
    font-size: 20px;
  }
}
</style>
