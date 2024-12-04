import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const handlePrevious = () => {
    setOffset(offset - limit);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) {
        return products;
      }

      return product.tags.some(({ title }) => title === tagQuery);
    });

    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">

      <div className="mt2 mb2">
        // Using the data prop, we map over the list of products and render a Card component for each product
        {data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      //  Pagination Buttons
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" />
        <Button text="Next" />
      </div>
    </div>
  )
};

export default CardList;