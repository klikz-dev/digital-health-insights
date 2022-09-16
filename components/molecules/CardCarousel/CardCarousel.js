import React from 'react'
import classnames from 'classnames'
import { useCarousel, DOTS } from './useCardCarousel'
import styles from './CardCarousel.module.scss'

const Carousel = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const CarouselRange = useCarousel({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || CarouselRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = CarouselRange[CarouselRange.length - 1]
  return (
    <ul className={classnames(styles.container, { [className]: className })}>
      <li
        className={classnames(
          styles.arrow,
          currentPage === 1 && styles.disabled
        )}
        onClick={onPrevious}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
        Previous
      </li>
      {CarouselRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className={classnames(styles.item, styles.dots)} key={index}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={classnames(
              styles.item,
              pageNumber === currentPage && styles.selected
            )}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            &#x2B24;
          </li>
        )
      })}
      <li
        className={classnames(
          styles.arrow,
          currentPage === lastPage && styles.disabled
        )}
        onClick={onNext}
      >
        Next
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </li>
    </ul>
  )
}

export default Carousel
