const fetchRecentProducts = async (req, res) => {
    try {
      const response = await fetch(`http://localhost:3001/product`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.products.slice(0, 6));
    } catch (error) {
      console.error('Erreur lors de la récupération des produits récents:', error);
    }
  };

  export default async function handler(req, res) {
    const { name, message } = req.body
   
    try {
      await handleFormInputAsync({ name, message })
      res.redirect(307, '/')
    } catch (err) {
      res.status(500).send({ error: 'failed to fetch data' })
    }
  }