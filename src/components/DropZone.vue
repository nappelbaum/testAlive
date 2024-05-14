<script setup>
import { ref } from 'vue'
import { useDropZone, useEventListener } from '@vueuse/core'
import { useUser } from '../stores/user'

const user = useUser()

const filesData = ref([])
const imageFilesData = ref([])

const dataTypes = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'image/avif',
  'image/webp'
]

function onDrop(files) {
  filesData.value = []
  if (files) {
    for (let file of files) {
      filesData.value.push({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      })
    }
  }
}

function onEnter() {
  console.log('onEnter')
}
function onLeave() {
  console.log('onLeave')
}

function onImageDrop(files) {
  imageFilesData.value = []
  window.URL = window.URL || window.webkitURL

  if (files && files.length <= 20) {
    const formData = new FormData()

    imageFilesData.value = files.map((file) => {
      if (!dataTypes.some((type) => type === file.type)) {
        return {
          alert: `${file.name} - файл с таким расширением не подходит`
        }
      }

      if (file.size > 1.5 * 1024 * 1024) {
        return {
          alert: `${file.name} - этот файл больше 1.5МБ! Проверьте размер файла!`
        }
      }

      formData.append(file.name.split('.')[0], file)

      return {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        src: window.URL.createObjectURL(file)
      }
    })

    formData.entries().forEach((el) => console.log(el))

    user.editUser({ files: formData })
    console.log(user.user)
  } else if (files.length > 20) {
    console.log('БОльше 20')
  }
}

const dropZoneRef = ref()
const imageDropZoneRef = ref()
const pngRef = ref()
const pngRefSvg = ref()

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  onEnter,
  onLeave
})

useEventListener(pngRefSvg, 'dragstart', (event) => {
  event.dataTransfer?.setData('image/svg+xml', '/favicon.svg')
})

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes,
  onDrop: onImageDrop
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="w-full h-auto relative">
      <p>Drop files on to drop zones</p>

      <div class="d-flex gap-4">
        <div class="d-flex flex-column gap-1">
          <img ref="pngRef" src="/vue.png" alt="Drag me" width="40px" />
          <span>PNG</span>
        </div>
        <div class="d-flex flex-column gap-1">
          <img ref="pngRefSvg" src="/favicon.svg" alt="Drag me" width="40px" />
          <span>SVG</span>
        </div>
      </div>

      <div class="d-flex gap-3 flex-wrap">
        <div
          ref="dropZoneRef"
          class="drop-zone p-4 d-flex flex-column border border-secondary rounded justify-content-center align-items-center mt-5"
        >
          <div class="fw-bold mb-2 pe-none">General DropZone</div>
          <div class="pe-none">
            <span class="d-block"> isOverDropZone:</span>
            <div>{{ isOverDropZone }}</div>
          </div>
          <div class="flex flex-wrap justify-center items-center pe-none">
            <div
              v-for="(file, index) in filesData"
              :key="index"
              class="py-2 border-bottom border-1 border-info"
              :style="{ maxWidth: 'clamp(220px, 20vw, 380px)' }"
            >
              <p>Name: {{ file.name }}</p>
              <p>Size: {{ file.size }}</p>
              <p>Type: {{ file.type }}</p>
              <p>Last modified: {{ file.lastModified }}</p>
            </div>
          </div>
        </div>
        <div
          ref="imageDropZoneRef"
          class="drop-zone p-4 d-flex flex-column border border-secondary rounded justify-content-center align-items-center mt-5"
          :class="{ 'drop-zone_hover': isOverImageDropZone }"
        >
          <div class="fw-bold mb-2">Image DropZone</div>
          <div>
            <span class="d-block"> isOverDropZone:</span>
            <div>{{ isOverImageDropZone }}</div>
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div
              v-for="(file, index) in imageFilesData"
              :key="index"
              class="py-2 border-bottom border-1 border-info"
              :style="{ maxWidth: 'clamp(220px, 16vw, 360px)' }"
            >
              <div v-if="file.name">
                <p>Name: {{ file.name }}</p>
                <img :src="file.src" :alt="file.name" class="w-100" />
              </div>
              <div v-else>
                <p class="text-danger fw-bold">{{ file.alert }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.drop-zone {
  min-height: 200px;
  background-color: #9ca3af1a;
  transition: background-color 0.4s;
}
.drop-zone_hover {
  background-color: rgba(2, 8, 19, 0.202);
}
p {
  margin: 0;
}
</style>
