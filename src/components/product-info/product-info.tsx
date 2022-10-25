import type { Camera } from '../../types/camera';
import ProductTabs from '../product-tabs/product-tabs';
import Rating from '../rating/rating';

type ProductInfoProps = {
  camera: Camera;
};

function ProductInfo({ camera }: ProductInfoProps): JSX.Element {
  const {
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x } = camera;

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width="560"
              height="480"
              alt={name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{name}</h1>
          <Rating
            rating={rating}
            reviewCount={reviewCount}
            className={'product__rate'}
          />
          <p className="product__price">
            <span className="visually-hidden">
              Цена:
            </span>
            {`${price} ₽`}
          </p>
          <button className="btn btn--purple" type="button">
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>
            Добавить в корзину
          </button>
          <ProductTabs camera={camera} />
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
