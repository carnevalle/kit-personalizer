import React, { useState, useEffect } from 'react';
import {
  reactExtension,
  AdminBlock,
  BlockStack,
  Text,
  Button,
  useApi,
} from '@shopify/ui-extensions-react/admin';
import BlockEditor from './components/BlockEditor.jsx';
import AddBlockModal from './components/AddBlockModal.jsx';

const TARGET = 'admin.product-details.block.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  const { data, resourcePicker } = useApi(TARGET);
  const [blocks, setBlocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState({ parentType: null });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // ✅ Load existing metafield data on initialization
  useEffect(() => {
    const metafield = data?.metafields?.find(
      (mf) => mf.namespace === 'customization' && mf.key === 'kit_personalization'
    );
    if (metafield?.value) {
      try {
        setBlocks(JSON.parse(metafield.value));
      } catch (error) {
        console.error('Failed to parse saved configuration:', error);
        setErrorMessage('Failed to load saved configuration.');
      }
    }
  }, [data]);

  // ✅ Open Modal to Add Block
  const openAddBlockModal = (parentType = null) => {
    setModalContext({ parentType });
    setIsModalOpen(true);
  };

  // ✅ Add a New Block
  const addBlock = (type) => {
    const newBlock = {
      id: `${type}-${Date.now()}`,
      type,
      title: '',
      product_id: '',
      properties: {},
      children: type === 'group' ? [] : undefined,
    };
    setBlocks((prev) => [...prev, newBlock]);
    setIsModalOpen(false);
  };

  // ✅ Update a Block
  const updateBlock = (id, updatedBlock) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? updatedBlock : b)));
  };

  // ✅ Remove a Block
  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // ✅ Save Configuration to Metafield
  const saveConfiguration = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/save-metafield', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          namespace: 'customization',
          key: 'kit_personalization',
          value: JSON.stringify(blocks),
          productId: data?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save configuration: ${response.statusText}`);
      }

      alert('Configuration saved successfully!');
    } catch (error) {
      console.error('Error saving configuration:', error);
      setErrorMessage('Failed to save configuration. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Render Error Message
  const renderError = () =>
    errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>;

  // ✅ Render UI
  return (
    <AdminBlock title="Kit Personalization Settings">
      <BlockStack spacing="loose">
        <Text fontWeight="bold">Personalization Blocks:</Text>
        {renderError()}
        <BlockEditor
          blocks={blocks}
          onUpdateBlock={updateBlock}
          onRemoveBlock={removeBlock}
          onAddBlock={openAddBlockModal}
        />
        <Button onClick={() => openAddBlockModal(null)}>Add Block</Button>
        <Button onClick={saveConfiguration} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>

        {isModalOpen && (
          <AddBlockModal
            onClose={() => setIsModalOpen(false)}
            onAddBlock={addBlock}
            parentType={modalContext.parentType}
          />
        )}
      </BlockStack>
    </AdminBlock>
  );
}
