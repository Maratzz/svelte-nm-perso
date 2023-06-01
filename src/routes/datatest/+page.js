export const load = async ({fetch}) => {
  const productRes = await fetch('https://dummyjson.com/products?limit=10')
  const productData = await productRes.json()
  const products = productData.products
  return {
    products
  }
}