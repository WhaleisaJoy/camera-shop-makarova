import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { Camera } from '../../types/camera';
import { formatPrce } from '../../utils/utils';
import ModalAddToBasketSuccess from '../modal-add-to-basket-success/modal-add-to-basket-success';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import ProductTabs from '../product-tabs/product-tabs';
import Rating from '../rating/rating';

type ProductInfoProps = {
  camera: Camera;
};

function ProductInfo({ camera }: ProductInfoProps): JSX.Element {
  const navigate = useNavigate();

  const {
    name,
    price,
    rating,
    reviewCount,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x } = camera;

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isAddProductSuccessModalOpen, setAddProductSuccessModalOpen] = useState(false);

  const handleAddProductModalToggle = () => setAddProductModalOpen((prevState) => !prevState);
  const handleAddProductSuccessModalToggle = () => setAddProductSuccessModalOpen((prevState) => !prevState);
  const handleContinueShoppingClick = () => navigate(`${AppRoute.Catalog}`);

  return (
    <>
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
              {`${formatPrce(price)} ₽`}
            </p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleAddProductModalToggle}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
            Добавить в корзину
            </button>
            <ProductTabs camera={camera} />
          </div>
        </div>
      </section>

      {
        isAddProductModalOpen &&
        <ModalAddToBasket
          camera={camera}
          handleCloseClick={handleAddProductModalToggle}
          setAddProductSuccessModalOpen={setAddProductSuccessModalOpen}
        />
      }

      {
        isAddProductSuccessModalOpen &&
        <ModalAddToBasketSuccess
          handleCloseClick={handleAddProductSuccessModalToggle}
          handleContinueShoppingClick={handleContinueShoppingClick}
        />
      }
    </>
  );
}

export default ProductInfo;
