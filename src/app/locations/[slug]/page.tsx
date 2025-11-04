import { humanizeRoleKey, SLUG_LOCATIONS } from "~/app/common/locations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "~/app/page";
import CloseButton from "~/app/components/close-button";

export function generateStaticParams() {
  return Object.keys(SLUG_LOCATIONS).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const slug = decodeURIComponent(params.slug);
  const location = "";
  if (!location) return {};

  const title = `Music Video Location`;
  const description = `Music Video Location. View Street View and watch the Music Video.`;
  const images = ["/images/og-image.png"];

  return {
    title,
    description,
    alternates: {
      canonical: `/locations/${encodeURIComponent(params.slug)}`,
    },
    openGraph: {
      title,
      description,
      images,
      type: "article",
      url: `/locations/${encodeURIComponent(params.slug)}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const location = {
    lat: 0,
    lng: 0,
    url: "",
    image: "",
  };

  if (!location) {
    return notFound();
  }

  const videoId = location?.url.includes("youtu.be")
    ? location?.url.split("youtu.be/")[1]?.split("?")[0]
    : location?.url.split("v=")[1]?.split("&")[0];

  const time = location?.url.split("?t=")[1]?.split("&")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: "Music Video Location",
    url: location.url,
    image: location.image,
    locationCreated: {
      "@type": "Place",
      name: "Music Video Location",
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: location.url,
    },
  } as const;

  return (
    <div className="relative h-screen w-screen">
      <div
        className="fixed z-[95] flex h-screen w-screen flex-col items-center justify-center bg-black/30"
        id="location-modal"
      >
        <div className="mb-10 mt-28 flex h-screen w-[90%] flex-col items-start justify-start overflow-y-auto rounded-lg border-2 border-white/50 bg-white/50 p-4 backdrop-blur-md lg:w-[60rem] xl:w-[80rem] 2xl:w-[90rem]">
          <script type="application/ld+json" suppressHydrationWarning>
            {JSON.stringify(jsonLd)}
          </script>
          <div className="flex w-full flex-row items-center justify-between">
            <h1 className="text-xl font-bold">Music Video Location</h1>
            <CloseButton />
          </div>
          <div className="flex w-full flex-col items-start justify-start px-4">
            <div className="mt-4 grid w-full justify-center gap-2 lg:grid-cols-2">
              <div className="h-[200px] w-[300px] rounded-lg lg:h-[300px] lg:w-auto">
                <iframe
                  src={""}
                  width="100%"
                  height="100%"
                  title="Street View"
                  className="h-[200px] rounded-lg drop-shadow-md lg:h-[300px]"
                  style={{ border: "0" }}
                ></iframe>
              </div>
              <div className="h-[200px] w-[300px] rounded-lg lg:h-[300px] lg:w-auto">
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?start=${time}`}
                    width="100%"
                    height="100%"
                    title="Youtube Video"
                    className="h-[200px] rounded-lg drop-shadow-md lg:h-[300px]"
                    style={{ border: "0" }}
                  ></iframe>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/60 text-sm">
                    Video unavailable
                  </div>
                )}
              </div>
            </div>
            <hr className="my-2 w-full" />
            <div className="grid w-full grid-cols-2 gap-2">
              <div className="flex w-full flex-col items-start justify-start">
                <p className="text-xs font-bold">Song Title</p>
                <p>Music Video Location</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start">
                <p className="text-xs font-bold">Artist(s)</p>
                <p>Music Video Location</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start">
                <p className="text-xs font-bold">Address</p>
                <p>Music Video Location</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start">
                <p className="text-xs font-bold">Location</p>
                <p>
                  {location?.lat}, {location?.lng}
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-row items-start justify-evenly gap-2">
              <div className="flex w-full flex-col items-start justify-start overflow-y-auto font-bold">
                <h3 className="my-1 text-base">Contributors</h3>
                <hr className="my-1 w-full text-black" />
                <h3 className="my-2">Song</h3>
                <div className="grid w-full grid-cols-2 gap-2">
                  {Object.entries({}).map(([key, value]) => (
                    <div
                      className="flex flex-col items-start justify-start"
                      key={key}
                    >
                      <p className="text-xs font-bold">
                        {humanizeRoleKey(key)} <br></br>
                      </p>
                      <div className="flex flex-col gap-1 text-left text-xs font-normal"></div>
                    </div>
                  ))}
                </div>
                <h3 className="text-md my-2">Music Video</h3>
                {Object.entries({}).length === 0 && (
                  <div className="flex w-full flex-col items-center justify-center text-sm">
                    <p className="text-center">
                      No music video contributors found
                    </p>
                    <a
                      className="my-2 font-normal underline"
                      href={`mailto:devon@langpal.com.hk?subject=Cantopop地圖: Music Video Contributors`}
                    >
                      Submit contributors
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Home
        location={{
          id: "",
          url: "",
          image: "",
          lat: 0,
          lng: 0,
          dialect: { chineseName: "", englishName: "" },
        }}
      />
    </div>
  );
}
