import { z } from "zod";

const DIALECTS = {
  guangzhouDialect: {
    chineseName: "廣州話",
    englishName: "Guangzhou Dialect",
  },
  weitouDialect: {
    chineseName: "圍頭話",
    englishName: "Weitou Dialect",
  },
  shiqiDialect: {
    chineseName: "石岐話",
    englishName: "Shiqi Dialect",
  },
  beihaiDialect: {
    chineseName: "北海話",
    englishName: "Beihai Dialect",
  },
  nanningDialect: {
    chineseName: "南寧話",
    englishName: "Nanning Dialect",
  },
  huazhouDialect: {
    chineseName: "化州話",
    englishName: "Huazhou Dialect",
  },
  gaozhouDialect: {
    chineseName: "高州話",
    englishName: "Gaozhou Dialect",
  },
  taishanDialect: {
    chineseName: "臺山話",
    englishName: "Taishanese",
  },
  lianzhouDialect: {
    chineseName: "廉州話",
    englishName: "Lianzhou Dialect",
  },
  yulinDialect: {
    chineseName: "玉林話",
    englishName: "Yulin Dialect",
  },
  sanDiuLanguage: {
    chineseName: "山由話",
    englishName: "San Diu Language",
  },
};

const RawLocationSchema = z.object({
  coordinates: z.tuple([z.number(), z.number()]), // [lat, lng] as authored
  url: z.string().url(),
  image: z.string().url(),
  dialect: z.object({
    chineseName: z.string(),
    englishName: z.string(),
  }),
});

export const LocationItemSchema = RawLocationSchema.transform((raw) => {
  const [lat, lng] = raw.coordinates;
  const id = `${lat.toFixed(6)}-${lng.toFixed(6)}`;
  return {
    id,
    url: raw.url,
    image: raw.image,
    lat,
    lng,
    dialect: raw.dialect,
  };
});

type RawLocationSchema = z.infer<typeof RawLocationSchema>;

export type LocationItem = z.infer<typeof LocationItemSchema>;

const RAW_LOCATIONS: Record<string, RawLocationSchema> = {
  N2XP5tYb53M: {
    coordinates: [23.134224, 113.260984],
    url: "https://www.youtube.com/watch?v=N2XP5tYb53M",
    image: "https://i.ytimg.com/vi/N2XP5tYb53M/hq720.jpg",
    dialect: DIALECTS.guangzhouDialect,
  },
  hiBn1gfblWo: {
    coordinates: [22.213653, 114.105554],
    url: "https://www.youtube.com/watch?v=hiBn1gfblWo&t=5s",
    image: "https://i.ytimg.com/vi/hiBn1gfblWo/hq720.jpg",
    dialect: DIALECTS.weitouDialect,
  },
  GArydutRxNc: {
    coordinates: [22.52225, 113.36174],
    url: "https://v.douyin.com/GArydutRxNc/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-i-0813c001/oQi9espc0ECAAAA4nCHiVAfiIJBABSAuhgPa42~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=J8QmpR9oWxKEwYHRWrRkK2qDYkk%3D",
    dialect: DIALECTS.shiqiDialect,
  },
  qpHT7mdNQek: {
    coordinates: [22.52225, 113.36174],
    url: "https://www.youtube.com/watch?v=qpHT7mdNQek",
    image: "https://i.ytimg.com/vi/qpHT7mdNQek/sddefault.jpg",
    dialect: DIALECTS.beihaiDialect,
  },
  f_GLVZr3OQM: {
    coordinates: [22.81582, 108.328288],
    url: "https://v.douyin.com/f_GLVZr3OQM/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/aaa4cf67922e41babe41c975c9065a11~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=UXfBO5IVntrN47vrRPuFBcXgoIY%3D",
    dialect: DIALECTS.nanningDialect,
  },
  paciFFXHZrU: {
    coordinates: [23.108957, 114.406594],
    url: "https://v.douyin.com/paciFFXHZrU/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/3326f85946d2453486793b247b17ecf0_1647352204~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=ze2dLE%2FcRFNzPgqqIN%2FZRdUH91Q%3D",
    dialect: DIALECTS.huazhouDialect,
  },
  "6Wb1Nzr6Ryk": {
    coordinates: [21.913192, 110.858397],
    url: "https://v.douyin.com/6Wb1Nzr6Ryk/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/oIs8aABFIe9CYPBRWbfLUQjom98ZBndxCDDgAA~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=tNR7jiiXm4s7qQc6gyZH0GsTd30%3D",
    dialect: DIALECTS.gaozhouDialect,
  },
  Jer8DCg_t1s: {
    coordinates: [22.255325, 112.788742],
    url: "https://www.youtube.com/watch?v=Jer8DCg_t1s&t=261s",
    image: "https://i.ytimg.com/vi/Jer8DCg_t1s/hq720.jpg",
    dialect: DIALECTS.taishanDialect,
  },
  q5e3T8Lb6No: {
    coordinates: [21.481047, 109.110406],
    url: "https://v.douyin.com/q5e3T8Lb6No/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-p-0015/522eb691ad3546f7a62facf9be428170_1647855120~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=39YBYCugu%2FrO9iSpnoyL%2BRtsubM%3D",
    dialect: DIALECTS.lianzhouDialect,
  },
  sfC1bN8T4IQ: {
    coordinates: [21.481047, 109.110406],
    url: "https://www.youtube.com/watch?v=sfC1bN8T4IQ",
    image: "https://i.ytimg.com/vi/sfC1bN8T4IQ/mqdefault.jpg",
    dialect: DIALECTS.yulinDialect,
  },
  "1V1lXZN3AXo": {
    coordinates: [21.59459, 105.841933],
    url: "https://v.douyin.com/1V1lXZN3AXo/",
    image:
      "https://p3-pc-sign.douyinpic.com/tos-cn-i-0629/oUBwAC0d7iDATTgAE0iB7AfkIAsSQQYMgBsFBq~tplv-dy-cropcenter:323:430.jpeg?biz_tag=pcweb_cover&from=327834062&lk3s=138a59ce&s=PackSourceEnum_PUBLISH&sc=cover&se=true&sh=323_430&x-expires=2077509600&x-signature=yMl1z%2FO88gFjyc8sRmqz3Du1IF4%3D",
    dialect: DIALECTS.sanDiuLanguage,
  },
};

