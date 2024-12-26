import { Response } from '@remix-run/node';
import { Shopify } from '@shopify/shopify-api';

/**
 * API Route: Save Metafield
 * Handles saving metafield data for products via Shopify Admin API.
 */
export async function action({ request }) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { namespace, key, value, productId } = await request.json();

  if (!namespace || !key || !value || !productId) {
    return new Response(
      JSON.stringify({ error: 'Missing required parameters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Authenticate Shopify session
    const session = await Shopify.Utils.loadCurrentSession(request, null, true);
    const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

    // GraphQL Mutation to save metafield
    const mutation = `
      mutation MetafieldsSet($input: MetafieldsSetInput!) {
        metafieldsSet(input: $input) {
          metafields {
            id
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        ownerId: productId,
        metafields: [
          {
            namespace,
            key,
            value,
            type: 'json',
          },
        ],
      },
    };

    const response = await client.query({
      data: {
        query: mutation,
        variables,
      },
    });

    if (response.body.errors) {
      throw new Error(response.body.errors[0].message);
    }

    return new Response(
      JSON.stringify({ success: true, data: response.body }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving metafield:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to save metafield' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
