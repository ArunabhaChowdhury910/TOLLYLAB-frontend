<template>
  <div id="gallery-container"></div>

  <!-- Modal structure -->
  <div id="modal-container" class="out">
    <div class="modal-background">
      <div class="modal-close-button">
        <span>+</span>
      </div>
      <div class="modal-prev-button">
        <span>&#8249;</span>
      </div>
      <div class="modal-next-button">
        <span>&#8250;</span>
      </div>
      <div class="modal">
        <div class="modal-img-wrapper">
          <img class="modal-img" />
        </div>
        <svg
          class="modal-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            fill="none"
            width="226"
            height="162"
            rx="3"
            ry="3"
          ></rect>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'FlexPhotoGallery',
  setup() {
    const images = ref<Array<{ url: string; width: number; height: number }>>([]);
    const currentModalImageElement = ref<HTMLElement | null>(null);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/gallery/images/');
        images.value = response.data;
        renderGallery(images.value);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    });

    function renderGallery(imageArray: Array<{ url: string; width: number; height: number }>) {
      const galleryContainer = document.getElementById('gallery-container');
      if (galleryContainer) {
        galleryContainer.innerHTML = getRenderedImageDOM(imageArray);
      }
      document.body.insertAdjacentHTML('beforeend', getRenderedModalBody());

      document.querySelectorAll('.gallery-item').forEach((item) => {
        item.classList.add('hover-pointer');
        item.addEventListener('click', () => renderImageOnModal(item as HTMLElement));
      });

      document.querySelector('.modal-close-button')?.addEventListener('click', () => {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
          modalContainer.classList.add('out');
          document.body.classList.remove('modal-active');
          const modalImg = document.querySelector('.modal-img') as HTMLImageElement;
          if (modalImg) modalImg.removeAttribute('src');
        }
      });

      document.querySelector('.modal-prev-button')?.addEventListener('click', () => {
        const activeElement = document.querySelector('.active-image-on-modal');
        if (activeElement?.parentElement?.previousElementSibling) {
          renderImageOnModal(activeElement.parentElement.previousElementSibling.querySelector('.gallery-item') as HTMLElement);
        }
      });

      document.querySelector('.modal-next-button')?.addEventListener('click', () => {
        const activeElement = document.querySelector('.active-image-on-modal');
        if (activeElement?.parentElement?.nextElementSibling) {
          renderImageOnModal(activeElement.parentElement.nextElementSibling.querySelector('.gallery-item') as HTMLElement);
        }
      });
    }

    function renderImageOnModal(element: HTMLElement) {
      const galleryItems = document.querySelectorAll('.gallery-item');
      const index = Array.from(galleryItems).indexOf(element);

      const prevButton = document.querySelector('.modal-prev-button');
      const nextButton = document.querySelector('.modal-next-button');

      if (prevButton) {
        if (index <= 0) prevButton.setAttribute('style', 'display: none;');
        else prevButton.setAttribute('style', 'display: block;');
      }

      if (nextButton) {
        if (index >= galleryItems.length - 1) nextButton.setAttribute('style', 'display: none;');
        else nextButton.setAttribute('style', 'display: block;');
      }

      const activeImageOnModal = document.querySelector('.active-image-on-modal');
      if (activeImageOnModal) activeImageOnModal.classList.remove('active-image-on-modal');
      element.classList.add('active-image-on-modal');

      const modalContainer = document.getElementById('modal-container');
      if (modalContainer) {
        modalContainer.classList.remove('out');
        modalContainer.classList.add('blowup');
      }

      document.body.classList.add('modal-active');

      const modalImg = document.querySelector('.modal-img') as HTMLImageElement;
      if (modalImg) {
        modalImg.removeAttribute('src');
        modalImg.setAttribute('src', element.getAttribute('src') || '');
      }

      currentModalImageElement.value = element;
    }

    function getRenderedImageDOM(imageArray: Array<{ url: string; width: number; height: number }>) {
      let i = 0;
      let renderedHTML = '';
      let renderedColumnGrid = '';

      imageArray.forEach((item) => {
        renderedHTML = `
          <div class='img-wrapper img-wrapper-ind-${i}' style='width: ${item.width * 200 / item.height}px; flex-grow: ${item.width * 200 / item.height}'>
            <img class='gallery-item' src='${item.url}' alt=' '/>
            <i class='gallery-item-i' style='padding-bottom: ${item.height / item.width * 100}%'></i>
          </div>`;
        renderedColumnGrid = renderedColumnGrid.concat('', renderedHTML);
        i++;
      });

      return getSectionTemplate(renderedColumnGrid);
    }

    function getSectionTemplate(item: string) {
      return `<section id='images-section'>${item}</section>`;
    }

    function getRenderedModalBody() {
      return `
        <div id="modal-container">
          <div class="modal-background">
            <div class="modal-close-button">
              <span>+</span>
            </div>
            <div class="modal-prev-button"><span>&#8249;</span></div>
            <div class="modal-next-button"><span>&#8250;</span></div>
            <div class="modal">
              <div class="modal-img-wrapper"><img class="modal-img"/></div>
              <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>`;
    }

    return {
      renderImageOnModal,
      getRenderedImageDOM,
      getSectionTemplate,
      getRenderedModalBody,
      currentModalImageElement,
    };
  },
});
</script>

<style scoped>
#gallery-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.img-wrapper {
  position: relative;
  overflow: hidden;
}

.gallery-item {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.modal-container.blowup .modal-background {
  opacity: 1;
}

.modal-close-button,
.modal-prev-button,
.modal-next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  cursor: pointer;
  z-index: 1001;
}

.modal-close-button {
  right: 10px;
}

.modal-prev-button {
  left: 10px;
}

.modal-next-button {
  right: 10px;
}

.modal-img-wrapper {
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.modal-img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
