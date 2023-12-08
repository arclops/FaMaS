export default async function getProducts () {
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/market/products`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if(data.data) {
            const products = await Promise.all(data.data.map(async (product, index) => ({
            pid: product.pid,
            pname: product.pname,
            fid: product.fid,
            variants: product.variants,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url,
            sale_status: product.sale_status,
            sale_price: product.sale_price
            })));
            return products;
        } 
        return null;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
}
