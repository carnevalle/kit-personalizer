import React from 'react';
import { useSearchParams, useNavigate } from '@remix-run/react';
import { Page, Layout, Text, Button } from '@shopify/polaris';
import PersonalizationBuilder from '../components/builder/PersonalizationBuilder.jsx';

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product_id');
  const navigate = useNavigate();

  if (!productId) {
    return (
      <Page title="Error">
        <Layout>
          <Layout.Section>
            <Text variant="bodyMd">This page requires a product ID to function properly.</Text>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Kit Personalization Builder"
      subtitle={`Configuring product ID: ${productId}`}
      backAction={{ content: 'Back to Product', url: `/admin/products/${productId}` }}
    >
      <Layout>
        <Layout.Section>
          <PersonalizationBuilder productId={productId} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
