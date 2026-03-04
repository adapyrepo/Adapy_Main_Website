import { motion } from "framer-motion";
import { Play } from "lucide-react";

const testimonialVideos = [
  {
    id: "v1",
    title: "Independence Regained",
    name: "Marty O'Conner - Host of Wheels Talks Podcast",
    thumbnail: "https://img.youtube.com/vi/Tn9fraklLJI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Tn9fraklLJI"
  },
  {
    id: "v2",
    title: "Seamless Integration",
    name: "Tom Willis",
    thumbnail: "https://img.youtube.com/vi/evUjxSpwRFU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/evUjxSpwRFU"
  },
  {
    id: "v3",
    title: "Safety First",
    name: "Pro Angler Clay Dyer",
    thumbnail: "https://img.youtube.com/vi/kZqKEZl_ry4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/kZqKEZl_ry4"
  },
  {
    id: "v4",
    title: "Tech that Works",
    name: "Drew Evans",
    thumbnail: "https://img.youtube.com/vi/5j15vtWhsoU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5j15vtWhsoU"
  },
  {
    id: "v5",
    title: "Adapy Innovation",
    name: "Bobby Helco",
    thumbnail: "https://img.youtube.com/vi/pr9ZNydjFAs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/pr9ZNydjFAs"
  }
];

export function VideoTestimonialScroller({ onVideoSelect }: { onVideoSelect: (video: any) => void }) {
  return (
    <div className="w-full overflow-hidden py-12 bg-[#f5f5f7]">
      <div className="container mx-auto px-6 mb-8">
        <h3 className="text-2xl font-bold tracking-tight">Video Testimonials</h3>
      </div>
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1500], // Adjust based on total width of cards (5 * 300px)
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 px-6"
        >
          {[...testimonialVideos, ...testimonialVideos].map((video, idx) => (
            <div
              key={`${video.id}-${idx}`}
              className="flex-shrink-0 w-[300px] cursor-pointer group"
              onClick={() => onVideoSelect({ ...video, description: `${video.title} - ${video.name}` })}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-lg group-hover:text-[#0071e3] transition-colors whitespace-normal">{video.title}</h4>
                <p className="text-sm text-black/60">{video.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