export const SLUG_LOCATIONS = Object.entries(RAW_LOCATIONS).map(
  ([key, location]) => {
    return { [key]: location };
  },
);

// Validate and normalize at module load; throws early if data is invalid
export const LOCATIONS: LocationItem[] = z
  .array(LocationItemSchema)
  .parse(Object.values(RAW_LOCATIONS));

export function extractContributorNamesFromLocation(
  location: LocationItem,
): string[] {
  const names = new Set<string>();
  const c = location as unknown as {
    contributors?: {
      song?: Record<string, string[]>;
      musicVideo?: Record<string, string[]>;
    } | null;
  };
  const contributors = c.contributors;
  if (!contributors) return [];
  const buckets = [contributors.song, contributors.musicVideo].filter(
    Boolean,
  ) as Array<Record<string, string[]>>;
  for (const bucket of buckets) {
    for (const role of Object.keys(bucket)) {
      const roleNames = bucket[role] ?? [];
      for (const person of roleNames) {
        if (person && person.trim().length > 0) names.add(person);
      }
    }
  }
  return Array.from(names);
}

export const CONTRIBUTORS: string[] = [
  ...new Set(
    LOCATIONS.flatMap((location) =>
      extractContributorNamesFromLocation(location),
    ),
  ),
];

type ContributorCategory = "song" | "musicVideo";

export function humanizeRoleKey(roleKey: string): string {
  const specialMap: Record<string, string> = {
    directorOfPhotography: "Director of Photography",
    productionAssistant: "Production Assistant",
  };
  if (specialMap[roleKey]) return specialMap[roleKey];
  // Insert spaces before capital letters and capitalize first letter
  const withSpaces = roleKey.replace(/([A-Z])/g, " $1");
  const words = withSpaces.split(" ").filter(Boolean);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export interface ContributorRoleGroup {
  category: ContributorCategory;
  roleKey: string;
  title: string;
  names: string[];
}

export const CONTRIBUTOR_ROLE_GROUPS: ContributorRoleGroup[] = (() => {
  const groups = new Map<
    string,
    {
      category: ContributorCategory;
      roleKey: string;
      title: string;
      names: Set<string>;
    }
  >();

  const add = (
    category: ContributorCategory,
    roleKey: string,
    people: string[],
  ) => {
    const key = `${category}:${roleKey}`;
    let entry = groups.get(key);
    if (!entry) {
      const roleTitle = humanizeRoleKey(roleKey);
      entry = {
        category,
        roleKey,
        title: `${roleTitle}`,
        names: new Set<string>(),
      };
      groups.set(key, entry);
    }
    const ensured = entry;
    people.forEach((p) => {
      if (p && p.trim().length > 0) ensured.names.add(p);
    });
  };

  for (const location of LOCATIONS) {
    const c = (
      location as unknown as {
        contributors?: {
          song?: Record<string, string[]>;
          musicVideo?: Record<string, string[]>;
        } | null;
      }
    ).contributors;
    if (!c) continue;
    if (c.song) {
      for (const roleKey of Object.keys(c.song)) {
        add("song", roleKey, c.song[roleKey] ?? []);
      }
    }
    if (c.musicVideo) {
      for (const roleKey of Object.keys(c.musicVideo)) {
        add("musicVideo", roleKey, c.musicVideo[roleKey] ?? []);
      }
    }
  }

  return Array.from(groups.values()).map((g) => ({
    category: g.category,
    roleKey: g.roleKey,
    title: g.title,
    names: Array.from(g.names).sort((a, b) => a.localeCompare(b)),
  }));
})();
