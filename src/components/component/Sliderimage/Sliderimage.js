import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: require("./../../../assest/images/9e04600330574ca29594020c77ac1668.webp") },
  { url: require("./../../../assest/video/3a0fe4a0-b789-4528-9316-5cb27e08bf06.mp4") },
  { url: require("../../../bts-header-store-202406.f2440a8f.jpeg") },
  { url: require("../../../bts-header-store-202406.f2440a8f.jpeg") },
  { url: require("../../../bts-header-store-202406.f2440a8f.jpeg") },
  { url: require("../../../bts-header-store-202406.f2440a8f.jpeg") },
  { url: require("../../../bts-header-store-202406.f2440a8f.jpeg") },
];

export default function SliderImage() {
  return (
    <div>
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}
