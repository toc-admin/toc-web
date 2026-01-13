import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProductData(slug: string) {
  const supabase = await createServerClient()

  // Fetch complete product data with all relations
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      sku,
      short_description,
      long_description,
      is_new,
      is_featured,
      datasheet_url,
      brand:brands(id, name, slug, logo_url),
      category:categories(id, name, slug),
      product_images(id, image_url, thumbnail_url, medium_url, is_primary, display_order),
      product_features(id, feature_name),
      product_colors(id, color_name, hex_code),
      product_specifications(id, spec_key, spec_value),
      product_certifications(id, certification_name),
      product_rooms(room:rooms(id, name, slug))
    `)
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (error || !product) {
    console.error('Error fetching product:', error)
    return null
  }

  // Debug log the fetched product
  console.log('Fetched product:', (product as any).name)
  console.log('Product images:', (product as any).product_images?.length || 0)

  // Fetch related products from same category
  const { data: relatedProducts } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      is_new,
      is_featured,
      brand:brands(name),
      category:categories(name),
      product_images(image_url, thumbnail_url, is_primary),
      product_features(feature_name)
    `)
    .eq('category_id', (product as any).category?.id)
    .neq('id', (product as any).id)
    .is('deleted_at', null)
    .limit(4)

  return {
    product,
    relatedProducts: relatedProducts || []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getProductData(slug)

  if (!data?.product) {
    return {
      title: 'Product Not Found | The Office Company',
    }
  }

  const { product } = data as any
  const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.image_url
    || product.product_images?.[0]?.image_url

  return {
    title: `${product.name} | ${product.brand?.name || 'The Office Company'}`,
    description: product.short_description || product.long_description?.substring(0, 160),
    openGraph: {
      title: `${product.name} | ${product.brand?.name}`,
      description: product.short_description || '',
      images: primaryImage ? [{
        url: primaryImage,
        width: 800,
        height: 600,
        alt: product.name
      }] : [],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const data = await getProductData(slug)

  if (!data?.product) {
    notFound()
  }

  return <ProductDetailClient product={data.product} relatedProducts={data.relatedProducts} />
}
