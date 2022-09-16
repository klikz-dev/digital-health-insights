import { useEffect, useState } from 'react'
import styles from './PostsCategory.module.scss'
import SidebarSubscribe from '@/components/molecules/SidebarSubscribe'
import Button from '@/components/atoms/Button'
import { getPostsCategory } from '@/functions/wordpress/fetchData'
import Ad from '@/components/molecules/Ad'
import Background from '@/components/atoms/Background'
import Image from '@/components/atoms/Image'
import PostCard from '@/components/molecules/PostCard'

export default function PostsCategory({ category, community }) {
  const [page, setPage] = useState(1)
  const [isEnd, setIsEnd] = useState(false)
  const [posts, setPosts] = useState([])

  const { data, loading } = getPostsCategory(category, page)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setIsEnd(true)
      } else {
        setPosts([...posts, ...data])
      }
    }
  }, [data])

  return (
    <div className='container my-16'>
      <div className='flex flex-col md:flex-row gap-8 lg:gap-16 w-full'>
        <div className='flex-initial w-full md:w-3/4'>
          <h3 className={styles.title}>The Latest</h3>

          {Array.isArray(posts) &&
            posts?.map((post, index) => (
              <div className={styles.cardWrap} key={index}>
                <div className={styles.card}>
                  <PostCard
                    post={post}
                    link={`/news/${post.slug}`}
                    linkText='Read News'
                  />
                </div>
              </div>
            ))}

          <div className='text-center pt-4 pb-8'>
            <Button
              text='Load more News'
              type='primary'
              size='lg'
              onClick={() => setPage(page + 1)}
              disabled={isEnd || loading}
            />
          </div>

          <div className='relative'>
            <Background image='social_share_bg' />

            <div className='px-8 md:px-20 py-12 grid md:grid-cols-2 gap-4'>
              <div>
                <Image
                  src='dhc_logo_bold_white'
                  width={168}
                  height={86}
                  className='mb-4'
                />

                <h4 className='text-white text-2xl md:text-3xl'>
                  Join the Community
                </h4>
              </div>

              <div>
                <Image
                  src='social_people'
                  width={416}
                  height={96}
                  className='mb-4'
                />

                <Button
                  type='tertiary'
                  size='lg'
                  text='Follow the Conversation'
                  href={community}
                  urlExternal={true}
                  attributes={{ target: '_blank' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex-initial w-full md:w-1/4'>
          <SidebarSubscribe />

          <div className='mb-4 p-4'>
            <Ad
              type='square'
              ad_image={category.acf?.ad_side?.ad_image}
              ad_link={category.acf?.ad_side?.ad_link}
              classes={category.acf?.ad_side?.ad_tracking_classes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
