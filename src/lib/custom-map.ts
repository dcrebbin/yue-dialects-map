import mapboxgl from "mapbox-gl";
import { createRoot, type Root } from "react-dom/client";
import { createElement } from "react";
import { type LocationItem } from "~/app/common/locations";
import { useMapStore } from "~/app/_state/map.store";
import { useUIStore } from "~/app/_state/ui.store";
import { PopupContent } from "~/app/components/map/PopupContent";
import { youtubeIcon } from "./icons/youtubeIcon";
import { douyinIcon } from "./icons/douyinIcon";

const markerRoots = new WeakMap<HTMLDivElement, Root>();
const popupRoots = new WeakMap<mapboxgl.Popup, Root>();
const elementRoots = new WeakMap<HTMLElement, Root>();

function createCustomMarker(
  popup: mapboxgl.Popup,
  data: LocationItem,
  mapInstance?: mapboxgl.Map,
) {
  const markerElement = document.createElement("div");
  markerElement.className =
    "flex flex-col items-center justify-center gap-1 bg-white rounded-md p-2 shadow-md min-w-[70px]";

  const markerRoot = createRoot(markerElement);
  markerRoots.set(markerElement, markerRoot);

  markerRoot.render(
    createElement(
      "div",
      {
        className: "flex flex-col items-center w-full relative",
      },
      createElement("svg", {
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML: {
          __html: data.url.includes("youtube") ? youtubeIcon : douyinIcon,
        },
        className: "w-10 h-10 absolute top-0 left-0 z-[1001]",
      }),
      createElement("img", {
        src: data.image,
        className:
          "w-auto h-20 object-cover cursor-pointer z-[1000] rounded-md border-2 border-white shadow hover:scale-110 transition-transform duration-150",
        onClick: () => window.open(data.url, "_blank"),
        alt: data.dialect.chineseName,
      }),
      createElement(
        "span",
        {
          className:
            "block w-full text-center text-[13px] text-black mt-1 truncate",
          title: data.dialect.chineseName,
        },
        data.dialect.chineseName,
      ),
      createElement(
        "span",
        {
          className:
            "block w-full text-center text-[9px] text-black mt-1 truncate",
          title: data.dialect.englishName,
        },
        data.dialect.englishName,
      ),
    ),
  );
  markerElement.dataset.dialect = data.dialect.chineseName;
  markerElement.style.marginTop = "40px";

  return markerElement;
}

export function addPlace(data: LocationItem, mapInstance?: mapboxgl.Map) {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    closeOnMove: false,
    focusAfterOpen: false,
  });

  const targetMap = mapInstance;
  if (!targetMap) return;

  const markerElement = createCustomMarker(popup, data, targetMap);

  new mapboxgl.Marker({
    element: markerElement,
    anchor: "bottom",
  })
    .setLngLat([data.lng, data.lat])
    .addTo(targetMap);

  useMapStore.getState().addMarker(markerElement);
  popup.setLngLat([data.lng, data.lat]);
}

function hidePopup(popup: mapboxgl.Popup, marker: HTMLDivElement, id: string) {
  const root = popupRoots.get(popup);
  if (root) {
    root.unmount();
    popupRoots.delete(popup);
  }
  popup.remove();
  marker.classList.remove("visible");
  useMapStore.getState().clearSelectedLocation();
}

function createPopupContent(data: LocationItem) {
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(
    createElement(PopupContent, {
      data,
      onDelete: () => deletePlace(data),
      onEdit: () => editPlace(data),
    }),
  );
  elementRoots.set(container, root);
  return { container, root };
}

function editPlace(data: LocationItem) {
  useUIStore.getState().setNewLocationModalOpen(true);
}

function deletePlace(data: LocationItem) {
  const marker = document.querySelector(
    `[data-dialect="${data.dialect.chineseName}"]`,
  );
  if (marker && marker instanceof HTMLDivElement) {
    const markerRoot = markerRoots.get(marker);
    if (markerRoot && typeof markerRoot.unmount === "function")
      markerRoot.unmount();
    marker.remove();
  }
  const popupContent = document.querySelector(
    `[data-dialect="popup-${data.dialect.chineseName}"]`,
  );
  if (popupContent) {
    const container = popupContent.parentElement as HTMLDivElement;
    const root = elementRoots.get(container);
    if (root && typeof root.unmount === "function") root.unmount();
    const popupEl = popupContent.parentElement
      ?.parentElement as HTMLDivElement | null;
    if (popupEl) popupEl.remove();
  }
}
