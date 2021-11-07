import { useState, useEffect } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { graphCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) => {
                setRelatedPosts(result);
            });
        } else {
            getRecentPosts().then((result) => {
                setRelatedPosts(result);
            });
        }
    }, [slug]);

    return (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="flex-none w-16">
                        <Image
                            className="align-middle rounded-full"
                            loader={graphCMSImageLoader}
                            src={post.featuredImage.url}
                            alt={post.title}
                            height="60px"
                            width="60px"
                            unoptimized
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link key={index} className="text-md" href={`/post/${post.slug}`}>
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;