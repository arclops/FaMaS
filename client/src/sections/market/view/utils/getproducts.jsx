import { apiFetch } from '../../../../api/client';

export default async function getProducts () {
    try{
        const response = await apiFetch(`/api/market/products`, {
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
            const products = data.data.map((product) => ({
            pid: product.pid,
            pname: product.pname,
            fid: product.fid,
            variants: product.variants,
            price: product.price,
            stock: product.stock,
            image_url: product.image_url || product.img_url || '/assets/placeholder.svg',
            sale_status: product.sale_status,
            sale_price: product.sale_price,
            farmer_name: product.farmer_name || ''
            }));
            return products;
        }
        return null;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
}
