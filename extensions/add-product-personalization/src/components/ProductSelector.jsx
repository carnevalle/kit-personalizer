import React from 'react';
import { useApi } from '@shopify/ui-extensions-react/admin';

export default function ProductSelector({ productId, onProductSelect }) {
  const { resourcePicker } = useApi('admin.product-details.block.render');

  const openPicker = async () => {
    const selected = await resourcePicker({
      type: 'product',
      action: 'select',
      multiple: false,
    });

    if (selected?.resources?.length > 0) {
      onProductSelect(selected.resources[0].id);
    }
  };

  return (
    <div>
      <button onClick={openPicker}>
        {productId ? `Selected Product: ${productId}` : 'Select Product'}
      </button>
    </div>
  );
}
