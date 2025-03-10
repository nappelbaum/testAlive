<script setup lang="ts">
import { ref } from 'vue'
import { useDropZone, useEventListener } from '@vueuse/core'

const filesData = ref([])
const imageFilesData = ref([])

function onDrop(files) {
  filesData.value = []
  if (files) {
    filesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }))
  }
}

function onImageDrop(files) {
  imageFilesData.value = []
  if (files) {
    imageFilesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }))
  }
}

const dropZoneRef = ref()
const imageDropZoneRef = ref()
const pngRef = ref()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

useEventListener(pngRef, 'dragstart', (event) => {
  event.dataTransfer?.setData('image/png', '/vue.png')
})

const { isOverDropZone: isOverImageDropZone } = useDropZone(imageDropZoneRef, {
  dataTypes: ['image/png'],
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
          <img src="/favicon.svg" alt="Drag me" width="40px" />
          <span>SVG</span>
        </div>
      </div>

      <div class="d-flex gap-3 flex-wrap">
        <div
          ref="dropZoneRef"
          class="drop-zone p-4 d-flex flex-column border border-secondary rounded justify-content-center align-items-center mt-5"
        >
          <div font-bold mb2>General DropZone</div>
          <div>
            <label class="d-block"> isOverDropZone:</label>
            <input :value="isOverDropZone" />
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div
              v-for="(file, index) in filesData"
              :key="index"
              class="w-200px bg-black-200/10 ma-2 pa-6"
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
        >
          <div font-bold mb2>Image DropZone</div>
          <div>
            <label class="d-block"> isOverDropZone:</label>
            <input :value="isOverImageDropZone" />
          </div>
          <div class="flex flex-wrap justify-center items-center">
            <div
              v-for="(file, index) in imageFilesData"
              :key="index"
              class="w-200px bg-black-200/10 ma-2 pa-6"
            >
              <p>Name: {{ file.name }}</p>
              <p>Size: {{ file.size }}</p>
              <p>Type: {{ file.type }}</p>
              <p>Last modified: {{ file.lastModified }}</p>
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
}
</style>
