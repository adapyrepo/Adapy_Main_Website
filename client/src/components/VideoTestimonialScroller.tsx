import { motion } from "framer-motion";
import { Play } from "lucide-react";

const testimonialVideos = [
  {
    id: "v1",
    title: "Independence Regained",
    name: "James L.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/yROiXDY6LyU"
  },
  {
    id: "v2",
    title: "Seamless Integration",
    name: "Maria S.",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/yROiXDY6LyU"
  },
  {
    id: "v3",
    title: "Safety First",
    name: "Robert T.",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/yROiXDY6LyU"
  },
  {
    id: "v4",
    title: "Tech that Works",
    name: "Sarah K.",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/yROiXDY6LyU"
  }
];

export function VideoTestimonialScroller({ onVideoSelect }: { onVideoSelect: (video: any) => void }) {
  return (
    <div className="w-full overflow-hidden py-12 bg-[#f5f5f7]">
      <div className="container mx-auto px-6 mb-8">
        <h3 className="text-2xl font-bold tracking-tight">Video Testimonials</h3>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 pb-8 no-scrollbar snap-x">
        {testimonialVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ y: -5 }}
            className="flex-shrink-0 w-[300px] snap-start cursor-pointer group"
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
              <h4 className="font-bold text-lg group-hover:text-[#0071e3] transition-colors">{video.title}</h4>
              <p className="text-sm text-black/60">{video.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
