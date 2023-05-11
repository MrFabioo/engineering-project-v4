import React from 'react';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className='card'>
      <div className='image'>
        <img
          style={{ width: 350 }}
          src={
            place.photo
              ? place.photo.images.large.url
              : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
          }
          title={place.name}
          alt='restaurant'
        />
      </div>
      <div className='content'>
        <h5>{place.name}</h5>
        <div className='details'>
          <p>
            Rating: {place.rating} spośród {place.num_reviews} wyników
          </p>
        </div>
        <div className='details'>
          <p>Price: {place.price_level}</p>
        </div>
        <div className='details'>
          <p>Ranking: {place.ranking}</p>
        </div>
        {place?.cuisine?.map(({ name }) => (
          <div className='chip' key={name}>
            {name}
          </div>
        ))}
        {place?.address && (
          <div className='subtitle'>Adres: {place.address}</div>
        )}
        {place?.address && (
          <div className='SPACING'>Nr telefonu: {place.phone}</div>
        )}
        <button
          onClick={() => {
            window.open(place.web_url, '_blank');
          }}
        >
          Trip Adivisor
        </button>
        <button
          onClick={() => {
            window.open(place.website, '_blank');
          }}
        >
          Website
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
