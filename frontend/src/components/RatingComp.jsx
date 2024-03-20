const RatingComp = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fa-solid fa-star'
              : value >= 0.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fa-solid fa-star'
              : value >= 1.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fa-solid fa-star'
              : value >= 2.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fa-solid fa-star'
              : value >= 3.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fa-solid fa-star'
              : value >= 4.5
              ? 'fa-solid fa-star-half-stroke'
              : 'fa-regular fa-star'
          }
        ></i>
      </span>
      <span className='ms-2'>{text && text}</span>
    </div>
  )
}

RatingComp.defaultProps = {
  color: '#f8e825',
}

export default RatingComp
