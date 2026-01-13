import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPost = (props) => {
  return (
    <Link to={`/blog/${props.slug}`}>
      <motion.div 
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className='group flex flex-col gap-4 max-w-[400px] h-full cursor-pointer'
      >
        {/* Image Container */}
        <div className='relative w-full h-[450px] overflow-hidden bg-gray-200'>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            alt={props.name} 
            className='w-full h-full object-cover' 
            src={props.image} 
          />
          
          {/* Overlay that appears on hover */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500' />
          
          {/* Read More Badge - appears on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className='absolute bottom-6 right-6 bg-white px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300'
          >
            <span className='text-sm font-bold uppercase tracking-wider flex items-center gap-2'>
              Read More
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-3'>
          {/* Title */}
          <h3 className='font-bold text-black text-xl md:text-2xl leading-tight group-hover:translate-x-1 transition-transform duration-300'>
            {props.name}
          </h3>
          
          {/* Description */}
          <p className='text-sm md:text-base leading-relaxed text-gray-600 line-clamp-3'>
            {props.shortDescription}
          </p>

          {/* Read More Link */}
          <div className='flex items-center gap-2 mt-2'>
            <span className='text-sm font-semibold uppercase tracking-wider text-black group-hover:gap-3 transition-all duration-300'>
              Continue Reading
            </span>
            <svg 
              className="w-4 h-4 text-black transform group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogPost;