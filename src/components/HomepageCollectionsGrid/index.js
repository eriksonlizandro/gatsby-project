import React from 'react';
import { CollectionTile } from '../CollectionTile';

export function HomepageCollectionsGrid({ collections }) {
  return (
    <div>
      {collections.map(collection => (
        <CollectionTile
          title={collection.title}
          key={collection.shopifyId}
          description={collection.description}
          backgroundImage={collection.image.localFile.childImageSharp.fluid}
        />
      ))}
    </div>
  );
}
