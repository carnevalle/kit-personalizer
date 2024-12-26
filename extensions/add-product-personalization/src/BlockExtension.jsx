import React, { useState } from 'react';
import {
  reactExtension,
  useApi,
  AdminBlock,
  BlockStack,
  Text,
  Button,
  InlineStack,
} from '@shopify/ui-extensions-react/admin';

// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  // The useApi hook provides access to several useful APIs like i18n and data.
  const {i18n, data, resourcePicker} = useApi(TARGET);
  console.log({data});

  // State to manage selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  /**
   * Open the Resource Picker for products
   */
  const openResourcePicker = async () => {
    try {
      const preselectedItems = selectedProducts.map((product) => ({
        id: product.id,
        variants: product.variants?.map((variant) => ({ id: variant.id })) || [],
      }));

      const selected = await resourcePicker({
        type: 'product',
        action: 'select',
        multiple: true, // Allow selecting multiple products
        filters: [],
        selectionIds: preselectedItems,
      });

      console.log(selected);

      if (selected) {

        setSelectedProducts(selected);

        /*
        const newProducts = selected.map((product) => ({
          id: product.id,
          title: product.title,
        }));

        // Prevent duplicates
        setSelectedProducts((prev) => {
          const existingIds = prev.map((p) => p.id);
          return [
            ...prev,
            ...newProducts.filter((product) => !existingIds.includes(product.id)),
          ];
        });
        */
      }else{
        setSelectedProducts([]);
      }
    } catch (error) {
      console.error('Resource Picker Error:', error);
    }
  };

  /**
   * Remove a product from the selected list
   */
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  /**
   * Save selected products to a metafield
   */
  const handleSave = () => {
    const payload = JSON.stringify(selectedProducts);
    console.log('Saved to metafield:', payload);

    // TODO: Save to metafield using useApplyMetafieldsChange
    // applyMetafieldsChange({
    //   type: 'updateMetafield',
    //   namespace: 'custom',
    //   key: 'kit_personalization',
    //   value: payload,
    // });
  };

  return (
    // The AdminBlock component provides an API for setting the title of the Block extension wrapper.
    <AdminBlock title={i18n.translate('name')}>
      <BlockStack spacing="loose">
        {/* Open Resource Picker */}
        <Text fontWeight="bold">Select Products for Personalization:</Text>
        <Button onClick={openResourcePicker} accessibilityLabel="Open Product Picker">
          Open Product Picker
        </Button>

        {/* Display Selected Products */}
        <Text fontWeight="bold">Selected Products:</Text>
        {selectedProducts.length > 0 ? (
          <BlockStack spacing="tight">
            {selectedProducts.map((product) => (
              <InlineStack key={product.id} spacing="tight" align="center">
                <Text>{product.title}</Text>
                <Button
                  onClick={() => handleRemoveProduct(product.id)}
                  accessibilityLabel={`Remove ${product.title}`}
                  kind="secondary"
                >
                  Remove
                </Button>
              </InlineStack>
            ))}
          </BlockStack>
        ) : (
          <Text>No products selected.</Text>
        )}

        {/* Save Configuration */}
        <Button onClick={handleSave} accessibilityLabel="Save Settings">
          Save Settings
        </Button>
      </BlockStack>
    </AdminBlock>
  );
}
