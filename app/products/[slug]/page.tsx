import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { getServerLang } from '@/lib/i18n/server'
import { localizePath } from '@/lib/i18n'
import { pick } from '@/lib/i18n/catalog'
import productNotFoundDict from '@/lib/i18n/translations/productNotFound'
import JsonLd from '@/components/seo/JsonLd'
import ProductDetailClient from './ProductDetailClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theofficecompany.eu'

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
      short_description_hr,
      long_description,
      long_description_hr,
      is_new,
      is_featured,
      datasheet_url,
      brand:brands(id, name, slug, logo_url),
      category:categories(id, name, name_hr, slug),
      product_images(id, image_url, thumbnail_url, medium_url, is_primary, display_order),
      product_features(id, feature_name, feature_name_hr),
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
  const lang = await getServerLang()

  if (!data?.product) {
    return {
      title: productNotFoundDict[lang].metaTitle,
    }
  }

  const { product } = data as any
  const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.image_url
    || product.product_images?.[0]?.image_url

  // HR description with EN fallback when lang is hr
  const shortDescription = pick(lang, product.short_description_hr, product.short_description)
  const longDescription = pick(lang, product.long_description_hr, product.long_description)

  return {
    title: `${product.name} | ${product.brand?.name || 'The Office Company'}`,
    description: shortDescription || longDescription?.substring(0, 160),
    openGraph: {
      title: `${product.name} | ${product.brand?.name}`,
      description: shortDescription || '',
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
  const [data, lang] = await Promise.all([getProductData(slug), getServerLang()])

  if (!data?.product) {
    notFound()
  }

  const product = data.product as any
  const images = (product.product_images || [])
    .map((img: any) => img.image_url)
    .filter(Boolean)
  const description = pick(lang, product.short_description_hr, product.short_description)
    || pick(lang, product.long_description_hr, product.long_description)
  const productUrl = `${SITE_URL}${localizePath(`/products/${product.slug}`, lang)}`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    url: productUrl,
    ...(images.length ? { image: images } : {}),
    ...(description ? { description } : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    ...(product.brand?.name
      ? { brand: { '@type': 'Brand', name: product.brand.name } }
      : {}),
  }

  const homeLabel = lang === 'hr' ? 'Početna' : 'Home'
  const breadcrumbItems = [
    { name: homeLabel, path: '/' },
    ...(product.category
      ? [{
          name: pick(lang, product.category.name_hr, product.category.name) || product.category.name,
          path: `/categories/${product.category.slug}`,
        }]
      : []),
    { name: product.name, path: `/products/${product.slug}` },
  ]
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${localizePath(item.path, lang)}`,
    })),
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetailClient product={data.product} relatedProducts={data.relatedProducts} />
    </>
  )
}
