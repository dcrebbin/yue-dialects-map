/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { humanizeRoleKey, type LocationItem } from "~/app/common/locations";
import { youtubeIcon } from "~/lib/icons/youtubeIcon";
import { shareIcon } from "~/lib/icons/shareIcon";
import { streetViewIcon } from "~/lib/icons/streetViewIcon";
import { locationIcon } from "~/lib/icons/locationIcon";
import { closeIcon } from "~/lib/icons/closeIcon";
import { editIcon } from "~/lib/icons/editIcon";
import { useState } from "react";
import { plusIcon } from "~/lib/icons/plusIcon";
import { minusIcon } from "~/lib/icons/minusIcon";
import posthog from "posthog-js";
import { douyinIcon } from "~/lib/icons/douyinIcon";

export function SvgIcon({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export function PopupContent({
  data,
  onDelete,
  onEdit,
}: {
  data: LocationItem;
  onDelete?: () => void;
  onEdit?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const actionButtons = (
    <div className="flex items-center justify-center gap-2">
      <a href={data.url} target="_blank" rel="noreferrer">
        <SvgIcon
          html={data.url.includes("youtube") ? youtubeIcon : douyinIcon}
          className="h-[28px] w-auto"
        />
      </a>

      <button
        type="button"
        onClick={() =>
          navigator.share({
            title: `Checkout this Cantopop地圖 location`,
            url: document.URL,
          })
        }
      >
        <SvgIcon html={shareIcon} className="h-6 w-6" />
      </button>
    </div>
  );

  return (
    <div
      className="relative top-0 flex h-fit w-[150px] flex-col items-center justify-start rounded-md bg-white p-2"
      tabIndex={-1}
      style={{
        maxHeight: isExpanded ? "none" : "150px",
        height: isExpanded ? "350px" : "100%",
        width: isExpanded ? "350px" : "150px",
      }}
      data-song={`popup-${data.lat},${data.lng}`}
    >
      <h1 className="text-center text-base font-bold">
        {data.dialect.chineseName} <br /> {data.dialect.englishName}
      </h1>
      {actionButtons}
    </div>
  );
}
