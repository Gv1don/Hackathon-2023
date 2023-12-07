<template>
  <ol-map
    ref="mapRef"
    @click="handleMapClick"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :controls="[]"
    renderer="webgl"
  >
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
    <ol-vector-layer>
      <ol-source-vector :url="url" :format="geoJson">
        <ol-style>
          <ol-style-icon :src="pointMarker" :scale="0.4"></ol-style-icon>
        </ol-style>
      </ol-source-vector>
      <ol-interaction-select @select="featureSelected">
        <ol-style>
          <ol-style-stroke color="green" :width="10"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-icon :src="markerIcon" :scale="0.02"></ol-style-icon>
        </ol-style>
      </ol-interaction-select>
    </ol-vector-layer>
    <ol-geolocation @change:position="geoLocChange">
      <template>
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="position"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="hereIcon" :scale="0.03"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
    <ol-mouseposition-control />
  </ol-map>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import markerIcon from "@/assets/marker.png";
import pointMarker from "@/assets/pointMarker.png";
import hereIcon from "@/assets/hereIcon.png";
import { Map, View } from "ol";
import { useItemStore } from "@/stores/itemStore";
import type { ObjectEvent } from "ol/Object";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";
import { toLonLat } from "ol/proj";
import { useCreateItemStore } from "@/stores/createItemStore";
const mapRef = ref<{ map: Map }>();

const createItemStore = useCreateItemStore();
const position = ref([]);
const itemStore = useItemStore();
const emit = defineEmits();
const format = inject("ol-format");
const geoJson = new format.GeoJSON();
const url = ref(`${new URL(document.URL).origin}/api/v1/public/points`);
const center = ref([40, 40]);
const zoom = ref(5);
const view = ref<View>();
const map = ref(null);

onMounted(() => {
  map.value = mapRef.value?.map;
  // call your method on `map`
});

const rotation = ref(0);
const isFirstLoad = ref(true);

const featureSelected = (event) => {
    console.log(event)
  if (event.selected.length !== 0) {
    console.log(event.selected[0].id_);
    itemStore.loadItem(event.selected[0].id_);
  } else {
    itemStore.unloadItem();
  }
};

itemStore.$subscribe(async (x) => {
  if (itemStore.findNear == true) {
    const lol = toLonLat(position.value);

    console.log(lol[0].toString());

    let lat1 = lol[1].toString();
    let lon1 = lol[0].toString();

    let s = await fetch(
      `${new URL(document.URL).origin}/api/v1/public/point-closest?lat=${lat1}&lon=${lon1}&rad=${100000000}`,
    );

    let j = await s.json();

    console.log(j.coordinates);

    let lat2 = j.coordinates[1].toString();
    let lon2 = j.coordinates[0].toString();
    let apiKey = "337511e6-2fcf-46e3-8314-e6d1b26d1be8";

    fetch(
      `https://graphhopper.com/api/1/route?point=${lat1},${lon1}&point=${lat2},${lon2}&points_encoded=false&vehicle=foot&locale=en&key=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const geoJsonData = data.paths[0].points;

        const format = new GeoJSON();
        const feature = format.readFeature(geoJsonData, {
          dataProjection: "EPSG:4326", // Assuming the coordinates are in WGS 84
          featureProjection: "EPSG:3857", // Web Mercator projection
        });

        const routeSource = new VectorSource({
          features: [feature],
        });

        const routeLayer = new VectorLayer({
          source: routeSource,
        });

        console.log(map.value);

        map?.value.addLayer(routeLayer);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });

    itemStore.findNear = false;
  }
});

const geoLocChange = (event: ObjectEvent) => {
  if (isFirstLoad.value == true) {
    let position = event.target.getPosition();
    position.value = position;
    view?.value?.setCenter(position);
    view?.value?.setZoom(15);
    isFirstLoad.value = false;
  }
  position.value = event.target.getPosition();
};

const handleMapClick = (event) => {
  const clickedCoordinates = toLonLat(event.coordinate);
  console.log(clickedCoordinates[0]);
  console.log(clickedCoordinates[1]);
  if (createItemStore.createPoint) {
    createItemStore.createItem(clickedCoordinates[0], clickedCoordinates[1]);
  }
};
</script>

<style>
.ol-mouse-position {
  display: none;
}

.ol-viewport {
  height: 100px;
}
</style>

<style scoped>
#geoButton {
  position: absolute;
}
</style>
